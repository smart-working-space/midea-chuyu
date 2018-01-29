/*蒸汽炉配置文件 请参照小烤箱0xB4的配置说明*/
module.exports = [
  {workStatus:LanguagePack.standing, code:0x01,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  /*{workStatus:LanguagePack.working, code:0x02, showStatus: true,  showTime:true, canBegin: false, hasStopBtn: true, hasContinue: false, time_stop: 0},*/
  {workStatus:LanguagePack.pausing, code:0x03, showStatus: true,  showTime:true, canBegin: false, hasStopBtn: false, hasContinue: true, time_stop: 1},
  {workStatus:LanguagePack.cookingComplete, code:0x04, showStatus: true,  showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.booking, code:0x06,  showStatus: true, showTime:true, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.powerSaving, code:0x07,  showStatus: true, showTime:false, canBegin: true, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.selfTestStatus, code:0x0A, showStatus: true,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.displayVersionNumber, code:0x0B, showStatus: false,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.demoStatus, code:0x0C,  showStatus: true, showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1},
  {workStatus:LanguagePack.endMenu, code:0x66, showStatus: true,  showTime:false, canBegin: false, hasStopBtn: false, hasContinue: false, time_stop: 1}
];
