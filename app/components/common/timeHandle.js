
module.exports = {
  timeHandle: function(postTime){
    // postTime过去时间戳
    let cur_date = new Date().getTime(), //当前时间戳
    		// time_sec = Math.floor(cur_date/1000),
         time_sec = cur_date,
    		_date=time_sec-postTime;

    	//计算出相差天数
		var days=Math.floor(_date/(24*3600*1000))

		//计算出小时数
		var leave1=_date%(24*3600*1000)    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000))
		//计算相差分钟数
		var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000))

		//计算相差秒数
		var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000);
		//console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		if(days>0){
			return days+LanguagePack.days;
		}
		if(hours>0){
			return hours+LanguagePack.hours;
		}
		if(minutes>0){
			return minutes+LanguagePack.minutes;
		}
		if(seconds>=0){
			return seconds+LanguagePack.seconds;
		}
  },
  timeSwitch: function(nS){
    let _data = new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/,' ');
    return _data;
  }
};
