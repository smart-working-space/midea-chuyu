
import actions from '../actions/ListAction';
const _url = 'https://iot2.midea.com.cn/nutrition/v1/recipe';
import axios from 'axios';

export default Reflux.createStore({
    items:{sourceList:[],resultList:[],isEnd:false,isResultEnd:false},
    recommendCache: [],
    scoreCache: [],
    collectCache: [],
    resultCache:[],
    addPage: 0,
    tabActive: 0,
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetAll(scroll_type) {
      if(scroll_type=='init'||scroll_type=='clickInit'){ //假如初始化数据，点击tab加载数据
        var _page = '1,10';
        this.addPage = 10;
      }
      if(scroll_type=='loading'){//假如加载更多数据
        var begin_page = this.addPage+1, add_page = this.addPage+10, _page = begin_page+','+add_page;
        this.addPage = add_page;
      }
        //更新状态（就是个对象）
        let self = this;
        var request_str = {"fun": "recommendList2","page":"1,10","category":"",name:""};
        console.log(typeof request_str);      

        //获取userId
        //var requestData = {"data": request_str};
        // var servicePath = "/recipe";
        // if(scroll_type=='init'){
        //   self.recommendCache = [];
        // }
        // if(scroll_type=='clickInit'){
        //   self.items.sourceList = self.recommendCache;
        //   self.items.isEnd = false;
        //   self.trigger(self.items);
        //   return;
        // }
        axios({
          method: 'post',
          url: _url,
          data: "data="+JSON.stringify(request_str),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
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
      console.log(isCollect,'isCollect',requestData,'requestData');
      SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
        if(res.error_code==0){
            var messageBack = res.content||{};
            if(messageBack.saved=="yes"){

              self.recommendCache.forEach((item,key)=>{
                if(item.recipe==recipeId){
                  if(isCollect==0){
                    item.isCollect = 1;
                    item.collectTime = item.collectTime+1;
                    //list.push(detailItem);
                  }
                  if(isCollect==1){
                    item.isCollect = 0;
                    item.collectTime = item.collectTime-1;
                    //list.splice(key,1);
                  }
                }
              })
              self.scoreCache.forEach((item,key)=>{
                if(item.recipe==recipeId){
                  if(isCollect==0){
                    item.isCollect = 1;
                    item.collectTime = item.collectTime+1;
                    // if(self.tabActive==3){
                    //   self.scoreCache.push(detailItem);
                    // }
                  }
                  if(isCollect==1){
                    item.isCollect = 0;
                    item.collectTime = item.collectTime-1;
                    // if(self.tabActive==3){
                    //   self.scoreCache.splice(key,1);
                    // }
                  }
                }
              })
              self.collectCache.forEach((item,key)=>{
                if(item.recipe==recipeId){
                  if(isCollect==0){
                    item.isCollect = 1;
                    item.collectTime = item.collectTime+1;
                    //self.collectCache.push(detailItem);
                  }
                  if(isCollect==1){
                    item.isCollect = 0;
                    item.collectTime = item.collectTime-1;
                    self.collectCache.splice(key,1);
                  }
                }
              })
              if(isCollect==0){
                self.collectCache.push(detailItem);
              }

              let list = [];
              if(self.tabActive==0){
                list = self.recommendCache;
              }
              if(self.tabActive==1){
                list = self.scoreCache;
              }
              if(self.tabActive==2){
                list = self.collectCache;
              }
              self.items.sourceList = list;
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
            self.trigger(null);
         }
      }.bind(this));
    }
});
