/**
 * @fileoverview iOS用bridge
 */
var mdSmartios = mdSmartios || {};
(function(mdSmartios) {
    if (mdSmartios.bridge) {
        console.log("mdSmartios.bridge is already defined.");
        return;
    }
    mdSmartios.bridge = mdSmartios.bridge || {};
    mdSmartios.bridge.storage={};

    /**
     * H5 调用APP,取得家电SN
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getDeviceSN = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getDeviceSN', p);

        return commandId;
    };

    /**
     * 启动/关闭语音识别模式
     */
    mdSmartios.bridge.setEnableVoice = function(onOff, callback, callbackFail) {
         var param = {};
         param.onOff = onOff;
         param.cammandId = Math.floor(Math.random() * 1000);
         var commandIds = param.cammandId;

         var p = JSON.stringify(param);
         console.log(p);

         if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
         }

         if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
         }

         var commandId = mdSmartios.bridge.po._execObjcMethod('setEnableVoice', p);

         return commandId;
    };

    /**
     * 判断是否开启语音识别模式
     */
    mdSmartios.bridge.getEnableVoice = function(callback, callbackFail) {
         var param = {};
         param.cammandId = Math.floor(Math.random() * 1000);
         var commandIds = param.cammandId;

         var p = JSON.stringify(param);
         console.log(p);

         if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
         }

         if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
         }

         var commandId = mdSmartios.bridge.po._execObjcMethod('getEnableVoice', p);

         return commandId;
    };

    /**
     * H5 调用APP,取得家电id
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getApplianceID = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceID', p);

        return commandId;
    };

    /**
     * 存储数据到app内存中(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */

    mdSmartios.bridge.setterValToStorage = function(key,value) {
        var p={};
        p[key]=value;
        mdSmartios.bridge.storage[key]= value;
        return  mdSmartios.bridge.po._execObjcMethod('setterVal',JSON.stringify(p));
    };

	/**
     * 从app内存中取得数据(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getterValFromStorage = function(keyName, callback, callbackFail) {
        var param = {};
        param.keyName = keyName;
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;

        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getterVal', p);

        return commandId;
    };

    /**
     * 处理从app内存中取数据的回调(WebView>JS)
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
    */


    mdSmartios.bridge.putValueToStorage = function(keyName,value) {
        console.log("putValueToStorage: "+keyName+ " : "+value);
        mdSmartios.bridge.storage[keyName]=value;
    };

    mdSmartios.bridge.setValueToStorageValues = function(value){
        var jsLocalStorageJsonObj = JSON.parse(value);
        for(var key in jsLocalStorageJsonObj){
            mdSmartios.bridge.storage[key] = jsLocalStorageJsonObj[key];
        }
    }

    /**
     * 启动/关闭语音识别模式
     */
    mdSmartios.bridge.setEnableVoice = function(onOff, callback, callbackFail) {
         var param = {};
         param.onOff = onOff;
         param.cammandId = Math.floor(Math.random() * 1000);
         var commandIds = param.cammandId;

         var p = JSON.stringify(param);
         console.log(p);

         if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
         }

         if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
         }

         var commandId = mdSmartios.bridge.po._execObjcMethod('setEnableVoice', p);

         return commandId;
    };

    /**
     * 判断是否开启语音识别模式
     */
    mdSmartios.bridge.getEnableVoice = function(callback, callbackFail) {
         var param = {};
         param.cammandId = Math.floor(Math.random() * 1000);
         var commandIds = param.cammandId;

         var p = JSON.stringify(param);
         console.log(p);

         if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
         }

         if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
         }

         var commandId = mdSmartios.bridge.po._execObjcMethod('getEnableVoice', p);

         return commandId;
    };

    /**
     * H5 调用APP,取得家电子类型
     * @return {Number}
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.getApplianceSubtype = function(callback, callbackFail) {
        var param={};
        param.cammandId = Math.floor(Math.random() * 1000);
        var commandIds = param.cammandId;
        var p = JSON.stringify(param);
        console.log(p);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandIds] = callback;
        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandIds] = callbackFail;
        }

        var commandId = mdSmartios.bridge.po._execObjcMethod('getApplianceSubtype', p);

        return commandId;
    };


    /**
     * 返回前页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                    -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.goBack = function() {
        console.log("function:mdSmartios.bridge.goBack");
        return mdSmartios.bridge.po._execObjcMethod('goBack');
    };

    /**
     * 显示家电信息页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.goInfoPage = function() {
        console.log("function:mdSmartios.bridge.goInfoPage");
        return mdSmartios.bridge.po._execObjcMethod('goInfoPage');
    };

    /**
     * 显示控制面板页(JS->WebView）
     * @param {json} pageParamers 控制面板页的启动参数,例如：{key1:value1,key2:value2}
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showControlPanelPage = function(pageParamers) {
        console.log("function:mdSmartios.bridge.showControlPanelPage");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        return mdSmartios.bridge.po._execObjcMethod('showControlPanelPage', p);
    };

    /**
     * 友盟分享(JS->WebView）
     * @param {json} pageParamers  分享的参数
     * @return {Number} 処理結果
     *                    0 : 分享成功
     *                   -1 : 分享失败
     *
     */
    mdSmartios.bridge.UMengshare = function(pageParamers) {
        console.log("function:mdSmartios.bridge.UMengshare");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        return mdSmartios.bridge.po._execObjcMethod('UMengshare', p);
    };

    /**
     *  H5 调用APP,友盟打点
     * @param {String} eventLabel 事件标签，友盟限制最多1000个取值，不允许统计类似搜索关键词、网页链接等随机生成的字符串信息
     */
    mdSmartios.bridge.UMengevent = function(eventLabel) {
        console.log("function:mdSmartios.bridge.UMengevent");
        var p = JSON.stringify({
            eventLabel : eventLabel
            });
        mdSmartios.bridge.po._execObjcMethod('UMengevent', p);
    };

    //扫描小米手环
    mdSmartios.bridge.MiScan = function(pageParamers,callback) {
    console.log("function:mdSmartios.bridge.MiScan");
    var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
    mdSmartios.bridge.setMiScanAction =callback;
    return mdSmartios.bridge.po._execObjcMethod('MiScan', p);

    };

   //返回mac地址值 {key1:value1,key2:value2}
   mdSmartios.bridge.setMiScanAction = undefined;
   mdSmartios.bridge.setMiScanBack = function(message) {

   if ( typeof mdSmartios.bridge.setMiScanAction == "function") {

   mdSmartios.bridge.setMiScanAction(message);
   }
   };


   //授权登录
   mdSmartios.bridge.MiLogin = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.MiLogin");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
   mdSmartios.bridge.setMiLoginAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('MiLogin', p);

   };

   //返回值  {key1:value1,key2:value2}
   mdSmartios.bridge.setMiLoginAction = undefined;
   mdSmartios.bridge.setMiLoginBack = function(message) {

   if ( typeof mdSmartios.bridge.setMiLoginAction == "function") {

   mdSmartios.bridge.setMiLoginAction(message);
   }
   };

   //删除手环
   mdSmartios.bridge.MiDelete = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.MiDelete");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });

   mdSmartios.bridge.setMiDeleteAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('MiDelete', p);

   };

   //返回值  {"result":@"YES"} YES成功 NO失败
   mdSmartios.bridge.setMiDeleteAction = undefined;
   mdSmartios.bridge.setMiDeleteBack = function(message) {

   if ( typeof mdSmartios.bridge.setMiDeleteAction == "function") {

   mdSmartios.bridge.setMiDeleteAction(message);
   }
   };

   //侧面小米手环
   mdSmartios.bridge.MiMenu = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.MiMenu");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
   mdSmartios.bridge.setMiMenuAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('MiMenu', p);

   };

   //返回值 {"result":"YES","haveMac":"YES","haveMiLogin":"YES"} 有内容的时候加上具体的内容
   mdSmartios.bridge.setMiMenuAction = undefined;
   mdSmartios.bridge.setMiMenuBack = function(message) {

   if ( typeof mdSmartios.bridge.setMiMenuAction == "function") {

   mdSmartios.bridge.setMiMenuAction(message);
   }
    };

  //保存本地数据
   mdSmartios.bridge.MiSaveData = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.MiSaveData");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
   mdSmartios.bridge.setMiSaveDataAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('MiSaveData', p);

   };

   //返回值  {"result":@"YES"} YES成功 NO失败
   mdSmartios.bridge.setMiSaveDataAction = undefined;
   mdSmartios.bridge.setMiSaveDataBack = function(message) {

   if ( typeof mdSmartios.bridge.setMiSaveDataAction == "function") {

   mdSmartios.bridge.setMiSaveDataAction(message);
   }
   };

   //蓝牙固件升级
   mdSmartios.bridge.FirmwareUpdate = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.FirmwareUpdate");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
   mdSmartios.bridge.setFirmwareUpdateAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('FirmwareUpdate', p);

   };

   //返回值  {"result":@"YES"} YES成功 NO失败
   mdSmartios.bridge.setFirmwareUpdateAction = undefined;
   mdSmartios.bridge.setFirmwareUpdateBack = function(message) {

   if ( typeof mdSmartios.bridge.setFirmwareUpdateAction == "function") {

   mdSmartios.bridge.setFirmwareUpdateAction(message);
   }
   };


    //查询固件升级进度
    mdSmartios.bridge.MiUpgradeProgress = function(pageParamers,callback) {
    console.log("function:mdSmartios.bridge.MiUpgradeProgress");
    var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
     mdSmartios.bridge.setMiUpgradeProgressAction =callback;
     return mdSmartios.bridge.po._execObjcMethod('MiUpgradeProgress', p);

     };

    //返回值  {"result":@"YES","progress":"50"} YES成功 NO失败， progress 进度值
    mdSmartios.bridge.setMiUpgradeProgressAction = undefined;
    mdSmartios.bridge.setMiUpgradeProgressBack = function(message) {

    if ( typeof mdSmartios.bridge.setMiUpgradeProgressAction == "function") {

     mdSmartios.bridge.setMiUpgradeProgressAction(message);
     }
    };

   //获取当前语言
   mdSmartios.bridge.getLanguage = function(pageParamers,callback) {
   console.log("function:mdSmartios.bridge.getLanguage");
   var p = JSON.stringify({
                        pageParameters : pageParamers
                        });
   mdSmartios.bridge.setLanguageAction =callback;
   return mdSmartios.bridge.po._execObjcMethod('getLanguage', p);

  };
  //Chinese English Japanese
  //返回当前语言 {"language":"English"}
   mdSmartios.bridge.setLanguageAction = undefined;
   mdSmartios.bridge.setLanguageBack = function(message) {

   if ( typeof mdSmartios.bridge.setLanguageAction == "function") {

    mdSmartios.bridge.setLanguageAction(message);
    }
  };

    /**
     * 取得显示控制面板页的参数(JS->WebView）
     * @return {json}
     */
    mdSmartios.bridge.getPageParameters = function() {
        console.log('function:mdSmartios.bridge.getPageParameters');
        var param = {};
        var p = JSON.stringify(param);
        var pageParameters = mdSmartios.bridge.po._execObjcMethod('getPageParameters', p);
        var jsonResult = JSON.parse(pageParameters);
        return jsonResult.pageParameters;
    };

    /**
     * 显示控制面板页(JS->WebView）
     * @param {String} controlPanelName 控制面板页的页面文件名，例如：controlPanel02
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showNamedControlPanelPage = function(controlPanelName) {
        console.log("function:mdSmartios.bridge.showNamedControlPanelPage");
        var p = JSON.stringify({
            controlPanelName : controlPanelName + '.html'
        });
        return mdSmartios.bridge.po._execObjcMethod('showControlPanelPage', p);
    };

    /**
     * 向iOS写log(JS->WebView）
     * @param {String} logContent log内容
     */
    mdSmartios.bridge.logToIOS = function(logContent) {
        console.log("function:mdSmartios.bridge.logToIOS");
        return mdSmartios.bridge.po._execObjcMethod('logToIOS', logContent);
    };

    /*
     * 取得网络类型
     * return LAN或WAN
     */
    mdSmartios.bridge.getNetType = function() {
        console.log("function:mdSmartios.bridge.getNetType");
        return mdSmartios.bridge.po._execObjcMethod('getCommunicationMethod');
    };

    /*
     * 取得卡片页在同类卡片中的顺序
     * return 0:第1、3、5...，1:第2、4、6...
     */
    mdSmartios.bridge.getCardOrder = function() {
        console.log("function:mdSmartios.bridge.getCardOrder");
        return mdSmartios.bridge.po._execObjcMethod('getCardOrder');
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备SN
     * return 取得设备SN
     */
    mdSmartios.bridge.getCurrentDevSN = function() {
        console.log("function:mdSmartios.bridge.getCurrentDevSN");
        return mdSmartios.bridge.retSnValue || mdSmartios.bridge.po._execObjcMethod('getCurrentDevSN');
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备SN
     * 设置sn
     */
    mdSmartios.bridge.setSnValue = function(retObjcValue) {

        mdSmartios.bridge.retSnValue = retObjcValue;

    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备子类型
     * 设置子类型
     */
    mdSmartios.bridge.setcurrentApplianceSubtype = function(retObjcValue) {

        mdSmartios.bridge.currentApplianceSubtype = retObjcValue;

    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得设备id
     * 设置设备id
     */
    mdSmartios.bridge.setApplicationIdValue = function(retObjcValue) {

        mdSmartios.bridge.applicationId = retObjcValue;

    };

    /**
     * 取家电协议版本(JS->WebView）
     * @return {Number} 家电协议版本
     */
    mdSmartios.bridge.getApplianceProtocolVersion = function() {
        console.log("function:mdSmartios.bridge.getApplianceProtocolVersion");
        return mdSmartios.bridge.po._execObjcMethod('getApplianceProtocolVersion');
    };

    /**
     * 显示家电信息入口页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showApplianceInfoEntryPage = function() {
        console.log("function:mdSmartios.bridge.showApplianceInfoEntryPage");
        return mdSmartios.bridge.po._execObjcMethod('showApplianceInfoEntryPage');
    };

    /**
     * 显示家电信息页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showApplianceInfoPage = function() {
        console.log("function:mdSmartios.bridge.showApplianceInfoPage");
        return mdSmartios.bridge.po._execObjcMethod('showApplianceInfoPage');
    };

    /**
     * 显示消息中心页(JS->WebView）
     * @return {Number} 処理結果
     *                    0 : 成功
     *                   -1 : 失败(无插件)
     *                   -2 : 失败(无文件)
     */
    mdSmartios.bridge.showInfoCenterPage = function() {
        console.log("function:mdSmartios.bridge.showInfoCenterPage");
        return mdSmartios.bridge.po._execObjcMethod('showInfoCenterPage');
    };

    /**
     * 开始异步处理的命令
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.startCmdProcess = function(messageBody, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcess: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }

        var commandId = mdSmartios.bridge.startCmdProcessGo(param);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

        var isQuery=true;
        switch(messageBody[2]){
            case 0xea:
            case 0xeb:
            case 0xec:
            case 0xed:
            case 0xef:
                if((messageBody[18]<<8|messageBody[17])==50002){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
                break;
            default:
                if(messageBody[9]==3){
                    isQuery=true;
                }else{
                    isQuery=false;
                }
        }
//keane 指令失败函数自定义
//        if(!isQuery){
//            if(typeof callbackFail != "function"){
//                callbackFail=function(){};
//            }
//        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        }


        return commandId;
    };

    /**
     * 开始异步处理的命令 可自定义Loading是否显示
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @param {bool} isLoading 是否显示loading阻塞界面
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.startCmdProcessCustomLoading = function(messageBody,isLoading, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcess: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;

        }

        if(isLoading != undefined){
            param.isLoading = isLoading;
        }

        var commandId = mdSmartios.bridge.startCmdProcessGo(param);

        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

//        if(typeof callbackFail != "function"){
//            callbackFail=function(){};
//        }

        if ( typeof callbackFail == "function") {
            mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        }

        return commandId;
    };

    /**
     * 开始异步处理的命令 真实发送接口
     * @param {intArray} param 发送的数据
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */

    mdSmartios.bridge.startCmdProcessGo = function(param) {
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startCmdProcess', p);
        return commandId;

    };


    /**
     * 针对管家插件 开始异步处理的命令
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} param 发送的数据
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1    : 处理失败
     */

    mdSmartios.bridge.startCmdProcessExt = function(messageBody, callback, callbackFail) {
        console.log('function:mdSmartios.bridge.startCmdProcessExt: messageBody=' + messageBody + ', callback=' + callback + ', callbackFail=' + callbackFail);
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('startCmdProcessExt', p);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackFunctions[commandId] = callback;
        }

        if(typeof callbackFail != "function"){
            callbackFail=function(){};
        }
        mdSmartios.bridge.callbackFailFunctions[commandId] = callbackFail;
        return commandId;
    };


    /**
     * 取消命令执行
     * @param {Number} commandId 命令ID
     * @return void
     * @note 不是处理中的时候,忽略
     */
    mdSmartios.bridge.stopCmdProcess = function(commandId) {
        console.log('function:mdSmartios.bridge.stopCmdProcess: commandId=' + commandId);
        var p = JSON.stringify({
            commandId : commandId
        });
        mdSmartios.bridge.po._execObjcMethod('stopCmdProcess', p);
    };

    /**
     * 取得命令执行状态
     * @param {Number} commandId 命令ID
     * @return {JSONObject} 命令执行状态
     *         {Number} .status 命令执行状态
     *                     0 : 未开始
     *                     1 : 进行中
     *                     2 : 结束
     *                    -1 : 异常
     *                    -2 : 取消
     *         {String} .errMessage 异常信息
     */
    mdSmartios.bridge.getCmdProcessInfo = function(commandId) {
        console.log('function:mdSmartios.bridge.getCmdProcessInfo: commandId=' + commandId);
        var p = JSON.stringify({
            commandId : commandId
        });
        return mdSmartios.bridge.po._execObjcMethod('getCmdProcessInfo', p);
    };

    /**
     * 取得卡片头部Tilte信息
     * @param {String} callback 处理成功后的回调函数
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getCardTitle = function(callback) {
        console.log('function:mdSmartios.bridge.getCardTitle: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setCardTitleCBF = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getCardTitle', p);
        return commandId;
    };

    /**
     * 取得插件版本信息
     * @param {String} callback 处理成功后的回调函数
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getPlugVersion = function() {
        console.log('function:mdSmartios.bridge.getPlugVersion');
        var param = {};
        var p = JSON.stringify(param);
        var version = mdSmartios.bridge.po._execObjcMethod('getPlugVersion', p);
        return version;
    };

    //配置文件
    mdSmartios.bridge.getConfigInfo = function(cmdParamers,callback) {
        console.log('function:mdSmartios.bridge.getConfigInfo: callback=' + callback);
        //var param = {"fileName":"0xDB"};
        cmdParamers.cammandId = Math.floor(Math.random() * 10000000);
		var commandId = cmdParamers.cammandId;
        var p = JSON.stringify(cmdParamers);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setConfigInfoCBF[commandId] = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getConfigInfo', p);
        return commandId;

    };

    mdSmartios.bridge.setConfigInfoCBF = {};
    mdSmartios.bridge.setConfigInfo = function(retObjcValue,message) {
         // var jsonResult = JSON.parse(message);
        var cbf = mdSmartios.bridge.setConfigInfoCBF[retObjcValue];

        if ( typeof cbf == "function") {
            //mdSmartios.bridge.setConfigInfoCBF(jsonResult.messageBody);
            cbf(message);
        }
        delete mdSmartios.bridge.setConfigInfoCBF[retObjcValue];
    };

    //配置文件排序
    mdSmartios.bridge.getSort = function(callback) {
        console.log('function:mdSmartios.bridge.getSort: callback=' + callback);
        var param = {
            "isWritestr":0,
            "fileName":"cycleArray"
        };
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.setSortCBF = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getSort', p);
        return commandId;
    };

    mdSmartios.bridge.setSortCBF = undefined;
    mdSmartios.bridge.setSort = function(message) {
        if ( typeof mdSmartios.bridge.setSortCBF == "function") {
            mdSmartios.bridge.setSortCBF(message);
        }
    };


    /**
     * 取得语言Code
     * @return {String} 语言Code
     *                    zh : 中国语
     *                    en : 英语
     */
    mdSmartios.bridge.getLangCode = function() {
        console.log('function:mdSmartios.bridge.getLangCode');
        var param = {};
        var p = JSON.stringify(param);

        var langCode = mdSmartios.bridge.po._execObjcMethod('getLangCode', p);

        if (langCode == undefined || langCode == 0 || langCode.length == 0) {
            langCode = "zh";
        }
        return langCode;
    };

    /*
     * marco 修改：2015.12.10
     * 修改 取得当前家电id
     * return 取得当前家电id
     */
    mdSmartios.bridge.getCurrentApplianceID = function() {
        //var currentApplicanceID = mdSmartios.bridge.po._execObjcMethod('getCurrentApplianceID');

        return mdSmartios.bridge.applicationId || mdSmartios.bridge.po._execObjcMethod('getCurrentApplianceID');
    };

    /**
     * 取得当前家电子类型
     * @return {String}
     */
    mdSmartios.bridge.getCurrentApplianceSubtype = function() {

         return mdSmartios.bridge.currentApplianceSubtype;
    };

    /**
     * Clear WebView Cache
     * @return void
     */
    mdSmartios.bridge.clearWebViewCache = function() {
        console.log('function:mdSmartios.bridge.clearWebViewCache');
        mdSmartios.bridge.po._execObjcMethod('clearWebViewCache');
    };
    mdSmartios.bridge.callbackFunctions = {};
    mdSmartios.bridge.callbackFailFunctions = {};
    mdSmartios.bridge.setCardTitleCBF = undefined;
    //卡片的标题(IOS调用：回复getCardTitle)
    mdSmartios.bridge.setCardTitle = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.setCardTitleCBF == "function") {
            mdSmartios.bridge.setCardTitleCBF(jsonResult.messageBody);
        }
        $('#loadingPopup>span').html(jsonResult.messageBody);
    };
    //设备主动上报的消息(IOS调用：主动发起)
    mdSmartios.bridge.recieveMessage = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("recieveMessage", [jsonResult.messageBody]);
    };

    mdSmartios.bridge.recieveAPNS = function(message) {
        var jsonTemp = JSON.parse(message);
        var messageBody = JSON.stringify(jsonTemp.messageBody);
        $.event.trigger("recieveAPNS", messageBody);
    };

    //设备返回的消息(IOS调用：主动发起)
    mdSmartios.bridge.updateCard = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("updateCard", [jsonResult.messageBody]);
    };

    mdSmartios.bridge.update = function(message) {
        var jsonResult = JSON.parse(message);
        $.event.trigger("updateCard", [jsonResult.messageBody]);
    };

    //更新界面时机(针对管家插件 单品跳转后返回时机)
    mdSmartios.bridge.updatePlug = function() {
        $.event.trigger("updatePlug");
    };

    //直接返回值(IOS赋值：回复JS所有类型请求（startCmdProcess：命令id，getLangCode：语言code）)
    mdSmartios.bridge.retObjcValue = 0;

    mdSmartios.bridge.retSnValue = "";

    mdSmartios.bridge.applicationId = "";

    mdSmartios.bridge.currentApplianceSubtype = "";

    /*
     *指定命令的回复电文(IOS调用：回复startCmdProcess)
     *@param (int) retObjcValue 命令id
     *       (String) result 回复
     *                result.messageBody 回复电文
     *                result.errCode 错误码
     *                             1 超时   -1 查询超时
     *                result.errMessage 错误信息
     */
    mdSmartios.bridge.callbackFunction = function(retObjcValue, result) {
        var jsonResult = JSON.parse(result);
        var cbf = mdSmartios.bridge.callbackFunctions[retObjcValue];
        var cbff = mdSmartios.bridge.callbackFailFunctions[retObjcValue];
        if (jsonResult.errCode !== undefined && jsonResult.errMessage == 'TimeOut') {
            if(jsonResult.errCode==-1){
                if(location.href.indexOf('card')!=-1){
                    bridge.logToIOS('Jump to cardDisconnect.html.');
                    location.href='cardDisconnect2.html';
                }
            }else{
                //keane 指令失败函数自定义 Mod S
                if (typeof cbff == "function") {
                    cbff(-1);//表示指令超时 －1
                }
                if(jsonResult.isAction == 1) {
                    // 控制超时才弹出提示
                    bridge.popupTimeOut();
                }
                //keane 指令失败函数自定义 Mod E
            }
        } else {
            if ( typeof cbf == "function") {
                cbf(jsonResult.messageBody);
            }
        }
        delete mdSmartios.bridge.callbackFunctions[retObjcValue];
        delete mdSmartios.bridge.callbackFailFunctions[retObjcValue];
    };


    /**
     *  加载在线情况，显示和隐藏loading界面
     *
     */
        //var loadingDiv = document.createElement("DIV");
        //loadingDiv.id = 'loadingPopup';
        //var loadingSpan = document.createElement("SPAN");
        //loadingDiv.appendChild(loadingSpan);
        //var loadingP = document.createElement("P");
        //loadingDiv.appendChild(loadingP);
        ////var rotateImg=document.createElement('IMG');
        ////rotateImg.src='../common/images/icon_loading.png';
        ////loadingDiv.appendChild(rotateImg);
        //document.documentElement.appendChild(loadingDiv);
        //document.getElementById('loadingPopup').hide();



        //keane 指令失败函数自定义
    mdSmartios.bridge.popupTimeOut = function() {
        if(!document.getElementById("timeoutPopup")){
            var timeoutDiv = document.createElement("DIV");
            timeoutDiv.setAttribute('data-role', 'popup');
            timeoutDiv.id = 'timeoutPopup';
            var timeoutP = document.createElement("P");
            timeoutDiv.appendChild(timeoutP);
            document.documentElement.appendChild(timeoutDiv);
            $('#timeoutPopup').popup({
                afterclose: function( event, ui ) {
                    $('body').unbind('touchstart');}
            });
        }

        if (mdSmartios.bridge.getLangCode() == 'en') {
            $('#timeoutPopup>p').html('Network timeout, please retry.');
        } else {
            $('#timeoutPopup>p').html('网络繁忙，请重试');
        }
        $('#timeoutPopup').popup('open');
        $('body').bind('touchstart',function(e){
            e.preventDefault();
        });
        mdSmartios.timeoutId=setTimeout(function(){
            $('#timeoutPopup').popup('close');
            clearTimeout(mdSmartios.timeoutId);
        },2000);
    };


    mdSmartios.bridge.openLoading = function() {
        if(location.href.indexOf('cardDisconnect.html')==-1 || location.href.indexOf('cardDisconnect2.html')==-1){
            if (mdSmartios.bridge.getLangCode() == 'en') {
                $('#loadingPopup>p').html('Loading');
            } else {
                $('#loadingPopup>p').html('拼命为您连接中...');
            }
            $('#loadingPopup').show();
        }
    };

    mdSmartios.bridge.closeLoading = function() {
        $('#loadingPopup').hide();
    };

    mdSmartios.bridge.po = {
        _execObjcMethod : function(method, data) {
            try {
                var tmp = method;

                if (data != undefined && data != '') {
                    tmp = tmp + '?' + data;
                }
                console.log('Exec ' + tmp);
                var iframe = document.createElement("IFRAME");
                iframe.setAttribute("src", "iosbridge://" + tmp);
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            } catch(e) {
                console.log(method + ' exception');
            }
            //var value = mdSmartios.bridge.commandIds[id];
            //
            //delete mdSmartios.bridge.commandIds[id];

            //if(value != undefined){
            //if(value != undefined){
            //    bridge.logToIOS("javaScript:mdSmartios.bridge.retObjcValue == " + value + " id " + id);
            //}else{
            //    bridge.logToIOS("javaScript:mdSmartios.bridge.retObjcValue == undefined");
            //}
            return mdSmartios.bridge.retObjcValue;
        }
    };

    /**
     * 输出日志
     */
    mdSmartios.bridge.jsWindowOnError = function(obj, arg1, arg2, arg3) {
        var param = {
            obj : obj,
            arg1 : arg1,
            arg2 : arg2,
            arg3 : arg3
        };
        var p = JSON.stringify(param);
        console.log('mdSmartios.bridge.jsWindowOnError():' + p);
    };
    //IOS主动上报的消息-设备连接状态(IOS调用：主动发起)
    //pIsConnect 1:连接成功 0:断开连接
    mdSmartios.bridge.setApplianceConnnectStatus = function(pIsConnect) {
        mdSmartios.bridge.isApplianceConnected = parseInt(pIsConnect);
        if (0x01 == mdSmartios.bridge.isApplianceConnected) {
            for (var index in mdSmartios.bridge.applianceConnectedEvents) {
                var item = mdSmartios.bridge.applianceConnectedEvents[index];
                if ( typeof item == "object") {
                    item.fire();
                }
            }
        } else {
            for (var index in mdSmartios.bridge.applianceDisconnectedEvents) {
                var item = mdSmartios.bridge.applianceDisconnectedEvents[index];
                if ( typeof item == "object") {
                    item.fire();
                }
            }
        }
    };

    /**
     *  管家接口
     *
     */
    mdSmartios.bridge.callbackUserInfo = undefined;
    mdSmartios.bridge.callbackUserApplianceList = undefined;
    mdSmartios.bridge.callbackUserHomeInfo = undefined;
    mdSmartios.bridge.callbackRequestDataTransmit = {};
    mdSmartios.bridge.callbackFailRequestDataTransmit = {};
    mdSmartios.bridge.commandIds = {};
    mdSmartios.bridge.callbackGPSInfo = undefined;
    mdSmartios.bridge.callbackQrCode = undefined;
    mdSmartios.bridge.callbackJumpPlugin = undefined;
    mdSmartios.bridge.callbackLvmiDeviceInfo = undefined;

    //获取空调伴侣页面初始信息
    mdSmartios.bridge.getLvmiDeviceInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getLvmiDeviceInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackLvmiDeviceInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getLvmiDeviceInfo', p);
        return commandId;
    };

    mdSmartios.bridge.setLvmiDeviceInfo = function(message) {
        // alert(message);
        // var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackLvmiDeviceInfo == "function") {
            mdSmartios.bridge.callbackLvmiDeviceInfo(message);
        }
    };

    //GPS信息获取 JS－>iOS
    mdSmartios.bridge.getGPSInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getGPSInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackGPSInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getGPSInfo', p);
        return commandId;
    };

    //GPS信息能力(IOS调用：回复getGPSInfo)
    mdSmartios.bridge.setGPSInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackGPSInfo == "function") {
            mdSmartios.bridge.callbackGPSInfo(jsonResult.messageBody);
        }
    };

    //扫码功能 JS－>iOS
    mdSmartios.bridge.qrCodeScan = function(callback) {
        console.log('function:mdSmartios.bridge.qrCodeScan: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackQrCode = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('qrCodeScan', p);
        return commandId;
    };

    //扫码功能(IOS调用：回复qrCodeScan)
    mdSmartios.bridge.setQrCode = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackQrCode == "function") {
            mdSmartios.bridge.callbackQrCode(JSON.stringify(jsonResult.messageBody));
        }
    };

    //跳转功能 JS－>iOS
    mdSmartios.bridge.jumpOtherPlugin = function(cmdParamers,callback) {
        console.log('function:mdSmartios.bridge.jumpOtherPlugin');
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackJumpPlugin = callback;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('jumpOtherPlugin', p);
        return commandId;
    };

    //跳转功能(IOS调用：回复jumpOtherPlugin)
    mdSmartios.bridge.jumpOtherPluginCB = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackJumpPlugin == "function") {
            mdSmartios.bridge.callbackJumpPlugin(jsonResult.messageBody);
        }
    };

    /**
     * #define GetUserInfo @"getUserInfo" 获取用户信息能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getUserInfo: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserInfo', p);
        return commandId;
    };

    //用户信息能力(IOS调用：回复getUserInfo)
    mdSmartios.bridge.setUserInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserInfo == "function") {
            mdSmartios.bridge.callbackUserInfo(jsonResult.messageBody);
        }
    };

    /**
     * #define GetUserApplianceList @"getUserApplianceList" 获取用户家电列表
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserApplianceList = function(callback) {
        console.log('function:mdSmartios.bridge.getUserApplianceList: callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserApplianceList = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserApplianceList', p);
        return commandId;
    };

    //用户家电列表(IOS调用：回复getUserApplianceList)
    mdSmartios.bridge.setUserApplianceList = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserApplianceList == "function") {
            mdSmartios.bridge.callbackUserApplianceList(jsonResult.messageBody);
        }
    };

    /**
     * #define GetUserHomeInfo @"getUserHomeInfo"  获取用户家庭信息
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.getUserHomeInfo = function(callback) {
        console.log('function:mdSmartios.bridge.getUserHomeInfo:callback=' + callback);
        var param = {};
        var p = JSON.stringify(param);
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackUserHomeInfo = callback;
        }
        var commandId = mdSmartios.bridge.po._execObjcMethod('getUserHomeInfo', p);
        return commandId;
    };

    //用户家庭信息(IOS调用：回复getUserHomeInfo)
    mdSmartios.bridge.setUserHomeInfo = function(message) {
        var jsonResult = JSON.parse(message);
        if ( typeof mdSmartios.bridge.callbackUserHomeInfo == "function") {
            mdSmartios.bridge.callbackUserHomeInfo(jsonResult.messageBody);
        }
    };

    //用户家庭信息(IOS调用：回复getUserHomeInfo)
    mdSmartios.bridge.setDataTransmit = function(retObjcValue, result) {
         var jsonResult = JSON.parse(result);
        var cbf = mdSmartios.bridge.callbackRequestDataTransmit[retObjcValue];
        var cbff = mdSmartios.bridge.callbackFailRequestDataTransmit[retObjcValue];
        {
            if ( typeof cbf == "function") {

                cbf(jsonResult.messageBody);
            }
        }
        delete mdSmartios.bridge.callbackRequestDataTransmit[retObjcValue];
        delete mdSmartios.bridge.callbackFailRequestDataTransmit[retObjcValue];
    };

    /**
     * 购买耗材(JS->WebView）
     * @param {json} pageParamers  参数
     * @return {Number} 处理結果
     *                    0 : 成功
     *                   -1 : 失败
     *
     */
    mdSmartios.bridge.buyConsumable = function(pageParamers) {
        console.log("function:mdSmartios.bridge.buyConsumable");
        var p = JSON.stringify({
            pageParameters : pageParamers
        });
        return mdSmartios.bridge.po._execObjcMethod('buyConsumable', p);
    };


    /**
     * #define RequestDataTransmit @"requestDataTransmit" 请求通用数据接口能力
     * @param {String} callback 处理成功后的回调函数
     * @param {String} callbackFail 后续处理异常时的回调函数
     * @param {intArray} messageBody 命令的整数数组
     * @return {Number} 命令ID
     *                    0以上 : 处理成功
     *                   -1     : 处理失败
     */
    mdSmartios.bridge.requestDataTransmit = function(cmdParamers, callback, callbackFail) {
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }
        param.cammandId = Math.floor(Math.random() * 10000000);
        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('requestDataTransmit', p);
        //if (isAndroid) {
            commandId = param.cammandId;
        //}
        if ( typeof callback == "function") {
            mdSmartios.bridge.callbackRequestDataTransmit[commandId] = callback;
        }

        callbackFail=function(){};
        mdSmartios.bridge.callbackFailRequestDataTransmit[commandId] = callbackFail;
        return commandId;
    };

    //显示alert
    mdSmartios.bridge.showAlert = function(cmdParamers) {
        console.log('function:mdSmartios.bridge.showAlert');
        var param = {};
        if (cmdParamers != undefined) {
            param.cmdParamers = cmdParamers;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('showAlert', p);
        return commandId;
    };

    //loading 显示
    mdSmartios.bridge.showProgress = function() {
        console.log("function:mdSmartios.bridge.showProgress");
        return mdSmartios.bridge.po._execObjcMethod('showProgress');
    };

    //loading 取消
    mdSmartios.bridge.closeProgress = function() {
        console.log("function:mdSmartios.bridge.closeProgress");
        return mdSmartios.bridge.po._execObjcMethod('closeProgress');
    };

    //VoiceCube 启动
    mdSmartios.bridge.startVoice = function () {
        console.log("function:mdSmartios.bridge.startVoice");
        return mdSmartios.bridge.po._execObjcMethod('startVoice');
    }

    //VoiceCube 停止
    mdSmartios.bridge.stopVoice = function () {
        console.log("function:mdSmartios.bridge.stopVoice");
        return mdSmartios.bridge.po._execObjcMethod('stopVoice');
    }

    //VoiceCube 取消
    mdSmartios.bridge.cancelVoice = function () {
        console.log("function:mdSmartios.bridge.cancelVoice");
        return mdSmartios.bridge.po._execObjcMethod('cancelVoice');
    }

    //VoiceCube 音量变化, volumn 是int值
    mdSmartios.bridge.voiceChanged = function(volumn) {
        console.log("function:mdSmartios.bridge.voiceChanged");
        $.event.trigger("voiceChanged", volumn);
    };

    //VoiceCube 识别成功,  result是json object
    /**
     *示例：
     {"service":"cn.yunzhisheng.smartfridge","history":"cn.yunzhisheng.smartfridge","code":"PUT_IN","semantic":{"intent":{"foods":[{"number":"1","unit":"个","food":"苹果"}]}},"rc":0,"text":"苹果一个","responseId":"c2323537ecbe475a88f20d9b3e7f7423"}
     **/
    mdSmartios.bridge.voiceResult = function(result) {
        console.log("function:mdSmartios.bridge.voiceResult");
        $.event.trigger("voiceResult", result);
    };

    //VoiceCube 识别失败, error 失败原因String
    mdSmartios.bridge.voiceFailed = function(error) {
        console.log("function:mdSmartios.bridge.voiceFailed");
        $.event.trigger("voiceFailed", error);
    };

    //打开网页， cmdParamers为网页url，如http://www.baidu.com
    mdSmartios.bridge.openWeb = function(url) {
        console.log('function:mdSmartios.bridge.openWeb');
        var param = {};
        if (url != undefined) {
            param.cmdParamers = url;
        }

        var p = JSON.stringify(param);
        var commandId = mdSmartios.bridge.po._execObjcMethod('openWeb', p);
        return commandId;
    };

    //JS监听设备的连接状态
    //eventType   "connected"   :连接
    //            "disconnected":断开连接
    mdSmartios.bridge.isApplianceConnected = 0x01;
    mdSmartios.bridge.applianceConnectedEvents = [];
    mdSmartios.bridge.applianceDisconnectedEvents = [];
    mdSmartios.bridge.appliance = function() {
        function commonEvent() {
            this.handler
        };
        commonEvent.prototype = {
            addHandler : function(handler) {
                this.handler = handler;
            },
            fire : function() {
                this.handler();
            },
            removeHandler : function() {
                this.handler = null;
            }
        };
        //eventType-connected
        var _connectedEvent = new commonEvent();
        //eventType-disconnected
        var _disconnectedEvent = new commonEvent();
        return {
            bind : function(eventType, handler) {
                if (eventType == "connected") {
                    for (var i in mdSmartios.bridge.applianceConnectedEvents) {
                        if (mdSmartios.bridge.applianceConnectedEvents[i] == _connectedEvent) {
                            delete mdSmartios.bridge.applianceConnectedEvents[i];
                        }
                    }
                    _connectedEvent.addHandler(handler);
                    mdSmartios.bridge.applianceConnectedEvents.push(_connectedEvent);
                }
                if (eventType == "disconnected") {
                    for (var i in mdSmartios.bridge.applianceDisconnectedEvents) {
                        if (mdSmartios.bridge.applianceDisconnectedEvents[i] == _disconnectedEvent) {
                            delete mdSmartios.bridge.applianceDisconnectedEvents[i];
                        }
                    }
                    _disconnectedEvent.addHandler(handler);
                    mdSmartios.bridge.applianceDisconnectedEvents.push(_disconnectedEvent);
                }
            },
            unbind : function(eventType) {
                if (eventType == "connected" || eventType == undefined) {
                    for (var i in mdSmartios.bridge.applianceConnectedEvents) {
                        if (mdSmartios.bridge.applianceConnectedEvents[i] == _connectedEvent) {
                            delete mdSmartios.bridge.applianceConnectedEvents[i];
                        }
                    }
                }
                if (eventType == "disconnected" || eventType == undefined) {
                    for (var i in mdSmartios.bridge.applianceDisconnectedEvents) {
                        if (mdSmartios.bridge.applianceDisconnectedEvents[i] == _disconnectedEvent) {
                            delete mdSmartios.bridge.applianceDisconnectedEvents[i];
                        }
                    }
                }
            },
            request : function() {
                mdSmartios.bridge.setApplianceConnnectStatus(mdSmartios.bridge.isApplianceConnected);
            }
        };
    };

    /**
     * 判断是否为安卓系统
     * @author Jun
     */
    if (!mdSmartios.bridge.isAndroid) {
        var u = navigator.userAgent;
        mdSmartios.bridge.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    }

})(mdSmartios);

(function(window, mdSmartios) {
    console.log('--iPhone bridge--');
    // iPhone log
    if (window.navigator.userAgent.indexOf('DEBUG_LOG') != -1) {
        console = new Object();
        console.log = function(log) {
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", "ios-log:#iOS#" + log);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        };
        console.warn = function(log) {
            console.log(log);
        };
        console.debug = function(log) {
            console.log(log);
        };
        console.error = function(log) {
            console.log(log);
        };
        console.info = function(log) {
            console.log(log);
        };
        console.trace = function(log) {
            console.log(log);
        };
    }
    bridge = mdSmartios.bridge;
    mdSmartios.bridge.retObjcValue = 0;

    bridge.po._execObjcMethod('getCurrentDevSN');
    bridge.po._execObjcMethod('getCurrentApplianceID');
    bridge.po._execObjcMethod('getCurrentApplianceSubtype');
})(window,mdSmartios);
