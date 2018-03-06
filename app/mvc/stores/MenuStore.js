
import actions from '../actions/MenuAction';
import {Toast} from 'antd-mobile';
const _url = 'https://iot2.midea.com.cn/nutrition/v1/recipe';
import axios from 'axios';

export default Reflux.createStore({
    detailSource:{},
    detailCache: [],
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数

    onDetail(recipeId){
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
        return;
      }
      //获取userId
      var requestData = {
        "fun":"recipeDetail",
        "recipe": recipeId,
        "uid":1 //微信appid
      };
      axios({
        method: 'post',
        url: _url,
        data: "data="+JSON.stringify(requestData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(function (response) {
        let _data = response.data;
        self.detailSource = _data;
        self.detailCache.push(_data);
        self.trigger(self.detailSource);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    onDetailFavoriteHandle(recipeId,isCollect){
      let self = this;
      //获取userId
      var requestData = {
        "recipe": recipeId,
        "uid":1
      };
      if(isCollect=='no'){
        requestData.fun = 'addFavorite';
      }
      if(isCollect=='yes'){
        requestData.fun = 'removeFavorite';
      }
      axios({
        method: 'post',
        url: _url,
        data: "data="+JSON.stringify(requestData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(function (response) {
        var messageBack = response.data||{};
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

      })
      .catch(function (error) {
        console.log(error);
      });
    }
});
