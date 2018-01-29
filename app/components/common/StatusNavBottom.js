import { Flex, Modal, Toast } from "antd-mobile";
import {
  Link,
  Router,
  Route,
  IndexRoute,
  useRouterHistory
} from "react-router";
const alert = Modal.alert;

import StatusNavBottomAction from "../../mvc/actions/StatusNavBottomAction";
import StatusNavBottomStore from "../../mvc/stores/StatusNavBottomStore";

var Index = React.createClass({
  mixins: [Reflux.connect(StatusNavBottomStore, "intData")],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      intData: {},
      _timer: null
    };
  },
  componentDidMount: function() {
    let self = this;
    this.findStatus();
    $(document).bind("recieveMessage", {}, function(event, message) {
      //监听设备上报数据
      StatusNavBottomAction.recieveMessage(
        self.props.page,
        self.props.devType,
        message,
        self.props.detailSource
      );
      if (bridge.isApplianceConnected == 0) {
        history.go(-1);
        bridge.goBack();
        return;
      }
    });
  },
  findStatus(nextprops) {
    let self = this;
    console.log(this.prop, "this.prop");
    StatusNavBottomAction.getInitialData(
      this.props.page,
      this.props.devType,
      this.props.detailSource
    );
    // this.setState({ 用这个setState倒计时会闪烁一下，相差30s
    //   _timer: setTimeout(function(){
    //     /* 以下为设备离线判断*/
    //     self.findStatus();
    // 		if(bridge.isApplianceConnected == 0){
    //       history.go(-1)
    // 			bridge.goBack();
    // 		}
    //   }, 30000)
    // })

    window._timer = setTimeout(function() {
      /* 以下为设备离线判断*/
      self.findStatus();
      if (bridge.isApplianceConnected == 0) {
        history.go(-1);
        bridge.goBack();
      }
    }, 30000);
  },
  componentWillUnmount: function() {
    console.log("kill");
    clearTimeout(window._timer);
  },

  recipeCtrlHandle(type) {
    //继续or取消烹饪 or解锁
    let intData = this.state.intData;
    let statusObj = intData.statusObj || {};
    let showbox = intData.showbox || {};
    let recordData = showbox.recordData || {};
    let _type = recordData._type;
    let _dev = window.localStorage.getItem("WhichDev");
    if (_dev == "9B") {
      //特定sn
      if (statusObj.wrongDec && type!='remove') {
        //缺水...
        Toast.info(statusObj.wrongDec, 2);
        return;
      }
    }

    intData.loading_visible = true;
    this.setState({
      intData: intData
    });
    StatusNavBottomAction.recipeCtrlHandle(
      this.props.devType,
      type,
      _type,
      statusObj
    );
  },

  controlHandle(type) {
    console.log(type,'which_control');
    // 控制操作
    let self = this;
    let totalbytectrl = this.props.totalbytectrl; //控制指令
    let c_arr = TotalByteCtrl.stingToArray(totalbytectrl);
    console.log(c_arr, "totalbytectrl");
    let intData = this.state.intData;
    let statusObj = intData.statusObj || {};
    let dev = window.localStorage.getItem("DevType");
    if(dev=='BF'){
      if(statusObj.tempHight)
      {
          Toast.info('腔体温度过高！请冷却后再启动！', 2);
          return;
      }
    }

    if (
      statusObj.childrenlock ||
      statusObj.workStatus == LanguagePack.locking
    ) {
      //童锁 1为上锁
      this.showUnlockAlert();
      return;
    }
    if(statusObj.warnTip){//蒸汽炉
      Toast.info(LanguagePack.WaterTank, 2);
      return;
    }
    if (c_arr[16] != 2) {
      //不为肉类探针菜谱
      if (statusObj.wrongTipType == "tip") {
        //肉类探针
        Toast.info(LanguagePack.deleteMeatProbe, 2);
        return;
      }
    }
    if (c_arr[16] == 2) {
      if (statusObj.wrongTipType == "tip") {
        //肉类探针
        Toast.info(LanguagePack.meatProbe, 2);
        return;
      }
    }
    let workmode = c_arr[20];
    let _dev = window.localStorage.getItem("WhichDev");
    if (_dev == "9B") {
      if (
        workmode == 0x20 ||
        workmode == 0xb0 ||
        workmode == 0xd0 ||
        workmode == 0xc1 ||
        workmode == 0xe0 ||
        workmode == 0x31 ||
        workmode == 0x33 ||
        workmode == 0x3a
      ) {
        if (statusObj.wrongDec == LanguagePack.WaterTank) {
          Toast.info(LanguagePack.WaterTank, 2);
          return;
        }
        if (statusObj.wrongDec == LanguagePack.waterShortage) {
          Toast.info(LanguagePack.waterShortage, 2);
          return;
        }
      }
    }else{
      if(statusObj.wrongDec){
        Toast.info(statusObj.wrongDec, 2);
        return;        
      }
    }

    if (_dev == "9B") {
      //特定sn
      if (statusObj.wrongDec && type!='remove') {
        //缺水...
        Toast.info(statusObj.wrongDec, 2);
        return;
      }
    }

    intData.loading_visible = true;
    this.setState({
      intData: intData
    });
    StatusNavBottomAction.control(type, totalbytectrl, statusObj);
  },
  showUnlockAlert() {
    //解锁确定弹出框
    StatusNavBottomAction.unlock();
  },
  linkTo() {
    //console.log(this.state.recipeId+":"+this.state.recipeName);
    if (this.state.intData.recipeName) {
      this.context.router.push(
        "/detail?recipeId=" + this.state.intData.recipeId
      );
    }
  },

  homeNavBottom() {
    let intData = this.state.intData;
    let statusObj = intData.statusObj || {},
      timeObj = intData.timeObj || {};
    let _page = this.props.page; //来自哪个页面
    let _elm = null;
    if (intData.recipeName == "undefined") {
      intData.recipeName = "";
    }
    if (_page == "home") {
      //首页底部
      if (statusObj.showTime) {
        let _timer = "";
        if (
          statusObj.workStatus == LanguagePack.preheat ||
          statusObj.workStatus == LanguagePack.fastPreheat ||
          statusObj.workStatus == LanguagePack.booking||
          statusObj.otherStatus == 1
        ) {
          _timer = <span />;
        } else {
          _timer = (
            <CountDown
              cur_hours={timeObj.h}
              cur_minute={timeObj.m}
              cur_seconds={timeObj.s}
              ctrl_stop={statusObj.time_stop}
            />
          );
        }
        _elm = (
          <nav className="bar bar-tab home" onClick={this.linkTo}>
            <Flex justify="between">
              <span className="f-20 color-white _status">
                {intData.recipeName ? intData.recipeName : null}{" "}
                {statusObj.childrenlock
                  ? statusObj.workStatus
                  : statusObj.workStatus}
              </span>
              {_timer}
            </Flex>
          </nav>
        );
      } else {
        if (statusObj.showStatus) {
          _elm = (
            <nav className="bar bar-tab home" onClick={this.linkTo}>
              <Flex justify="between">
                <span className="f-20 color-white _status">
                  {intData.recipeName ? intData.recipeName : null}{" "}
                  {statusObj.childrenlock
                    ? LanguagePack.locking
                    : statusObj.workStatus}
                </span>
                <span />
              </Flex>
            </nav>
          );
        } else {
          _elm = null;
        }
      }
    }
    return _elm;
  },
  detailNavBottom() {
    let intData = this.state.intData;
    let statusObj = intData.statusObj || {},
      timeObj = intData.timeObj || {};
    //console.log("timeObj:"+JSON.stringify(timeObj));

    let totalbytectrl = this.props.totalbytectrl; //控制指令
    let _page = this.props.page; //来自哪个页面
    var _elm = "";
    var detailSource = this.props.detailSource || {};
    var recipe_id = intData.recipeId;
    if (intData.recipeName == "undefined") {
      intData.recipeName = "";
    }

    if (_page == "detail") {
      //详情页底部
      if (statusObj.showTime) {
        if (recipe_id != detailSource.id) {
          return (
            <nav className="bar bar-tab home">
              <Flex justify="between">
                <span className="f-20 color-white _status">
                  {intData.recipeName ? intData.recipeName : null}{" "}
                  {statusObj.childrenlock
                    ? statusObj.workStatus
                    : statusObj.workStatus}
                </span>
              </Flex>
            </nav>
          );
        }
        var _stopNode = null,
          _continueNode = null;
        if (statusObj.hasStopBtn) {
          _stopNode = (
            <div
              className="md-btn"
              onClick={this.controlHandle.bind(null, "stop")}
            >
              {LanguagePack.stop}
            </div>
          );
        } else {
          _stopNode = null;
        }
        if (statusObj.hasContinue) {
          _continueNode = (
            <div
              className="md-btn"
              onClick={this.controlHandle.bind(null, "continue")}
            >
              {LanguagePack.continue}
            </div>
          );
        } else {
          _continueNode = null;
        }
        _elm = (
          <nav className="md-bar-section">
            <div className="status_show">
              {statusObj.childrenlock
                ? statusObj.workStatus
                : statusObj.workStatus}
            </div>
            <div className="detail-btn">
              <Flex justify="center">
                {statusObj.step ? (
                  <span className="btn-dec mr-20">
                    {LanguagePack.step} {statusObj.step} {LanguagePack._bu}
                  </span>
                ) : null}
                <CountDown
                  cur_hours={timeObj.h}
                  cur_minute={timeObj.m}
                  cur_seconds={timeObj.s}
                  ctrl_stop={statusObj.time_stop}
                />
              </Flex>
              <Flex justify="center">
                <div>
                  <div
                    className="md-btn col_light"
                    onClick={this.controlHandle.bind(null, "remove")}
                  >
                    {LanguagePack.cancel}
                  </div>
                  {_stopNode}
                  {_continueNode}
                </div>
              </Flex>
            </div>
          </nav>
        );
      } else {
        if (!statusObj.canBegin) {
          _elm = null;
        } else {
          // var DevType =	this.props.devType;
          var DevType = window.localStorage.getItem("WhichDev");
          var devicetypes = detailSource.devicetypes;
          var dev_type = SwitchDec.switchDevType(+devicetypes);
          if (DevType == dev_type) {
            _elm = (
              <nav className="md-bar-section">
                <div className="detail-btn">
                  <Flex justify="center">
                    <div>
                      <div
                        className="md-btn begin_btn"
                        onClick={this.controlHandle.bind(null, "begin")}
                      >
                        {LanguagePack.oneButtonStart}
                      </div>
                    </div>
                  </Flex>
                </div>
              </nav>
            );
          } else {
            _elm = (
              <nav className="md-bar-section">
                <div className="detail-btn">
                  <Flex justify="center">
                    <div style={{ color: "#fff" }}>
                      {LanguagePack.controlWarning}
                    </div>
                  </Flex>
                </div>
              </nav>
            );
          }
        }
      }
    }
    return _elm;
  },

  render: function() {
    let _mask_node = null;

    let intData = this.state.intData;
    let showbox = intData.showbox || {};
    let recordData = showbox.recordData || {};
    console.log(intData, "intData", this.props.page);
    if (recordData.hasRemove) {
      _mask_node = (
        <div>
          <Flex justify="center">
            <div
              className="showbox_btn first_btn"
              onClick={this.recipeCtrlHandle.bind(null, "remove")}
            >
              {LanguagePack.cancel}
            </div>
            <div
              className="showbox_btn second_btn"
              onClick={this.recipeCtrlHandle.bind(null, "continue")}
            >
              {recordData.btnText}
            </div>
          </Flex>
        </div>
      );
    } else {
      if (recordData._type == "warn") {
        let getSn = window.localStorage.getItem("SnType");
        if (getSn == "0TPN36FQ") {
          //特定sn
          _mask_node = <div style={{ paddingBottom: "20px" }} />;
        } else {
          _mask_node = (
            <div>
              <div
                className="showbox_btn finish_btn"
                onClick={this.recipeCtrlHandle.bind(null, "remove")}
              >
                {LanguagePack.cancel}
              </div>
            </div>
          );
        }
      } else {
        _mask_node = (
          <div>
            <div
              className="showbox_btn finish_btn"
              onClick={this.recipeCtrlHandle.bind(null, "remove")}
            >
              {recordData.btnText}
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="status_section">
          {this.homeNavBottom()}
          {this.detailNavBottom()}
          <Modal
            title=""
            animated={false}
            transparent
            visible={showbox.visible}
          >
            <div className="">
              <div>
                {recordData.icon ? (
                  <img
                    className="showbox_icon"
                    width="70"
                    src={recordData.icon}
                  />
                ) : null}
              </div>
              <div>
                <div className="showbox_title">
                  {recordData.warnIcon ? (
                    <img
                      className="warn_showbox_icon"
                      src={recordData.warnIcon}
                    />
                  ) : null}
                  {recordData.title}
                </div>
                <div className="showbox_content">{recordData.content}</div>
              </div>
              {_mask_node}
            </div>
          </Modal>

          {/*<Modal title="" animated={false} transparent visible={this.state.loading_visible}>
          <Loading />
          <div className="mb-10">发送请求中，请稍等...</div>
        </Modal>*/}
        </div>
        {intData.loading_visible ? (
          <div className="am-modal-send-mask">
            <div className="mask_content">
              <Loading />
              <div className="mb-10">{LanguagePack.sendWarning}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
});

module.exports = Index;
