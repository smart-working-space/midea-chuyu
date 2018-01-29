import ConfigJson0xB4 from "../../config-json/0xB4"; //引入小烤箱配置文件
import ConfigJson0xB1 from "../../config-json/0xB1"; //引入大烤箱配置文件
import ConfigJson0xB0 from "../../config-json/0xB0"; //引入微波炉配置文件
import ConfigJson0xB2 from "../../config-json/0xB2"; //引入蒸汽炉配置文件
import ConfigJson0xBF from "../../config-json/0xBF"; //引入配置文件
import StatusNavBottomAction from "../../mvc/actions/StatusNavBottomAction";

module.exports = {
  //10进制转换8位2进制的方法
  tranformTo2Bit: function(val) {
    var _str_val = val.toString(2);
    var _str = "";
    if (_str_val.length < 8) {
      for (var i = 0; i < 8 - _str_val.length; i++) {
        _str += "0"; //补零
      }
    }
    var str_2 = _str + _str_val;
    // console.log('str_2:'+str_2);
    return str_2;
  },
  stingToArray: function(ctrlStr) {
    //控制命令字符串 转为byte数组 , 1byte两位
    let str_arr = [];
    for (let i = 0; i < ctrlStr.length; i++) {
      let _str = ctrlStr.substring(i, i + 2);
      i++;
      str_arr.push(parseInt(_str, 16));
    }
    return str_arr;
  },
  stringTo16Radix: function(byteStr) {
    //用 parseInt() 方法转换byte字符串为16进制
    let _byteStr = parseInt(byteStr, 16);
    return _byteStr;
  },

  getOldStatus(ctrl_arr) {
    var DevType = window.localStorage.getItem("DevType"); //设备类型型号
    let statusObj = {};
    let _recipeId = 0;
    if (DevType == "B4" || DevType == "b4") {
      //小烤箱
      for (var key in ctrl_arr) {
        if (key == 10) {
          //工作状态
          let _item = +ctrl_arr[key];
          ConfigJson0xB4.forEach((item, key) => {
            if (_item == parseInt(+item.code, 10)) {
              statusObj = item;
            }
          });
        }

        if (key == 15) {
          //故障代码
          let wrong_dec = SwitchDec.switchFault(+ctrl_arr[key], "B4");
          console.log("wrong_dec:" + wrong_dec);
          statusObj.wrongDec = wrong_dec;
          if (statusObj.wrongDec) {
            statusObj.wrongType = "fault";
          }
        }

        if (key == 21) {
          //步骤
          let _item = +ctrl_arr[key];
          let _str = parseInt(_item).toString(16);
          let _step = _str[1];
          statusObj.step = +_step;
        }

        if (key == 24) {
          //菜谱id
          _recipeId = Math.pow(16, 4) * parseInt(ctrl_arr[key]);
        }
        if (key == 25) {
          _recipeId += Math.pow(16, 2) * parseInt(ctrl_arr[key]);
        }
        if (key == 26) {
          _recipeId += Math.pow(16, 0) * parseInt(ctrl_arr[key]);
        }
      }
    }
    if (DevType == "B1" || DevType == "b1") {
      //大烤箱
      for (var key in ctrl_arr) {
        if (key == 10) {
          //工作状态
          let _item = +ctrl_arr[key];
          ConfigJson0xB1.forEach((item, key) => {
            if (_item == parseInt(+item.code, 10)) {
              statusObj = item;
            }
          });
        }

        if (key == 15) {
          //故障代码
          let _item = +ctrl_arr[key];
          let wrong_dec = SwitchDec.switchFault(_item, "B1");
          statusObj.wrongDec = wrong_dec;
          if (statusObj.wrongDec) {
            statusObj.wrongType = "fault";
          }
        }

        if (key == 22) {
          //菜谱id
          _recipeId += Math.pow(16, 4) * parseInt(ctrl_arr[key]);
        }
        if (key == 23) {
          _recipeId += Math.pow(16, 2) * parseInt(ctrl_arr[key]);
        }
        if (key == 24) {
          _recipeId += Math.pow(16, 0) * parseInt(ctrl_arr[key]);
        }
        if (key == 26) {
          //童锁状态
          statusObj.childrenlock = +ctrl_arr[key];
        }
        if (key == 27) {
          //步骤
          let _item = +ctrl_arr[key];
          let _str = parseInt(_item).toString(16);
          let _step = _str[1];
          statusObj.step = +_step;
        }
      }
    }

    if (DevType == "B0" || DevType == "b0") {
      //微波炉
      let _warn = 0,
        _fault = 0;
      for (var key in ctrl_arr) {
        if (key == 10) {
          //工作状态
          let _item = +ctrl_arr[key];
          ConfigJson0xB0.forEach((item, key) => {
            if (_item == parseInt(+item.code, 10)) {
              statusObj = item;
            }
          });

          // 不管设备任何状态，只要知道他门开，app界面就提示
          if (_item >= 128 && _item < 256) {
            //bit7=1 ，炉门打开
            statusObj.wrongDec = LanguagePack.wrongDec1;
            statusObj.wrongType = "warn";
            _warn = 1;
          }
        }

        if (_warn && key == 16) {
          //故障代码
          let _item = +ctrl_arr[key];
          if (_item == 1) {
            statusObj.wrongDec = LanguagePack.wrongDec2;
            statusObj.wrongType = "warn";
            _warn = 1;
          }
        }

        if (!_warn && key == 15) {
          //故障代码
          let _item = +ctrl_arr[key];
          let wrong_dec = SwitchDec.switchFault(_item, "B0");
          statusObj.wrongDec = wrong_dec;
          if (statusObj.wrongDec) {
            statusObj.wrongType = "fault";
            _fault = 1;
          }
        }

        if (!_warn && !_fault && key == 16) {
          //提醒代码
          let _item = +ctrl_arr[key];
          let warn_dec = SwitchDec.switchWarn(_item, "B0");
          statusObj.wrongDec = warn_dec;
          if (statusObj.wrongDec) {
            statusObj.wrongType = "warn";
          }
        }

        if (key == 20) {
          //步骤
          let _item = +ctrl_arr[key];
          let _str = parseInt(_item).toString(16);
          let _step = _str[1];
          statusObj.step = +_step;
        }

        if (key == 21) {
          //菜谱id
          _recipeId += Math.pow(16, 4) * parseInt(ctrl_arr[key]);

          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf("X7321D");
          if (_index > -1) {
            //假如为x7
            statusObj.h_mapId = parseInt(ctrl_arr[key]);
          }
        }
        if (key == 22) {
          _recipeId += Math.pow(16, 2) * parseInt(ctrl_arr[key]);

          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf("X7321D");
          if (_index > -1) {
            //假如为x7
            statusObj.m_mapId = parseInt(ctrl_arr[key]);
          }
        }
        if (key == 23) {
          _recipeId += Math.pow(16, 0) * parseInt(ctrl_arr[key]);

          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf("X7321D");
          if (_index > -1) {
            //假如为x7
            statusObj.d_mapId = parseInt(ctrl_arr[key]);
          }
        }
      }
    }

    if (DevType == "B2" || DevType == "b2") {
      //蒸汽炉
      var _record = 0;
      for (var key in ctrl_arr) {
        if (key == 10) {
          //工作状态
          let _item = +ctrl_arr[key];
          ConfigJson0xB2.forEach((item, key) => {
            if (_item == parseInt(+item.code, 10)) {
              statusObj = item;
            }
          });

          if (_item == 2) {
            _record = 1;
          }
        }
        if (key == 15) {
          //故障代码
          let _item = +ctrl_arr[key];
          let wrong_dec = SwitchDec.switchFault(_item, "B2");
          statusObj.wrongDec = wrong_dec;
          if (statusObj.wrongDec) {
            statusObj.wrongType = "fault";
          }
        }
        if (key == 16) {
          //判断预热
          let _item = +ctrl_arr[key];
          if(_record){
            if (_item >= 16) {
              //大于0x10预热中，小于预热完成
              statusObj.workStatus = LanguagePack.preheat;
              statusObj.showStatus = true;
              statusObj.showTime = true;
              statusObj.canBegin = false;
              statusObj.hasStopBtn = false;
              statusObj.hasContinue = false;
              statusObj.time_stop = 1;
            } else {
              statusObj.workStatus = LanguagePack.working;
              statusObj.showStatus = true;
              statusObj.showTime = true;
              statusObj.canBegin = false;
              statusObj.hasStopBtn = true;
              statusObj.hasContinue = false;
              statusObj.time_stop = 0;
              if (_item >= 8) {
                let warn_dec = SwitchDec.switchWarn(_item, "B2");
                statusObj.wrongDec = warn_dec;
                if (statusObj.wrongDec) {
                  statusObj.wrongType = "warn";
                }
              }
            }
          }else{
            var _byte16Str = this.tranformTo2Bit(parseInt(_item));
            console.log("_byte16Str", _item, "  changeStr: ", _byte16Str);
            statusObj.warnTip = 0;
            if(parseInt(_byte16Str[7-0])){
              statusObj.warnTip = 1;
            }
          }
         
        }

        if (key == 20) {
          //菜谱id
          _recipeId += Math.pow(16, 4) * parseInt(ctrl_arr[key]);
        }
        if (key == 21) {
          _recipeId += Math.pow(16, 2) * parseInt(ctrl_arr[key]);
        }
        if (key == 22) {
          _recipeId += Math.pow(16, 0) * parseInt(ctrl_arr[key]);
        }
        if (key == 26) {
          //童锁状态
          statusObj.childrenlock = +ctrl_arr[key];
        }
        if (key == 27) {
          //步骤
          let _item = +ctrl_arr[key];
          let _str = parseInt(_item).toString(16);
          let _step = _str[1];
          statusObj.step = +_step;
        }
      }
    }
    var isNormalMenu = 0;
    if (DevType == "BF" || DevType == "bF") {
      //新版协议
      let fault_record = 0,
        status_byte = 0,
        isworking = 0,
        isFastPreheat = 0,
        _byte19;
        (statusObj.wrongType = "");
      let workmode = false,
        autoMenuID = 0;
      for (var key in ctrl_arr) {
        if (key == 9) {
          if (+ctrl_arr[key] == 2) {
            return;
          }
        }
        if (key == 11) {
          //工作状态
          let _item = +ctrl_arr[key];
          status_byte = _item;
          ConfigJson0xBF.forEach((item, key) => {
            if (_item == parseInt(+item.code, 10)) {
              statusObj = item;
            }
          });
          if (_item == 3) {
            isworking = 1;
          }
        }

        if (key == 12) {
          //菜谱id
          _recipeId += Math.pow(16, 4) * parseInt(ctrl_arr[key]);
        }
        if (key == 13) {
          _recipeId += Math.pow(16, 2) * parseInt(ctrl_arr[key]);
        }
        if (key == 14) {
          _recipeId += Math.pow(16, 0) * parseInt(ctrl_arr[key]);
          autoMenuID = parseInt(ctrl_arr[key]);
        }
        if (key == 15) {
          //步骤
          let _item = +ctrl_arr[key];
          let _str = parseInt(_item).toString(16);
          let _step = _str[1];
          statusObj.step = +_step;
        }
        if (key == 19) {
          let _item = +ctrl_arr[key];
          _byte19 = _item;
          if (_item == 0xc0 && isworking) {
            fault_record = 1;
          }
          var autoMenu =
            _item == 0xe0 &&
            (autoMenuID != 16 &&
              autoMenuID != 17 &&
              autoMenuID != 18 &&
              autoMenuID != 19 &&
              autoMenuID != 20 &&
              autoMenuID != 23 &&
              autoMenuID != 25 &&
              autoMenuID != 26);
          if (
            (_item == 0x20 ||
              _item == 0xb0 ||
              _item == 0xd0 ||
              _item == 0xc1 ||
               autoMenu||
              _item == 0x31 ||
              _item == 0x33 ||
              _item == 0x3a) &&
            status_byte != 2
          ) {
            //判断水箱哟没有插好
            workmode = true;
          }

          if (_item == 0x4b && status_byte != 5&&status_byte!=4&&status_byte!=2) {
            //不为预约，就是快捷预热
            isFastPreheat = 1;
            statusObj.workStatus = LanguagePack.fastPreheat;
            statusObj.showTime = true;
            statusObj.canBegin = false;
            statusObj.hasStopBtn = false;
            statusObj.hasContinue = false;
            statusObj.time_stop = 1;
            statusObj.otherStatus = 0;
            if(status_byte==6){//特殊处理，快捷预热并暂停，就是显示暂停
              statusObj.workStatus = LanguagePack.pausing;
              statusObj.showTime = true;
              statusObj.canBegin = false;
              statusObj.hasStopBtn = false;
              statusObj.hasContinue = false;
              statusObj.time_stop = 1;
              statusObj.otherStatus = 1;
            }
          }
          if (
            _item == 0xe0 ||
            _item == 0xe1 ||
            _item == 0xe2 ||
            _item == 0xe3
          ) {
            //普通菜谱
            isNormalMenu = 1;
          }
          console.log(_item,isFastPreheat);
        }

        var tempHight = ctrl_arr[20],tempLow = ctrl_arr[21];
        var temp = parseInt(tempHight)*256 + parseInt(tempLow);
        if(temp >= 320){
          statusObj.tempHight = true;
        }else{
          statusObj.tempHight = false;
        }

        if (key == 26) {
          //童锁状态或者故障
          let _item = +ctrl_arr[key];
          var _byte26Str = this.tranformTo2Bit(parseInt(_item));
          console.log(
            "childrenlockOrFault_26: ",
            _item,
            "  changeStr: ",
            _byte26Str
          );
          if (parseInt(_byte26Str[7 - 0]) == 1) {
            statusObj.childrenlock = 1;
          } else {
            statusObj.childrenlock = 0;
          }
          // $(".fault_mask").remove();
          // var _fault_record = true;
          $('.fault_mask').hide();
          $('.showbox_content').text('');

          let _sn8 = window.localStorage.getItem("SnType");
          if (_item >= 128&& _sn8!='0ET135QL') {
            //有故障
            let _status_dec = "";
            let devType = window.localStorage.getItem("DevType");
            var mdSmartSub = new mdSmart.msg(devType);
            let requestJson = [0x32];
            let cmd = mdSmartSub.requestStatus(requestJson);
            bridge.startCmdProcess(
              cmd,
              function(messageBack) {
                console.log("故障messageBack", messageBack);
                let _item = parseInt(messageBack[11]);
                if (
                  parseInt(messageBack[11]) == 1 ||
                  parseInt(messageBack[12]) == 1 ||
                  parseInt(messageBack[21]) == 1 ||
                  parseInt(messageBack[22]) == 1
                ) {
                  _status_dec = "蒸汽传感器开路";
                }
                if (
                  parseInt(messageBack[11]) == 2 ||
                  parseInt(messageBack[12]) == 2 ||
                  parseInt(messageBack[21]) == 2 ||
                  parseInt(messageBack[22]) == 2
                ) {
                  _status_dec = "蒸汽传感器短路";
                }
                if (
                  parseInt(messageBack[13]) == 1 ||
                  parseInt(messageBack[14]) == 1 ||
                  parseInt(messageBack[15]) == 1 ||
                  parseInt(messageBack[16]) == 1 ||
                  parseInt(messageBack[17]) == 1 ||
                  parseInt(messageBack[18]) == 1
                ) {
                  _status_dec = "温度传感器开路";
                }
                if (
                  parseInt(messageBack[13]) == 2 ||
                  parseInt(messageBack[14]) == 2 ||
                  parseInt(messageBack[15]) == 2 ||
                  parseInt(messageBack[16]) == 2 ||
                  parseInt(messageBack[17]) == 2 ||
                  parseInt(messageBack[18]) == 2
                ) {
                  _status_dec = "温度传感器短路";
                }
                if (
                  parseInt(messageBack[19]) == 1 ||
                  parseInt(messageBack[20]) == 1
                ) {
                  _status_dec = "重量传感器开路";
                }
                if (
                  parseInt(messageBack[19]) == 2 ||
                  parseInt(messageBack[20]) == 2
                ) {
                  _status_dec = "重量传感器短路";
                }
                if (parseInt(messageBack[23]) == 1) {
                  _status_dec = "炉腔传感器开路";
                }
                if (parseInt(messageBack[23]) == 2) {
                  _status_dec = "炉腔传感器短路";
                }
                if (parseInt(messageBack[24]) == 0x05) {
                  _status_dec = "高温信号保护";
                }
                if (parseInt(messageBack[24]) == 0x06) {
                  _status_dec = "低温信号保护";
                }
                // if(parseInt(messageBack[25])==1){
                //   _status_dec = '肉类传感器开路';
                // }
                if (parseInt(messageBack[25]) == 2) {
                  _status_dec = "肉类传感器短路";
                }
                if (
                  parseInt(messageBack[26]) > 0 &&
                  parseInt(messageBack[26]) < 255
                ) {
                  let _item1 = parseInt(messageBack[26]);
                  let _num = _item1.toString(16);
                  _status_dec = "变频器E-" + _num[1];
                }
                if (parseInt(messageBack[27]) == 1) {
                  _status_dec = "检测不到市电频率";
                }
                console.log(_status_dec, "99999");
                // statusObj.wrongDec = _status_dec;
                // statusObj.wrongType = 'fault';
                // console.log(_fault_record);
                // if(_fault_record){
                //   $("body").append(
                //     ''
                //   );
                //   _fault_record = false;
                //   console.log(_fault_record,'3333');
                // }
                $('.fault_mask').show();
                $('.showbox_content').text(_status_dec);
               
              },
              function(errorCode) {
                console.log(errorCode);
              }
            );
            // let wrong_dec = SwitchDec.switchFault(_item,'BF');
            // statusObj.wrongDec = wrong_dec;
            // if(statusObj.wrongDec){
            //   statusObj.wrongType = 'fault';
            // }
          } else {
            if (status_byte == 3) {
              //工作中才判断预热
              if (parseInt(_byte26Str[7 - 5]) && (_byte19!=0x4b)) {
                //预热中
                statusObj.workStatus = LanguagePack.preheat;
                statusObj.showTime = true;
                statusObj.canBegin = false;
                statusObj.hasStopBtn = false;
                statusObj.hasContinue = false;
                statusObj.time_stop = 1;
              } else {
                if (!isFastPreheat) {
                  statusObj.workStatus = LanguagePack.working;
                  statusObj.showStatus = true;
                  statusObj.showTime = true;
                  statusObj.canBegin = false;
                  statusObj.hasStopBtn = true;
                  statusObj.hasContinue = false;
                  statusObj.time_stop = 0;
                }
              }
            }
            if (parseInt(_byte26Str[7 - 6]) && status_byte != 6) {
              statusObj.workStatus = LanguagePack.preheatFinish;
              statusObj.showTime = true;
              statusObj.canBegin = false;
              statusObj.hasStopBtn = false;
              statusObj.hasContinue = false;
              statusObj.time_stop = 1;
            }
            //statusObj.wrongType = '';
            let warn_dec = SwitchDec.switchWarn(_item, "BF", fault_record);
            statusObj.wrongDec = warn_dec;

            if (statusObj.wrongDec) {
              // if(statusObj.showTime){
              //   statusObj.wrongType = 'warn';
              // }else{
              //   statusObj.wrongType = '';
              // }
              statusObj.wrongType = "warn";
              let _dev = window.localStorage.getItem("WhichDev");
              if (_dev == "9B") {
                if (workmode) {
                  statusObj.wrongType = "warn";             
                } else {
                  statusObj.wrongType = "";
                }
              }
              if(statusObj.wrongDec==LanguagePack.lumenmeiguan){
                if(statusObj.workStatus==LanguagePack.endMenu){
                  statusObj.wrongType = "warn";
                  // statusObj.wrongDec = '';
                }else{
                  statusObj.wrongType = "";
                  statusObj.lumenOpen = 1;
                }
              }

            }
          }
        }

        if (key == 27) {
          //提示
          let _item = +ctrl_arr[key];
          //statusObj.wrongType = '';
          var _byte27Str = this.tranformTo2Bit(parseInt(_item));
          console.log("warning_27", _item, "  changeStr: ", _byte27Str);
          if (parseInt(_byte27Str[7 - 3])) {
            statusObj.wrongDec = LanguagePack.doorLockDec;
            statusObj.wrongType = "warn";
          }
          if (parseInt(_byte27Str[7 - 4])) {
            statusObj.wrongDec = LanguagePack.doorLockDec;
            statusObj.wrongType = "warn";
          }
          if (parseInt(_byte27Str[7 - 5])) {
            statusObj.wrongDec = LanguagePack.doorLockDec;
            statusObj.wrongType = "warn";
          }
          if (parseInt(_byte27Str[7 - 6])) {
            statusObj.wrongTipType = "tip";
          } else {
            statusObj.wrongTipType = "";
          }
        }
      }
      if (isNormalMenu) {
        _recipeId = 0;
      }
    }
    console.log("_recipeMapId:" + _recipeId + "  _step:" + statusObj.step);
    if (parseInt(_recipeId) == 0) {
      console.log("clear_recipe");
      window.localStorage.setItem("_recipeName", "");
      window.localStorage.setItem("_recipeId", "");
    }
    statusObj.recipeMapId = _recipeId;
    let getSn = window.localStorage.getItem("SnType");
    if (getSn == "0TPN36FQ") {
      //特定sn,蒸汽炉
      if (statusObj.code == 1 || statusObj.code == 2) {
        statusObj.recipeMapId = 0;
      }
      if (isNormalMenu) {
        statusObj.recipeMapId = 0;
      }
    }
    if (statusObj.childrenlock) {
      statusObj.canBegin = true;
    }

    return statusObj;
  },
  getNewStatus(ctrl_arr) {
    //新版协议
    let statusObj = {};
    let _recipeId = 0;
    for (var key in ctrl_arr) {
      if (key == 10) {
        //工作状态
      }
    }
  },
  /*串口协议 解析*/
  getWorkStatus: function(ctrl_arr) {
    let _oldStatus = this.getOldStatus(ctrl_arr); //旧版协议
    let _newStatus = this.getNewStatus(ctrl_arr);
    return _oldStatus;
  },
  getWorkTime(ctrl_arr) {
    var DevType = window.localStorage.getItem("DevType"); //设备类型型号
    var _time = {};
    if (DevType == "BF" || DevType == "bF") {
      //0xBF
      for (var key in ctrl_arr) {
        if (key == 16) {
          _time.h = +ctrl_arr[key];
        }
        if (key == 17) {
          _time.m = +ctrl_arr[key];
        }
        if (key == 18) {
          _time.s = +ctrl_arr[key];
        }
      }
    }
    if (DevType == "B4" || DevType == "b4") {
      //小烤箱
      for (var key in ctrl_arr) {
        if (key == 12) {
          _time.h = +ctrl_arr[key];
        }
        if (key == 13) {
          _time.m = +ctrl_arr[key];
        }
        if (key == 22) {
          _time.s = +ctrl_arr[key];
        }
      }
    }
    if (DevType == "B1" || DevType == "b1") {
      //大烤箱
      for (var key in ctrl_arr) {
        if (key == 12) {
          _time.h = +ctrl_arr[key];
        }
        if (key == 13) {
          _time.m = +ctrl_arr[key];
        }
        if (key == 21) {
          _time.s = +ctrl_arr[key];
        }
      }
    }

    if (DevType == "B0" || DevType == "b0") {
      //微波炉
      for (var key in ctrl_arr) {
        if (key == 12) {
          _time.m = +ctrl_arr[key];
        }
        if (key == 13) {
          _time.s = +ctrl_arr[key];
        }
      }
      _time.h = 0;
    }

    if (DevType == "B2" || DevType == "b2") {
      //蒸汽炉
      for (var key in ctrl_arr) {
        if (key == 12) {
          _time.h = +ctrl_arr[key];
        }
        if (key == 13) {
          _time.m = +ctrl_arr[key];
        }
        if (key == 19) {
          _time.s = +ctrl_arr[key];
        }
      }
    }

    return _time;
  }
};
