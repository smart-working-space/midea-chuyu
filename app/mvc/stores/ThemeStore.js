import { Toast } from 'antd-mobile';
import actions from '../actions/ThemeAction'

export default Reflux.createStore({
    items:{
      list:[],
      theme:'',
      noMore: false
    },
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetAll (DevType,SnType,tabActive) {
        //更新状态（就是个对象）
        if(+tabActive==2||+tabActive==3){
            this.trigger({});
            return;
        }
        // console.log(this.items,'theme_items');
        // if(JSON.stringify(this.items) != "{}"){//读取缓存
        //   this.trigger(this.items);
        //   return;
        // }
        let self = this;
        //获取userId
        var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
        var requestData = {
          "fun":"theme",
          "platform": SnType,
          "pwd":"10000",
          "uid":DEFAULT_UID
        };
        var servicePath = "/recipe";
        console.log(requestData,'themerequestData');
        SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
          if(res.error_code==0){
              var messageBack = res.content;
              self.items.list = messageBack.list;
              self.items.theme = messageBack.theme;
              if(messageBack.list.length<=0||messageBack.list==undefined){
                self.items.noMore = true;
              }else{
                self.items.noMore = false;
              }
              self.trigger(self.items);
           }else{
              console.log("出了点问题:"+res.error_code+":"+res.content);
              self.trigger(null);
           }
        }.bind(this));
    },
    onFavoriteHandle(DevType,recipeId,isCollect,detailItem){
      let self = this;
      //获取userId
      var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
      var requestData = {
        "recipe": recipeId,
        "pwd":"10000",
        "uid":DEFAULT_UID
      };
      if(isCollect==0){
        requestData.fun = 'addFavorite';
      }
      if(isCollect==1){
        requestData.fun = 'removeFavorite';
      }
      var servicePath = "/recipe";
      console.log(requestData,'themerequestData');
      SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
        if(res.error_code==0){
            var messageBack = res.content||{};
            if(messageBack.saved=="yes"){
              let list = self.items.list;
              list.forEach((item,key)=>{
                if(item.recipe==recipeId){
                  if(isCollect==0){
                    item.isCollect = 1;
                  }
                  if(isCollect==1){
                    item.isCollect = 0;
                  }
                }
              })
              self.trigger(self.items);
              if(isCollect==0){
                Toast.info(LanguagePack.collectionSuccess, 1);
              }
              if(isCollect==1){
                Toast.info(LanguagePack.cancelCollectionSuccess, 1);
              }
            }else{
              Toast.info(LanguagePack.collectionFailed, 1);
            }

         }else{
            console.log("出了点问题:"+res.error_code+":"+res.content);
            self.trigger({});
         }
      }.bind(this));
    }
});
