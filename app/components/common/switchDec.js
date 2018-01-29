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
    return str_2;
  },
  switchDevicetypes: function(devicetypes) {
    //设备
    if (devicetypes == undefined || devicetypes == "") {
      return;
    }
    let devicetypes_dec = "";
    if (devicetypes == 2) {
      //小烤箱
      devicetypes_dec = LanguagePack.xiaokaoxiang;
    }
    if (devicetypes == 3) {
      //大烤箱
      devicetypes_dec = LanguagePack.dakaoxiang;
    }
    if (devicetypes == 1) {
      //微波炉
      devicetypes_dec = LanguagePack.weibolu;
    }
    if (devicetypes == 4) {
      //蒸汽炉
      devicetypes_dec = LanguagePack.zhengqilu;
    }
    if (devicetypes == 5) {
      //蒸汽炉
      devicetypes_dec = LanguagePack.weibozhengqi;
    }
    if (devicetypes == 6) {
      //蒸汽烤箱
      devicetypes_dec = LanguagePack.zhengqikaoxiang;
    }
    return devicetypes_dec;
  },
  switchDevType: function(devicetypes) {
    //设备
    let devicetypes_type = "";
    if (devicetypes == 2) {
      //小烤箱
      devicetypes_type = "B4";
    }
    if (devicetypes == 3) {
      //大烤箱
      devicetypes_type = "B1";
      let _whichDev = window.localStorage.getItem("WhichDev");
      if (_whichDev == "9A") {
        devicetypes_type = "9A";
      }
    }
    if (devicetypes == 1) {
      //微波炉
      devicetypes_type = "B0";
    }
    if (devicetypes == 4) {
      //蒸汽炉
      devicetypes_type = "B2";
    }
    if (devicetypes == 5) {
      //BF
      devicetypes_type = "BF";
    }
    if (devicetypes == 6) {
      //BF
      devicetypes_type = "9B";
    }
    return devicetypes_type;
  },
  switchEasy: function(easy) {
    let easy_dec = "";
    switch (+easy) {
      case 1:
        easy_dec = LanguagePack.simple;
        break;
      case 2:
        easy_dec = LanguagePack.middling;
        break;
      case 3:
        easy_dec = LanguagePack.difficult;
        break;
      case 4:
        easy_dec = LanguagePack.moreDifficult;
        break;
      default:
    }
    return easy_dec;
  },
  switchFault: function(_item, dev_type) {
    //故障
    let _status_dec = "";
    if (dev_type == "BF") {
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
            _status_dec = "温度传感器开路";
          }
          if (parseInt(messageBack[23]) == 2) {
            _status_dec = "温度传感器短路";
          }
          if (parseInt(messageBack[24]) == 0x05) {
            _status_dec = "高温信号保护";
          }
          if (parseInt(messageBack[24]) == 0x06) {
            _status_dec = "低温信号保护";
          }
          if (parseInt(messageBack[25]) == 1) {
            _status_dec = "肉类传感器开路";
          }
          if (parseInt(messageBack[25]) == 2) {
            _status_dec = "肉类传感器短路";
          }
          if (parseInt(messageBack[26]) == 2) {
            let _num = _item.toString(16);
            _status_dec = "变频器E-" + _num[1];
          }
          console.log(_status_dec, "99999");
          return _status_dec;
        },
        function(errorCode) {
          console.log(errorCode);
        }
      );
    }

    if (dev_type == "B4") {
      switch (_item) {
        case 0:
          _status_dec = "";
          break;
        case 1:
          _status_dec = LanguagePack.E01kailu;
          break;
        case 2:
          _status_dec = LanguagePack.E02duanlu;
          break;
        case 3:
          _status_dec = LanguagePack.E03kailu;
          break;
        case 4:
          _status_dec = LanguagePack.E04duanlu;
          break;
      }
    }

    if (dev_type == "B1") {
      switch (_item) {
        case 0:
          _status_dec = "";
          break;
        case 1:
          _status_dec = LanguagePack.fault_kailu;
          break;
        case 2:
          _status_dec = LanguagePack.fault_duanlu;
          break;
        case 3:
          _status_dec = LanguagePack.fault_anjian;
          break;
      }
    }
    if (dev_type == "B0") {
      var snType = window.localStorage.getItem("SnType");
      var _index = snType.indexOf("X7321D");
      if (_index > -1) {
        //假如为x7
        let _num = _item.toString(16);
        let _status_dec = "E-" + _num;
        console.log("x7故障:", _num, typeof _num);
        // if(_num=='21'){
        //   _status_dec = 'C-'+_num;
        // }
        if (_item) {
          //韩建勇要求，X7的所有故障代码都不显示，只显示故障...
          //return _status_dec;
          let _isError = LanguagePack.isError;
          return _isError;
        } else {
          return "";
        }
      }
      switch (_item) {
        case 0:
          _status_dec = "";
          break;
        case 1:
          _status_dec = LanguagePack.fault_chuangankailu;
          break;
        case 2:
          _status_dec = LanguagePack.fault_chuanganduanlu;
          break;
        case 3:
          _status_dec = LanguagePack.fault_zhengqikailu;
          break;
        case 4:
          _status_dec = LanguagePack.fault_zhengqiduanlu;
          break;
        case 5:
          _status_dec = LanguagePack.fault_gaowen;
          break;
        case 6:
          _status_dec = LanguagePack.fault_diwen;
          break;
        case 225:
          _status_dec = LanguagePack.fault_E01;
          break;
        case 229:
          _status_dec = LanguagePack.fault_E05;
          break;
        case 230:
          _status_dec = LanguagePack.fault_E06;
          break;
        case 232:
          _status_dec = LanguagePack.fault_E08;
          break;
      }
    }

    if (dev_type == "B2") {
      switch (_item) {
        case 0:
          _status_dec = "";
          break;
        case 1:
          _status_dec = LanguagePack.fault_fashengqikailu;
          break;
        case 4:
          _status_dec = LanguagePack.fault_fashengqiduanlu;
          break;
      }
    }

    return _status_dec;
  },
  switchWarn: function(_item, dev, fault_record) {
    //提醒代码
    console.log(fault_record, "switchWarn");
    let _status_dec = "";
    if (dev == "BF") {
      let _byte26Str = this.tranformTo2Bit(parseInt(_item));
      let getSn = window.localStorage.getItem("SnType");
      let _dev = window.localStorage.getItem("WhichDev");
      if (getSn == "0TPN36FQ" || _dev == "9B") {
        //特定sn
        if (parseInt(_byte26Str[7 - 1])) {
          _status_dec = LanguagePack.lumenmeiguan;
        } else if (parseInt(_byte26Str[7 - 2])) {
          _status_dec = LanguagePack.WaterTank;
        } else if (parseInt(_byte26Str[7 - 3])) {
          _status_dec = LanguagePack.waterShortage;
        } else if (parseInt(_byte26Str[7 - 4])) {
          _status_dec = LanguagePack.changeWater;
        } else if (parseInt(_byte26Str[7 - 5])) {
          // _status_dec = LanguagePack.preheat;
        } else if (parseInt(_byte26Str[7 - 6])) {
          // _status_dec = LanguagePack.preheatFinish;
        }
      } else {
        if (parseInt(_byte26Str[7 - 1]) && fault_record) {
          _status_dec = LanguagePack.doorLockDec;
        } else if (parseInt(_byte26Str[7 - 2])) {
          _status_dec = LanguagePack.WaterTank;
        } else if (parseInt(_byte26Str[7 - 3])) {
          _status_dec = LanguagePack.waterShortage;
        } else if (parseInt(_byte26Str[7 - 4])) {
          _status_dec = LanguagePack.changeWater;
        } else if (parseInt(_byte26Str[7 - 5])) {
          // _status_dec = LanguagePack.preheat;
        } else if (parseInt(_byte26Str[7 - 6])) {
          // _status_dec = LanguagePack.preheatFinish;
        }
      }
    }
    if (dev == "B0") {
      switch (_item) {
        case 1:
          _status_dec = LanguagePack.warn_out;
          break;
        case 2:
          _status_dec = LanguagePack.warn_lessWater;
          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf("X7321D");
          if (_index > -1) {
            //假如为x7
            _status_dec = LanguagePack.warn_lessWater_tip;
          }
          break;
        case 3:
          _status_dec = LanguagePack.preheatTo;
          break;
        case 4:
          _status_dec = LanguagePack.warn_foodTurn;
          break;
        case 5:
          _status_dec = LanguagePack.warn_jiaobang;
          break;
        case 6:
          _status_dec = LanguagePack.warn_clear;
          break;
        case 7:
          _status_dec = LanguagePack.warn_foot_error;
          break;
        case 8:
          _status_dec = LanguagePack.warn_cavity_high;
          break;
        case 33:
          _status_dec = LanguagePack.warn_fajiao_high;
          break;
        default:
          _status_dec = "";
      }
    }

    if (dev == "B2") {
      let _item = this.tranformTo2Bit(_item);
      let _length = _item.length - 1;
      if (parseInt(_item[_length - 0])) {
        _status_dec = LanguagePack.warn_chouchu;
      } else {
        _status_dec = LanguagePack.warn_waterClose;
      }
      if (parseInt(_item[_length - 1])) {
        _status_dec = LanguagePack.warn_noWater;
      } else {
        _status_dec = LanguagePack.warn_hasWater;
      }
      if (parseInt(_item[_length - 3])) {
        _status_dec = LanguagePack.warn_doorHasOpen;
      } else {
        _status_dec = LanguagePack.warn_doorHasClose;
      }
    }

    return _status_dec;
  }
};
