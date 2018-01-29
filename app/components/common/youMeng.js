module.exports = {
  count: function(_menu,_action){
    let _lable = '{devType:'+window.localStorage.getItem("WhichDev")+',snType:'+window.localStorage.getItem("SnType")+',uid:'+window.localStorage.getItem("DEFAULT_UID")+',deviceId:'+window.localStorage.getItem("deviceId")+'}';
    console.log(_menu,_action,_lable);
    _czc.push(['_trackEvent', _menu, _action, _lable]);
    //return sub_pic+type+_sub;
  }
}
