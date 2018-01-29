
import actions from '../actions/MenuAction';
import {Toast} from 'antd-mobile';

export default Reflux.createStore({
    detailSource:{},
    detailCache: [],
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数

    onDetail(DevType,recipeId){
      console.log(this.detailCache,'detailCache');
      let self = this;
      let _record = 0;
      let detailCache = this.detailCache;//先读取缓存的detail data
      detailCache.forEach((_item,_key)=>{
        if(recipeId==_item.id){
          self.detailSource = _item;
          self.trigger(self.detailSource);
          _record = 1;
        }
      })
      if(_record){
        $(".model_alertloading").hide();
        return;
      }
      //获取userId
      var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
      var requestData = {
        "fun":"recipeDetail",
        "recipe": recipeId,
        "pwd":"10000",
        "uid":DEFAULT_UID
      };
      var servicePath = "/recipe";
      console.log(requestData,'requestData');
      SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
        if(res.error_code==0){
            var messageBack = res.content;
            self.detailSource = messageBack;
            self.detailCache.push(messageBack);
            self.trigger(self.detailSource);
         }else{
            console.log("出了点问题:"+res.error_code+":"+res.content);
            self.trigger(null);
         }
         $(".model_alertloading").hide();
      }.bind(this));
    },
    onDetailFavoriteHandle(DevType,recipeId,isCollect){
      let self = this;
      //获取userId
      var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
      var requestData = {
        "recipe": recipeId,
        "pwd":"10000",
        "uid":DEFAULT_UID
      };
      if(isCollect=='no'){
        requestData.fun = 'addFavorite';
      }
      if(isCollect=='yes'){
        requestData.fun = 'removeFavorite';
      }
      var servicePath = "/recipe";
      console.log(requestData,'requestData');
      SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
        if(res.error_code==0){
            var messageBack = res.content||{};
            if(messageBack.saved=="yes"){
              let detailSource = self.detailSource;
              if(isCollect=='no'){
                detailSource.recorded = "yes";
                detailSource.recorded_people++;
              }
              if(isCollect=='yes'){
                detailSource.recorded = "no";
                detailSource.recorded_people--;
              }
              self.detailSource = detailSource;
              self.trigger(self.detailSource);
              if(isCollect=='no'){
                Toast.info(LanguagePack.collectionSuccess, 1);
              }
              if(isCollect=='yes'){
                Toast.info(LanguagePack.cancelCollectionSuccess, 1);
              }
            }else{
              Toast.info(LanguagePack.collectionFailed, 1);
            }

         }else{
            console.log("出了点问题:"+res.error_code+":"+res.content);
            self.trigger(null);
         }
      }.bind(this));
    }
});
