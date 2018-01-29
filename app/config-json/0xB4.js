/*小烤箱配置文件*/
/*配置说明
workStatus设备工作状态， code对应的串口协议码，showStatus列表页是否显示状态 showTime是否在首页或者详情页显示时间（显示时间一定是工作状态或者暂停状态才有可作为 首页是否显示底部显示条的判断依据），
canBegin是否有一键启动按钮 hasStopBtn是否有暂停按钮， hasContinue是否有继续按钮*/
module.exports = [
  {workStatus:LanguagePack.standing, code:0x01, showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.working, code:0x02, showStatus: true, showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 0},
  {workStatus:LanguagePack.cookingComplete, code:0x11,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.locking, code:0x05,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.preheatFinish, code:0x88, showStatus: true,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.powerSaving, code:0x07,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.preheat, code:0x08, showStatus: true,  showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.endMenu, code:0x66,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.unlock, code:0x0a,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.booking, code:0x06,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.end, code:0x04,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.pausing, code:0x03,  showStatus: true,  showTime:true, canBegin: false, hasStopBtn: false, hasContinue: true, time_stop: 1},
  {workStatus:LanguagePack.continueWorkingAfterSuspension, code:0x0b,  showStatus: false, showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 0}
];
