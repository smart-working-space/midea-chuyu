
import actions from '../actions/CommentAction';
const _url = 'https://iot2.midea.com.cn/nutrition/v1/recipe';
import axios from 'axios';

export default Reflux.createStore({
    detailSource:{},
    detailCache: [],
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数

    onGetAllComment(recipeId){
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
        "fun":"recipeCommentList",
        "recipe": recipeId,
        "type": type,
        "page": "1,20",
        "uid":1
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
});
