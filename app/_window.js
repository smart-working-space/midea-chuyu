// window.React = require('react');
// window.ReactDom = require('react-dom');

function getNavLanguage(){
 console.log("--->浏览器语言为 " + navigator.language);
 if(navigator.appName == "Netscape"){
  var navLanguage = navigator.language;
   return navLanguage;
  }
 return false;
}
var _language = getNavLanguage();
if(_language.indexOf('zh')>-1){
  window.LanguagePack = require("./languagePack/language_ch");
}
if(_language.indexOf('en')>-1){
  window.LanguagePack = require("./languagePack/language_en");
}


//window.LazyLoad = require("react-lazy-load"); //lazyload img
window.Reflux = require('reflux');

window.PicUrl = "../..";  //全局路由

// 以下是页面组件
window.NavBar = require("./components/common/NavBar");  //NavBar
window.GetUrlParams = require("./components/common/getUrlParams");  //获取页面url参数
window.Loading = require("./components/common/Loading");  //loading icon
window.LoadingModel = require("./components/common/LoadingModel");  //loading icon
window.SwitchDec = require("./components/common/switchDec");  //转换描述 （设备或者 难度）
window.TimeLine = require("./components/common/timeHandle");  //过去时间差
window.CountDown = require("./components/common/count-down");  //时分 倒计时
window.CommentStar = require("./components/common/commentStar");  //评分
window.TotalByteCtrl = require("./components/common/totalbytectrl");  //设备控制命令 处理
// window.StatusNavBottom = require("./components/common/StatusNavBottom");  //底部设备状态显示

window.PicTransformFun = require("./components/common/PicTransform");  //图片压缩
// window.PureRenderMixin = require('./components/common/immutableRender');
