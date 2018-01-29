window.localStorage.setItem("_recipeName",'');
window.localStorage.setItem("_recipeId",'');
_getUserId(); //用户id
  function _getUserId(){
      bridge.getUserInfo(function(info){
          window.localStorage.setItem("DEFAULT_UID",info.userId);
      });
  }
  var _uid = window.localStorage.getItem("DEFAULT_UID");
  if(_uid==""||_uid==undefined){
      _getUserId();
  }

  _getDeviceId(); //家电id

  function _getDeviceId(){
      var deviceId = bridge.getCurrentApplianceID();
      if(deviceId == "" || deviceId == undefined)
     {
          bridge.getApplianceID(function(callback){
              deviceId = parseInt(callback);
              var _dvId = deviceId+'';
              window.localStorage.setItem("deviceId",_dvId);
          },function(errCode){
              if(errCode != 0)
              {
                  alert("错误代码"+errCode);
              }
          });
          //var t = setTimeout(function(){ _getDeviceId() },10);
      }
      else {
          var _dId = deviceId+'';
          window.localStorage.setItem("deviceId",_dId);
      }
  }


 var mdSmart = mdSmart || {};
 /*
  * WiFi模块的串口通信协议--
  */
  mdSmart.msg = function(devType) {
    if(devType=='BF'){//0xBF
      return {
        setMsgBodyFuncSelect : function(arr){
          var whichDev = window.localStorage.getItem("WhichDev");
          var bType;
          if(whichDev=='BF'){
            bType = 0xBF;
          }
          if(whichDev=='B0'){
            bType = 0xB0;
          }
          if(whichDev=='B1'){
            bType = 0xB1;
          }
          if(whichDev=='B2'){
            bType = 0xB2;
          }
          if(whichDev=='B4'){
            bType = 0xB4;
          }
          if(whichDev=='9A'){
            bType = 0x9A;
          }
          if(whichDev=='9B'){
            bType = 0x9B;
          }
          var _arr = [];
          for(i=0,len=arr.length;i<len;i++){
            _arr.push(arr[i].val);
            //mdSmart.message.setByte(_msgBodyFuncSelect ,arr[i].key-10,arr[i].val );
          }
          var msg = mdSmart.message.createMessage(bType, 0x02, _arr);

          return msg;
        },
        requestStatus: function(queueType){
          var whichDev = window.localStorage.getItem("WhichDev");
          var bType;
          if(whichDev=='BF'){
            bType = 0xBF;
          }
          if(whichDev=='B0'){
            bType = 0xB0;
          }
          if(whichDev=='B1'){
            bType = 0xB1;
          }
          if(whichDev=='B2'){
            bType = 0xB2;
          }
          if(whichDev=='B4'){
            bType = 0xB4;
          }
          if(whichDev=='9A'){
            bType = 0x9A;
          }
          if(whichDev=='9B'){
            bType = 0x9B;
          }
          if (arguments.length != 0 && queueType instanceof Array){
            var msg = mdSmart.message.createMessage(bType, 0x03, queueType);
          }
          else{
            var msg = mdSmart.message.createMessage(bType, 0x03, [0x31]);
          }
          console.log("--->查询 msg = " + msg);
          return msg;
         }
        }
    }
    if(devType=='B4'){//小烤箱
      var _msgBodyFuncSelect = mdSmart.message.createMessageBody(14); //下行长度
      var _msgBodyStatusValue = mdSmart.message.createMessageBody(18); //上行长度
      //将返回状态值的Byte 赋值到对应的功能Byte
      function msgBodyStatusToFunc(){
        mdSmart.message.setByte(_msgBodyFuncSelect, 0, mdSmart.message.getByte(_msgBodyStatusValue, 0)); //工作状态
        mdSmart.message.setByte(_msgBodyFuncSelect, 1, mdSmart.message.getByte(_msgBodyStatusValue, 1)); //工作模式
        mdSmart.message.setByte(_msgBodyFuncSelect, 2, mdSmart.message.getByte(_msgBodyStatusValue, 2)); //工作时间：时
        mdSmart.message.setByte(_msgBodyFuncSelect, 3, mdSmart.message.getByte(_msgBodyStatusValue, 3)); //工作时间：分
        mdSmart.message.setByte(_msgBodyFuncSelect, 4, mdSmart.message.getByte(_msgBodyStatusValue, 4)); //设定温度
        //mdSmart.message.setByte(_msgBodyFuncSelect, 10, mdSmart.message.getByte(_msgBodyStatusValue, 16)) //童锁
      };
      return {
        msgPageStatus:[],
        stateValueListener : function (message){
          var arr=[],msg=message.slice(10,message.length-1);
          for (var i=0,len=msg.length; i < len; i++) {
            if(_msgBodyStatusValue[i]!=msg[i]){
              var obj={};
              obj.key=i+10;
              obj.val=parseInt(msg[i]);
              arr.push(obj);
            }
          };
          _msgBodyStatusValue=msg;
          this.msgPageStatus=message;
          msgBodyStatusToFunc();
          return arr;
        },
        setMsgBodyFuncSelect : function(arr){
          for(i=0,len=arr.length;i<len;i++){
            mdSmart.message.setByte(_msgBodyFuncSelect ,arr[i].key-10,arr[i].val );
          }
          var msg = mdSmart.message.createMessage(0xB4, 0x02, _msgBodyFuncSelect);

          return msg;
        },
        requestStatus: function(){
          var msg = mdSmart.message.createMessage(0xB4, 0x03, [0]);
          return msg;

        }
      }
    }

    if(devType=='B1'){//大烤箱
      var _msgBodyFuncSelect = mdSmart.message.createMessageBody(15); //下行长度
      var _msgBodyStatusValue = mdSmart.message.createMessageBody(19); //上行长度
      //将返回状态值的Byte 赋值到对应的功能Byte
      function msgBodyStatusToFunc(){
        mdSmart.message.setByte(_msgBodyFuncSelect, 0, mdSmart.message.getByte(_msgBodyStatusValue, 0)); //工作状态
        mdSmart.message.setByte(_msgBodyFuncSelect, 1, mdSmart.message.getByte(_msgBodyStatusValue, 1)); //工作模式
        mdSmart.message.setByte(_msgBodyFuncSelect, 2, mdSmart.message.getByte(_msgBodyStatusValue, 2)); //工作时间：时
        mdSmart.message.setByte(_msgBodyFuncSelect, 3, mdSmart.message.getByte(_msgBodyStatusValue, 3)); //工作时间：分
        mdSmart.message.setByte(_msgBodyFuncSelect, 4, mdSmart.message.getByte(_msgBodyStatusValue, 8)); //设定温度
        mdSmart.message.setByte(_msgBodyFuncSelect, 10, mdSmart.message.getByte(_msgBodyStatusValue, 16)) //童锁
      };
      return {
        msgPageStatus:[],
        stateValueListener : function (message){
          var arr=[],msg=message.slice(10,message.length-1);
          for (var i=0,len=msg.length; i < len; i++) {
            if(_msgBodyStatusValue[i]!=msg[i]){
              var obj={};
              obj.key=i+10;
              obj.val=parseInt(msg[i]);
              arr.push(obj);
            }
          };
          _msgBodyStatusValue=msg;
          this.msgPageStatus=message;
          msgBodyStatusToFunc();
          return arr;
        },
        setMsgBodyFuncSelect : function(arr){
          for(i=0,len=arr.length;i<len;i++){
            mdSmart.message.setByte(_msgBodyFuncSelect ,arr[i].key-10,arr[i].val );
          }
          var msg = mdSmart.message.createMessage(0xB1, 0x02, _msgBodyFuncSelect);

          return msg;
        },
        requestStatus: function(){
          var msg = mdSmart.message.createMessage(0xB1, 0x03, [0]);
          return msg;

        }

      }
    }

    if(devType=="B0"){//微波炉
      var _msgBodyFuncSelect = mdSmart.message.createMessageBody(13);
      var _msgBodyStatusValue = mdSmart.message.createMessageBody(17);
      //将返回状态值的Byte 赋值到对应的功能Byte
      function msgBodyStatusToFunc(message){

        mdSmart.message.setByte(_msgBodyFuncSelect, 0, mdSmart.message.getByte(_msgBodyStatusValue, 0));
        mdSmart.message.setByte(_msgBodyFuncSelect, 1, mdSmart.message.getByte(_msgBodyStatusValue, 1));
        mdSmart.message.setByte(_msgBodyFuncSelect, 2, mdSmart.message.getByte(_msgBodyStatusValue, 2));
        mdSmart.message.setByte(_msgBodyFuncSelect, 3, mdSmart.message.getByte(_msgBodyStatusValue, 3));
        mdSmart.message.setByte(_msgBodyFuncSelect, 4, mdSmart.message.getByte(_msgBodyStatusValue, 14));
        mdSmart.message.setByte(_msgBodyFuncSelect, 5, mdSmart.message.getByte(_msgBodyStatusValue,15));
        mdSmart.message.setByte(_msgBodyFuncSelect, 6, mdSmart.message.getByte(_msgBodyStatusValue, 10));
        mdSmart.message.setByte(_msgBodyFuncSelect, 9, mdSmart.message.getByte(_msgBodyStatusValue, 16));
        mdSmart.message.setByte(_msgBodyFuncSelect, 10, mdSmart.message.getByte(_msgBodyStatusValue, 11));
        mdSmart.message.setByte(_msgBodyFuncSelect, 11, mdSmart.message.getByte(_msgBodyStatusValue, 12));
        mdSmart.message.setByte(_msgBodyFuncSelect, 12, mdSmart.message.getByte(_msgBodyStatusValue, 13));

      };
      return {
        msgPageStatus:[],
        stateValueListener : function (message){
          var arr=[],message=message,msg=message.slice(10,message.length-1);
          for (var i=0,len=msg.length; i < len; i++) {
            msg[i]=parseInt(msg[i]);
            message[i]=parseInt(message[i]);
            if(_msgBodyStatusValue[i]!=msg[i]){
              var obj={};
              obj.key=i+10;
              obj.val=msg[i];
              arr.push(obj);
            }
          };
          _msgBodyStatusValue=msg;
          this.msgPageStatus=message;
          // _msgBodyFuncSelect=_msgBodyStatusValue;
          msgBodyStatusToFunc(message);
          return arr;
        },
        setMsgBodyFuncSelect : function(arr){
          for(i=0,len=arr.length;i<len;i++){
            mdSmart.message.setByte(_msgBodyFuncSelect ,arr[i].key-10 ,arr[i].val );
          }
          var msg = mdSmart.message.createMessage(0xB0, 0x02, _msgBodyFuncSelect);
          return msg;
        },
        requestStatus: function(){
          var msg = mdSmart.message.createMessage(0xB0, 0x03, [0]);
          return msg;

        }

      }
    }

    if(devType=='B2'){//蒸汽炉
      var _msgBodyFuncSelect = mdSmart.message.createMessageBody(16);
      var _msgBodyStatusValue = mdSmart.message.createMessageBody(17);
      //将返回状态值的Byte 赋值到对应的功能Byte
      function msgBodyStatusToFunc(){
        mdSmart.message.setByte(_msgBodyFuncSelect, 0, mdSmart.message.getByte(_msgBodyStatusValue, 0));
        mdSmart.message.setByte(_msgBodyFuncSelect, 1, mdSmart.message.getByte(_msgBodyStatusValue, 1));
        mdSmart.message.setByte(_msgBodyFuncSelect, 2, mdSmart.message.getByte(_msgBodyStatusValue, 2));
        mdSmart.message.setByte(_msgBodyFuncSelect, 3, mdSmart.message.getByte(_msgBodyStatusValue, 3));
        mdSmart.message.setByte(_msgBodyFuncSelect, 4, mdSmart.message.getByte(_msgBodyStatusValue, 4));
        mdSmart.message.setByte(_msgBodyFuncSelect, 7, mdSmart.message.getByte(_msgBodyStatusValue,17));
        mdSmart.message.setByte(_msgBodyFuncSelect, 10, mdSmart.message.getByte(_msgBodyStatusValue, 10));
        mdSmart.message.setByte(_msgBodyFuncSelect, 11, mdSmart.message.getByte(_msgBodyStatusValue, 11));
        mdSmart.message.setByte(_msgBodyFuncSelect, 12, mdSmart.message.getByte(_msgBodyStatusValue, 12));
        mdSmart.message.setByte(_msgBodyFuncSelect, 13, mdSmart.message.getByte(_msgBodyStatusValue, 15));
        mdSmart.message.setByte(_msgBodyFuncSelect, 14, mdSmart.message.getByte(_msgBodyStatusValue, 16));
        mdSmart.message.setByte(_msgBodyFuncSelect, 15, mdSmart.message.getByte(_msgBodyStatusValue, 13));
        mdSmart.message.setByte(_msgBodyFuncSelect, 16, mdSmart.message.getByte(_msgBodyStatusValue, 14));
      };
      return {
      msgPageStatus:[],
      stateValueListener : function (message){
        // alert(JSON.stringify(message));
        var arr=[],msg=message.slice(10,message.length-1);
        for (var i=0,len=msg.length; i < len; i++) {
          if(_msgBodyStatusValue[i]!=msg[i]){
            var obj={};
            obj.key=i+10;
            obj.val=parseInt(msg[i]);
            arr.push(obj);
          }
        };
        _msgBodyStatusValue=msg;
        this.msgPageStatus=message;
        msgBodyStatusToFunc();
        return arr;
      },
      setMsgBodyFuncSelect : function(arr){
        for(i=0,len=arr.length;i<len;i++){
          mdSmart.message.setByte(_msgBodyFuncSelect ,arr[i].key-10,arr[i].val );
        }
        var msg = mdSmart.message.createMessage(0xB2, 0x02, _msgBodyFuncSelect);

        return msg;
      },
      requestStatus: function(){
        var msg = mdSmart.message.createMessage(0xB2, 0x03, [0]);
        return msg;
      }

      }
    }

  };


  //判断语言
  function getNavLanguage(){
      console.log("--->浏览器语言为 " + navigator.language);
      if(navigator.appName == "Netscape"){
          var navLanguage = navigator.language;
          return navLanguage;
      }
      return false;
  }
// api接口
  //图片上传
   function testUploadFile(file_id,callback) {
  		 console.log('发送时间:'+new Date().Format('hh:mm:ss'));
  		 var fileId = file_id;  // 文件id
  		 SKApi.uploadFile(fileId, function (res) {//此处为文件上传回调方法，
  				 // res.error_code
  				 // =0表示请求已收到，并成功返回,返回结果可解析 res.content  在res.error_code==0时 res.content一般为JSON对象 ！=0时 res.content为错误信息
  				 // =1表示无法获取到用户的令牌信息
  				 // =2表示检测不到美居APP主框架
  				 // =99表示无法访问此服务
  				 // =100表示访问服务器时出错
  				 // =101 表示无法访问服务器
  				 console.log('返回时间:'+new Date().Format('hh:mm:ss'));
  				 console.log("返回结果：" + JSON.stringify(res));
  				 callback(res);
  		 },function(percent){
  				//  console.log('上传进度:'+percent+'--时间:'+new Date().Format('hh:mm:ss'));
  				//  var uploadBar = document.getElementById('uploadBar1');
  				//  uploadBar.value=percent;
  				//  var uploadPercent = document.getElementById('uploadPercent');
  				//  uploadPercent.innerHTML=percent;
  		 });
   }

  function readyToSendRequest(requestData,servicePath,callback) {
      console.log('------------');
      var DevType = window.localStorage.getItem("DevType");
      console.log("DevType:"+DevType);
  		// if(DevType==undefined||DevType==null||DevType==''){
  		// 	DevType = '';
  		// 	alert("识别不到该设备");
  		// 	bridge.goBack();
  		// 	return;
  		// }
  		SKApi.sendRequest(requestData, servicePath, DevType, function (res) {
  			if(res.error_code==0){
  					var messageBack = res.content;
  					// console.log(JSON.stringify(messageBack));
  					callback(messageBack);
  			 }else{
  					console.log("出了点问题:"+res.error_code+":"+res.content);
  					callback(false);
  			 }
  		});
  }
  // 【测试广告位主题接口】

 function themeList(callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
     var requestData = {
       "fun":"theme",
       "platform": SnType,
       "pwd":"10000",
       "uid":DEFAULT_UID
     };
     var servicePath = "/recipe";
     readyToSendRequest(requestData,servicePath,callback);
 }

 // 【测试菜谱列表接口】

 function recommendList(page, callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
      var requestData = {
         "fun":"recommendList",
         "page": page,
         "pwd": '10000',
         "platform": SnType,
         "uid":DEFAULT_UID
       };
      var servicePath = "/recipe";
      readyToSendRequest(requestData,servicePath,callback);
 }


 // 【测试评分列表接口】

 function pointList(page,callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
      var requestData = {
         "fun":"pointList",
         "page": page,
         "pwd": "10000",
         "platform": SnType,
         "uid":DEFAULT_UID
       };
      var servicePath = "/recipe";
      readyToSendRequest(requestData,servicePath,callback);
 }

 // 【测试收藏列表接口】

 function favoriteList(page,callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
      var requestData = {
         "fun":"favoriteList",
         "page": page,
         "pwd": "10000",
         "platform": SnType,
         "uid":DEFAULT_UID
       };
      var servicePath = "/recipe";
      readyToSendRequest(requestData,servicePath,callback);
 }

 // 【测试新增收藏接口】

 function addFavorite(recipeId,callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
      var requestData = {
         "fun":"addFavorite",
         "recipe": recipeId,
         "pwd": "10000",
         "uid":DEFAULT_UID
       };
       var servicePath = "/recipe";
       readyToSendRequest(requestData,servicePath,callback);
 }
 // 【测试取消收藏接口】

 function removeFavorite(recipeId,callback){
   //获取userId

   var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
   //获取8位 SnType , DevType设备型号 例如 B0

   var SnType = window.localStorage.getItem("SnType");
        var requestData = {
           "fun":"removeFavorite",
           "recipe": recipeId,
           "pwd": "10000",
           "uid":DEFAULT_UID
         };
         var servicePath = "/recipe";
         readyToSendRequest(requestData,servicePath,callback);
 }

 // 【测试搜索全部分类接口】

   function searchCategory(callback){
     //获取userId

     var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
     //获取8位 SnType , DevType设备型号 例如 B0

     var SnType = window.localStorage.getItem("SnType");
            var requestData = {
               "fun":"searchCategory",
               "pwd": "10000",
               "uid":DEFAULT_UID
             };
   					var servicePath = "/recipe";
   		   	  readyToSendRequest(requestData,servicePath,callback);
   }

   // 【测试关键字下拉提示接口】

   function keywordList(value,callback){
     //获取userId

     var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
     //获取8位 SnType , DevType设备型号 例如 B0

     var SnType = window.localStorage.getItem("SnType");
            var requestData = {
               "fun":"keywordlist",
   						"keyword": value,
   						"platform": SnType,
               "pwd":"10000",
               "uid":DEFAULT_UID
             };
   					var servicePath = "/recipe";
   		   	  readyToSendRequest(requestData,servicePath,callback);
   }

   // 【测试关键字查询列表接口】

   function keywordBaseList(value,_key,page,callback){
     //获取userId

     var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
     //获取8位 SnType , DevType设备型号 例如 B0

     var SnType = window.localStorage.getItem("SnType");
            var requestData = {
               "fun":"keywordBaseList",
   						"keyword": value,
   						"page": page,
   						"platform": SnType,
               "pwd": "10000",
               "uid":DEFAULT_UID
             };
   					if(_key){
   						requestData.categoryKey = _key;
   					}
   					var servicePath = "/recipe";
    		   	  readyToSendRequest(requestData,servicePath,callback);
   }

  function recipeMapDetail(mapId,callback){
     //获取userId
     var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
            var requestData = {
               "fun":"recipeDetail",
               "mapId": mapId,
               "pwd":"10000",
               "uid":DEFAULT_UID
             };
             var servicePath = "/recipe";
             readyToSendRequest(requestData,servicePath,callback);
   }

  // 【测试搜索全部分类接口】
  function searchCategory(callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"searchCategory",
              "pwd": "10000",
              "uid":DEFAULT_UID
            };
  					var servicePath = "/recipe";
  		   	  readyToSendRequest(requestData,servicePath,callback);
  }

  // 【测试关键字下拉提示接口】
  function keywordList(value,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"keywordlist",
  						"keyword": value,
  						"platform": SnType,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  					var servicePath = "/recipe";
  		   	  readyToSendRequest(requestData,servicePath,callback);
  }

  // 【测试关键字查询列表接口】
  function keywordBaseList(value,_key,page,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"keywordBaseList",
  						"keyword": value,
  						"page": page,
  						"platform": SnType,
              "pwd": "10000",
              "uid":DEFAULT_UID
            };
  					if(_key){
  						requestData.categoryKey = _key;
  					}
  					var servicePath = "/recipe";
   		   	  readyToSendRequest(requestData,servicePath,callback);
  }


  // 【测试菜谱评论数接口】
  function recipeCommentCount(recipeId,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"recipeCommentCount",
  						"recipe": recipeId,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  					var servicePath = "/recipe";
    		   	readyToSendRequest(requestData,servicePath,callback);
  }
  // 【测试菜谱评论列表接口】
  function recipeCommentList(recipeId,type,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"recipeCommentList",
  						"recipe": recipeId,
  						"type": type,
  						"page": "1,20",
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  					var servicePath = "/recipe";
    		   	readyToSendRequest(requestData,servicePath,callback);
  }
  // 【测试菜谱评论--写评论接口】
  function recipeCommentWrite(recipeId,type,point,content,picUrl,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"recipeComment",
  						"recipe": recipeId,
  						"type": type,
  						"content": content,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  				if(point){
  					requestData.point = point;
  				}
  				if(picUrl.length>0){
  					requestData.picUrl = picUrl;
  				}
  				var servicePath = "/recipe";
  				readyToSendRequest(requestData,servicePath,callback);
  }
  // 【测试回复评论接口】
  function recipeCommentReply(recipeId,type,content,respUid,respComment,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"recipeComment",
  						"recipe": recipeId,
  						"type": type,
  						"content": content,
  						"respComment": respComment,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  				if(respUid){
  					requestData.respUid = respUid;
  				}

  				var servicePath = "/recipe";
  				 readyToSendRequest(requestData,servicePath,callback);
  }
  // 【测试菜谱评论--点赞】
  function recipeAddGood(commentId,callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"recipeAddGood",
  						"comment": commentId,
              "pwd":"10000",
              "uid":DEFAULT_UID
            };

  					var servicePath = "/recipe";
  	 		   	readyToSendRequest(requestData,servicePath,callback);
  }


  // 【测试分享接口】
  function testSharing(callback){
    //获取userId
    var DEFAULT_UID = window.localStorage.getItem("DEFAULT_UID");
    //获取8位 SnType , DevType设备型号 例如 B0
    var SnType = window.localStorage.getItem("SnType");
           var requestData = {
              "fun":"allSharingList",
              "page":"1,20",
              "pwd":"10000",
              "uid":DEFAULT_UID
            };
  					var servicePath = "/sharing";
  	 		   	readyToSendRequest(requestData,servicePath,callback);
  }
