
import actions from '../actions/ListAction';
const _url = 'https://iot2.midea.com.cn/nutrition/v1/recipe';
import axios from 'axios';

export default Reflux.createStore({
    items:{sourceList:[],categoryList:[],themeList:[],isEnd:false,categoryValue:"",searchName:"",nothing:false},
    recommendCache: [],
    scoreCache: [],
    collectCache: [],
    resultCache:[],
    addPage: 0,
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetAll(scroll_type,dataItem,searchName) {
      var request_str;
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
        if(dataItem=="新品推荐"){
          dataItem = "";
        }
        if(dataItem=="我的收藏"){
          request_str = {fun: "favoriteList2",page:_page,uid:1};
        }else{
          request_str = {fun: "recommendList2",page:_page,category:dataItem,name:searchName,uid:1};        
        }
        axios({
          method: 'post',
          url: _url,
          data: "data="+JSON.stringify(request_str),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (response) {
          let _data = response.data;
          self.items.categoryValue = dataItem;

          if(scroll_type=='init'||scroll_type=='clickInit'){
            if(_data.list.length<=0){
              self.items.nothing = true;
            }else{
              self.items.nothing = false;
            }
            self.items.sourceList = [];
            self.items.sourceList = _data.list;
          }
          if(scroll_type=='loading'){
            let newSourceList = [];
            let sourceList = self.items.sourceList;
            newSourceList = sourceList.concat(_data.list);
            self.items.sourceList = newSourceList;
          }
          
          self.trigger(self.items);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onGetAllCategory(){
        let self = this;
        var request_str = {fun: "searchCategory4"};
        axios({
          method: 'post',
          url: _url,
          data: "data="+JSON.stringify(request_str),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (response) {
          let _data = response.data;
          let categoryList =  _data.category;
          categoryList.forEach((item,key)=>{
            item.isCategoryActive = false;
          })
          let _categoryList = [{key: "我的收藏", value: "我的收藏",isCategoryActive: false},{key: "新品推荐", value: "新品推荐",isCategoryActive: true}];
          let newCategoryList = _categoryList.concat(categoryList);
          
          self.items.categoryList = newCategoryList;
          self.trigger(self.items);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onGetTheme(){
      let self = this;
      var request_str = {fun: "theme",platform:"artcook"};
      axios({
        method: 'post',
        url: _url,
        data: "data="+JSON.stringify(request_str),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(function (response) {
        let _data = response.data;
        self.items.themeList = _data.list;
        self.trigger(self.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

});
