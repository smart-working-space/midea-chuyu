
import actions from '../actions/StatusNavBottomAction'
import YouMeng from '../../components/common/youMeng'

export default Reflux.createStore({
    cur_time: null,
    _type: null,
    _detailSource: {},
    item:{

    },
    _mdSmartSub: null,
    cmdRelax: function(_page,statusObj,timeObj){
      console.log(_page,JSON.stringify(statusObj),JSON.stringify(timeObj));
      let self = this;
      self.item.loading_visible = false;
      self.item.statusObj = statusObj;
      self.item.timeObj = timeObj;
      if(statusObj.workStatus==LanguagePack.standing||statusObj.workStatus==LanguagePack.powerSaving){
         window.localStorage.setItem("_recipeName",'');
         window.localStorage.setItem("_recipeId",'');
         self.item.recipeName = '';
         self.item.recipeId = '';
      }
      //console.log("statusObj:"+JSON.stringify(statusObj));

      //故障判断
      if(statusObj.wrongDec&&(statusObj.workStatus!=LanguagePack.endMenu)){
        if(statusObj.wrongType=="warn"){
          self.item.showbox = {
             visible: true,
             recordData: {
               warnIcon: "https://img.alicdn.com/imgextra/i2/1043828522/TB2oekeX9OI.eBjy1zkXXadxFXa_!!1043828522.png",
               icon: "",
               hasRemove: false,
               _type: 'warn',
               btnText: LanguagePack.I_Know,
               title: LanguagePack.attention,
               content: statusObj.wrongDec
             }
           }
        }
        if(statusObj.wrongType=="fault"){
          self.item.showbox = {
             visible: true,
             recordData: {
               warnIcon: "https://img.alicdn.com/imgextra/i2/1043828522/TB2oekeX9OI.eBjy1zkXXadxFXa_!!1043828522.png",
               icon: "",
               hasRemove: false,
               _type: 'fault',
               btnText: LanguagePack.I_Know,
               title: LanguagePack.equipmentFailure,
               content: statusObj.wrongDec
             }
           }
        }
        return;
      }else{
        self.item.showbox = {
          visible: false
        }
      }

      if(statusObj.workStatus==LanguagePack.endMenu&&statusObj.recipeMapId){
        self.item.showbox = {
          visible: true,
          recordData: {
            icon: "https://img.alicdn.com/imgextra/i2/1043828522/TB2yBYPXnka61Bjy0FgXXbPpVXa_!!1043828522.png",
            hasRemove: true,
            _type: 'continue',
            btnText: LanguagePack.continue,
            title: LanguagePack.currentStepCompleted,
            content: LanguagePack.continueCooking
          }
        }
        return;
      }else{
        self.item.showbox = {
          visible: false
        }
      }

      if(statusObj.workStatus==LanguagePack.preheatFinish){
          self.item.showbox = {
            visible: true,
            recordData: {
              icon: "https://img.alicdn.com/imgextra/i2/1043828522/TB2yBYPXnka61Bjy0FgXXbPpVXa_!!1043828522.png",
              _type: 'sure',
              hasRemove: true,
              btnText: LanguagePack.confirm,
              title: LanguagePack.preheatFinish,
              content: LanguagePack.makeConfirmCooking
            }
          }
          return;
      }else{
        self.item.showbox = {
          visible: false
        }
      }

      if(statusObj.workStatus==LanguagePack.cookingComplete&&_page=="detail"){
         self.item.showbox = {
            visible: true,
            recordData: {
              icon: "",
              hasRemove: false,
              _type: 'understand',
              btnText: LanguagePack.I_Know,
              title: LanguagePack.CookingIsDone,
              content: '  '
            }
          }
          return;
      }else{
        self.item.showbox = {
          visible: false
        }
      }
      self.item.detailSource = self._detailSource;
    },
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetInitialData(page,_devType,_detailSource) {
        //更新状态（就是个对象）
        let self = this;
        let  devType = window.localStorage.getItem("DevType")||_devType;
        let detailSource = _detailSource;
        console.log(devType,'666666666',_detailSource,'_detailSource');
        var  mdSmartSub= new  mdSmart.msg(devType);
        // this._mdSmartSub = mdSmartSub;
        var cmd = mdSmartSub.requestStatus();
        bridge.startCmdProcess(cmd,function(messageBack){
          console.log("getInitMsg:"+messageBack);
          let statusObj = TotalByteCtrl.getWorkStatus(messageBack);
          let timeObj = TotalByteCtrl.getWorkTime(messageBack);
          self.item.detailSource = detailSource;
          self._detailSource = detailSource;
          self.cmdRelax(page,statusObj,timeObj);
          //self.trigger(self.item);

          let _recipeName = window.localStorage.getItem("_recipeName");
          let _recipeId = window.localStorage.getItem("_recipeId");
          console.log("localStorage_recipeName2:"+ _recipeName);
          if(_recipeName){
            if(statusObj.workStatus==LanguagePack.standing||statusObj.workStatus==LanguagePack.powerSaving){
               window.localStorage.setItem("_recipeName",'');
               window.localStorage.setItem("_recipeId",'');
               self.item.recipeName = '';
               self.item.recipeId = '';
            }else{
              self.item.recipeName = _recipeName;
              self.item.recipeId = _recipeId;
            }
            self.item.detailSource = self._detailSource;
            self.trigger(self.item);
            $('#alertloading').hide();
          }else{
            var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
            var requestData = {
              "fun":"recipeDetail",
              "mapId": statusObj.recipeMapId,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
            var servicePath = "/recipe";
            if(statusObj.recipeMapId){
              SKApi.sendRequest(requestData, servicePath, devType, function (res) {
                if(res.error_code==0){
                   var messageBack = res.content;
                   messageBack = messageBack||{};
                   console.log(messageBack,'msg55555');
                   self.item.recipeName = messageBack.name;
                   self.item.recipeId = messageBack.id;
                   self.item.detailSource = self._detailSource;
                   self.trigger(self.item);
                   window.localStorage.setItem("_recipeName",messageBack.name);
                   window.localStorage.setItem("_recipeId",messageBack.id);
                   $('#alertloading').hide();
               }else{
                  console.log("出了点问题:"+res.error_code+":"+res.content);
                  window.localStorage.setItem("_recipeName",'');
                  window.localStorage.setItem("_recipeId",'');
                  self.item.recipeName = '';
                  self.item.recipeId = '';
                  self.item.detailSource = self._detailSource;
                  self.trigger(null);
                  $('#alertloading').hide();
               }
              });
            }else{
              window.localStorage.setItem("_recipeName",'');
              window.localStorage.setItem("_recipeId",'');
              self.item.recipeName = '';
              self.item.recipeId = '';
              self.item.detailSource = self._detailSource;
              self.trigger(self.item);
              $('#alertloading').hide();
            }
          }

        },function(errorCode){
          //alert(errorCode);
        });
        // $(document).bind('recieveMessage', {}, function (event, message) { //监听设备上报数据
        //   self.onRecieveMessage(page,devType,message,detailSource);
        // });

    },
    onRecieveMessage(page,devType,messageBack,detailSource){
      let self = this;
      console.log("recieveMessage11:"+JSON.stringify(messageBack));
      let statusObj = TotalByteCtrl.getWorkStatus(messageBack);
      let timeObj = TotalByteCtrl.getWorkTime(messageBack);
      self.cmdRelax(page,statusObj,timeObj);
      //self.trigger(self.item);
      let _recipeName = window.localStorage.getItem("_recipeName");
      let _recipeId = window.localStorage.getItem("_recipeId");
      console.log("localStorage_recipeName11:"+ _recipeName);
      if(_recipeName){
        if(statusObj.workStatus==LanguagePack.standing||statusObj.workStatus==LanguagePack.powerSaving){
           window.localStorage.setItem("_recipeName",'');
           window.localStorage.setItem("_recipeId",'');
           self.item.recipeName = '';
           self.item.recipeId = '';
        }else{
          self.item.recipeName = _recipeName;
          self.item.recipeId = _recipeId;
        }
        self.item.detailSource = self._detailSource;
        self.trigger(self.item);
      }else{
        var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
        var requestData = {
          "fun":"recipeDetail",
          "mapId": statusObj.recipeMapId,
          "pwd":"10000",
          "uid":DEFAULT_UID
        };
        var servicePath = "/recipe";
        if(statusObj.recipeMapId){
          SKApi.sendRequest(requestData, servicePath, devType, function (res) {
            if(res.error_code==0){
               var messageBack = res.content;
               console.log(messageBack,'msg55555');
               self.item.recipeName = messageBack.name;
               self.item.recipeId = messageBack.id;
               self.item.detailSource = self._detailSource;
               self.trigger(self.item);
               window.localStorage.setItem("_recipeName",messageBack.name);
               window.localStorage.setItem("_recipeId",messageBack.id);
           }else{
              console.log("出了点问题:"+res.error_code+":"+res.content);
              self.item.detailSource = self._detailSource;
              self.trigger(null);
           }
          });
        }else{
          window.localStorage.setItem("_recipeName",'');
          window.localStorage.setItem("_recipeId",'');
          self.item.recipeName = '';
          self.item.recipeId = '';
          self.item.detailSource = self._detailSource;
          self.trigger(self.item);
        }

      }
    },
    onControl(type,totalbytectrl,statusObj){
      let self = this;
      let cmd;
      let c_arr = TotalByteCtrl.stingToArray(totalbytectrl);
      self.item.loading_visible = true;
      let DevType = window.localStorage.getItem('DevType');
      var  mdSmartSub= new  mdSmart.msg(DevType);
      if(type=="stop"){
        //ctrl_arr[10] = parseInt(0x03,16);
        if(DevType=='BF'){
          cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x06}]);
        }else{
          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf('X7321D');
          if(_index>-1){//假如为x7，带菜谱id
            cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x03},{key:20,val: parseInt(statusObj.h_mapId)},{key:21,val: parseInt(statusObj.m_mapId)},{key:22,val: parseInt(statusObj.d_mapId)}]);
          }else{
            cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x03}]);
          }
        }

      //  let _name = '美居菜谱：'+self._detailSource.name;
        let _menu = '{'+'menuName:'+self._detailSource.name+','+'menuID:'+self._detailSource.id+'}';
        YouMeng.count(_menu,'_status_stop'); //友盟统计

      }
      if(type=="continue"){
        if(DevType=='BF'){
          cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x03}]);
        }else{
          var snType = window.localStorage.getItem("SnType");
          var _index = snType.indexOf('X7321D');
          if(_index>-1){//假如为x7,带菜谱id
            cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x02},{key:20,val: parseInt(statusObj.h_mapId)},{key:21,val: parseInt(statusObj.m_mapId)},{key:22,val: parseInt(statusObj.d_mapId)}]);
          }else{
            cmd=mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x02}]);
          }
        }

        let _menu = '{'+'menuName:'+self._detailSource.name+','+'menuID:'+self._detailSource.id+'}';
        YouMeng.count(_menu,'_status_resume'); //友盟统计
      }
      if(type=="begin"){
        cmd=c_arr;

        let _menu = '{'+'menuName:'+self._detailSource.name+','+'menuID:'+self._detailSource.id+'}';
        YouMeng.count(_menu,'_menu_start'); //友盟统计
      }
      if(type=="remove"){
        if(DevType=='BF'){
          cmd = mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x02}]);
        }else{
          cmd=mdSmartSub.setMsgBodyFuncSelect([{key:10,val:0x01}]);
        }

        let _menu = '{'+'menuName:'+self._detailSource.name+','+'menuID:'+self._detailSource.id+'}';
        YouMeng.count(_menu,'_status_cancel'); //友盟统计
      }
      console.log(cmd,'cmd');
      let cmdId = bridge.startCmdProcess(cmd, function (messageBack) {
        let statusObj = TotalByteCtrl.getWorkStatus(messageBack);
        let timeObj = TotalByteCtrl.getWorkTime(messageBack);
        console.log("messageBack:"+messageBack);
        console.log(statusObj+":"+timeObj);
        self.item.statusObj = statusObj;
        self.item.timeObj = timeObj;
        if(type=="begin"){
          self.item.recipeId = self._detailSource.id;
          self.item.recipeName = self._detailSource.name;
          window.localStorage.setItem("_recipeName",self._detailSource.name);
          window.localStorage.setItem("_recipeId",self._detailSource.id);
        }
        self.item.loading_visible = false;
        self.item.detailSource = self._detailSource;
        self._type = type;
        self.trigger(self.item);
      },function(error){
        //alert(error);
      });
    },
    onUnlock(){
      this.item.showbox = {
        visible: true,
        recordData: {
          icon: "",
          hasRemove: true,
          _type: 'unlock',
          btnText: LanguagePack.unlock,
          title: LanguagePack.lockWarning,
          content: LanguagePack.pleaseUnlock
        }
       }
       this.item.detailSource = this._detailSource;
       this.trigger(this.item);
    },
    onRecipeCtrlHandle(_DevType,type,_type,statusObj){
      console.log(_DevType,type,_type);
      let self = this;
      let cmd;
      let DevType = window.localStorage.getItem('DevType')||_DevType;
      var  mdSmartSub= new  mdSmart.msg(DevType);
      let msgBodyFuncSelectValue = [];
      self.item.loading_visible = true;
      let _lock_record = 0;
      switch (type) {
        case "remove":
          if(_type=="unlock"){ //解锁 取消不发指令
            self.item.showbox.visible = false;
            self.item.loading_visible = false;
            _lock_record = 1;
          }else if(_type=="fault"){
            self.item.showbox.visible = false;
            self.item.loading_visible = false;
            _lock_record = 1;
            bridge.goBack();
          }else if(_type=="warn"){
            self.item.showbox.visible = false;
            self.item.loading_visible = false;
            if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x02}];
            }else{
              msgBodyFuncSelectValue = [{key:10,val:0x01}];
            }
          }else{
            if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x02}];
            }else{
              msgBodyFuncSelectValue = [{key:10,val:0x01}];
            }
          }
          break;
        case "continue":
          if(_type=="sure"){ //预热完成
            var snType = window.localStorage.getItem("SnType");
            var _index = snType.indexOf('X7321D');
            if(_index>-1){//假如为x7,带菜谱id
              msgBodyFuncSelectValue = [{key:10,val:0x02},{key:20,val: parseInt(statusObj.h_mapId)},{key:21,val: parseInt(statusObj.m_mapId)},{key:22,val: parseInt(statusObj.d_mapId)}];
            }else{
              msgBodyFuncSelectValue = [{key:10,val:0x02}];
            }

            if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x03}];
            }

          }else if(_type=="unlock"){ //解锁
            if(DevType=='B4'||DevType=='b4'){  //小烤箱
              msgBodyFuncSelectValue = [{key:10,val:0x0a}];
            }
            else if(DevType=='B1'||DevType=='b1'){ //大烤箱
              msgBodyFuncSelectValue = [{key:10,val:0xFF},{key:20,val:0}];
            }
            else if(DevType=='B0'||DevType=='b0'){ //微波炉
              msgBodyFuncSelectValue = [{key:10,val:0x01}];
            }
            else if(DevType=='B2'||DevType=='b2'){  //蒸汽炉
              msgBodyFuncSelectValue = [{key:10,val:0xFF},{key:24,val:0}];
            }else if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0xFF},{key:13,val:0}];
            }

            let _menu = '{'+'menuName:'+self._detailSource.name+','+'menuID:'+self._detailSource.id+'}';
            YouMeng.count(_menu,'_status_unlock'); //友盟统计

          }else if(_type=="continue"){ // 继续烹饪
            if(DevType=='B4'||DevType=='b4'){  //小烤箱
              msgBodyFuncSelectValue = [{key:10,val:0x0b}];
            }
            else if(DevType=='B1'||DevType=='b1'){ //大烤箱
              msgBodyFuncSelectValue = [{key:10,val:0x02}];
            }
            else if(DevType=='B0'||DevType=='b0'){ //微波炉
              var snType = window.localStorage.getItem("SnType");
              var _index = snType.indexOf('X7321D');
              if(_index>-1){//假如为x7,带菜谱id
                msgBodyFuncSelectValue = [{key:10,val:0x02},{key:20,val: parseInt(statusObj.h_mapId)},{key:21,val: parseInt(statusObj.m_mapId)},{key:22,val: parseInt(statusObj.d_mapId)}];
              }else{
                msgBodyFuncSelectValue = [{key:10,val:0x02}];
              }
            }
            else if(DevType=='B2'||DevType=='b2'){ //蒸汽炉
              msgBodyFuncSelectValue = [{key:10,val:0x02}];
            }
            else if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x03}];
            }
          }else if(_type=="understand"){
            if(DevType=='BF'){
              msgBodyFuncSelectValue = [{key:10,val:0x22},{key:11,val:0x02},{key:12,val:0x02}];
            }else{
              msgBodyFuncSelectValue = [{key:10,val:0x01}];
            }
          }
          break;
      }
      cmd = mdSmartSub.setMsgBodyFuncSelect(msgBodyFuncSelectValue);
      console.log(cmd,'_cmd');
      console.log("为1表示童锁状态 取消不发指令："+_lock_record);
      if(_lock_record){
        self.trigger(self.item);
        return;
      }
      var cmdId = bridge.startCmdProcess(cmd, function (messageBack) {
        var statusObj = TotalByteCtrl.getWorkStatus(messageBack);
        var timeObj = TotalByteCtrl.getWorkTime(messageBack);
        console.log("messageBack:"+JSON.stringify(messageBack));
        console.log(JSON.stringify(statusObj)+":"+JSON.stringify(timeObj));
        self.item.statusObj = statusObj;
        self.item.timeObj = timeObj;
        self.item.showbox.visible = false;
        self.item.loading_visible = false;
        self.item.detailSource = self._detailSource;
        self.trigger(self.item);
      },function(error){
        //alert(error);
      });
    }
});
