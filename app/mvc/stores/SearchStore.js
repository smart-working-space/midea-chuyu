import { Toast } from 'antd-mobile';
import actions from '../actions/SearchAction'

export default Reflux.createStore({
    items:{

    },
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetAll () {
        //更新状态（就是个对象）
        console.log(this.items,'search_data');
        if(JSON.stringify(this.items) != "{}"){//读取缓存
          this.trigger(this.items);
          return;
        }
        let self = this;
        //获取userId
        var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
        var DevType = window.localStorage.getItem("DevType");

        var requestData = {
           "pwd": "10000",
           "uid":DEFAULT_UID
        };
        var _language = getNavLanguage();
        if(_language.indexOf('zh')>-1){
          requestData.fun = 'searchCategory'
        }
        if(_language.indexOf('en')>-1){
          requestData.fun = 'searchCategory2'
        }
        var servicePath = "/recipe";
        console.log(requestData,'searchCategoryRequest');
        SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
          if(res.error_code==0){
              var messageBack = res.content;
              self.items = messageBack;
              self.trigger(messageBack);
           }else{
              console.log("出了点问题:"+res.error_code+":"+res.content);
              self.trigger(null);
           }
        }.bind(this));
    }
});
