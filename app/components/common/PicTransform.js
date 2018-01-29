module.exports = {
  picTransform: function(_picUrl,type){
    if(!_picUrl){
      return '';
    }
    let sub_pic;
    let _sub = _picUrl.substr(_picUrl.length - 4,4);
    if(_sub=='.jpg'||_sub=='.png'){
      sub_pic = _picUrl.substr(0,_picUrl.length - 4);
    }
    return sub_pic+type+_sub;
  }
}
