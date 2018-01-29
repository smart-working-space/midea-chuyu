/*微波炉配置文件 请参照小烤箱0xB4的配置说明*/
module.exports = [
  {workStatus:LanguagePack.standing, code:0x01,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.working, code:0x02,  showStatus: true, showTime:true, canBegin: false, hasStopBtn: true, hasContinue: false, time_stop: 0},
  {workStatus:LanguagePack.pausing, code:0x03,  showStatus: true, showTime:true, canBegin: false, hasStopBtn: false, hasContinue: true, time_stop: 1},
  {workStatus:LanguagePack.cookingComplete, code:0x04,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.locking, code:0x05,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.booking, code:0x06,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.powerSaving, code:0x07,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.endMenu, code:0x66, showStatus: true,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.preheat, code:0x08, showStatus: true,  showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.preheatFinish, code:0x0a, showStatus: true,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.loveThreeSeconds, code:0x09,  showStatus: true, showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.foodInduction, code:0x0D,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1}
];
