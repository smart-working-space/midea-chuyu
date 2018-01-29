import { Toast,PullToRefresh } from "antd-mobile";
import { hashHistory } from "react-router";
import "./index.less";

import ThemeAction from "../../mvc/actions/ThemeAction";
import ThemeStore from "../../mvc/stores/ThemeStore";
import ListAction from "../../mvc/actions/ListAction";
import ListStore from "../../mvc/stores/ListStore";
import StatusNavBottom from "../../components/common/StatusNavBottom";
import CommonList from "../../components/common/commonList";

var Index = React.createClass({
  mixins: [Reflux.connect(ListStore, "listData")],
  getInitialState: function() {
    return {
      hasMore: true,
      height: document.documentElement.clientHeight,
      listData: { resultList: [], isResultEnd: false },
      devType: "",
      snType: "",
      refreshing: false,
      down: true
    };
  },

  componentDidMount: function() {
    $('#alertloading').show();
    this.fetch();

    setTimeout(function(){
      var elm_loading = $('#alertloading').css('display');
      console.log('loading dispaly:'+elm_loading);
      if(elm_loading=='block'){
        $('#alertloading').hide();
        Toast.info('查询不到设备,请检查设备是否在线或者检查网络是否可用',3);
      }
    },12000)
  },
  fetch() {
    let self = this;
    const { listData } = this.state;
    bridge.getDeviceSN(
      function(callback) {
        var SN = JSON.stringify(callback);
        console.log("list_SN:" + SN);
        var devType = SN.substr(5, 2);
        var whichDev = devType;
        window.localStorage.setItem("DevType", devType);
        var snType = SN.substr(10, 8);
        window.localStorage.setItem("SnType", snType);
        if (
          snType.indexOf("0ET085QL") > -1 ||
          snType.indexOf("0TYN50QL") > -1 ||
          snType.indexOf("ET1065Q") > -1 ||
          snType.indexOf("0TPN36FQ") > -1 ||
          devType == "9A" ||
          devType == "9B"
        ) {
          devType = "BF";
          window.localStorage.setItem("DevType", devType);
        }
        window.localStorage.setItem("WhichDev", whichDev);
        self.setState({
          devType: devType,
          snType: snType
        });
        let _props = self.props || {},
          location = _props.location || {},
          query = location.query || {},
          keyword = query.keyword || "",
          key = query.key || "";
        var _page = "1,5";
        ListAction.getResultAll(keyword, key, devType, snType, "init");
      },
      function(errCode) {}
    );
  },

  handleAction() {
    let _props = this.props || {},
      location = _props.location || {},
      query = location.query || {},
      keyword = query.keyword || "",
      key = query.key || "";
    if (this.state.listData.isResultEnd) {
      this.setState({
        refreshing: false,
        hasMore: false
      });
    } else {
      setTimeout(() => {
        ListAction.getResultAll(
          keyword,
          key,
          this.state.devType,
          this.state.snType,
          "loading"
        );
      }, 1000);
    }
  },
  linkTo(recipeId) {
    hashHistory.push("/detail?recipeId=" + recipeId);
  },
  render() {
    const { hasMore, listData, devType } = this.state;
    //themeData.list = themeData.list||[];
    console.log(this.state);
    let self = this;
     if ((listData.resultList.length == 0) && (!listData.isResultEnd)) {
       return <div className="page page-current">
           <div style={{ position: "fixed", top: "0px", left: "0px", width: "100%", zIndex: "10" }}>
             <NavBar navLeft={{ icon: "left", dec: LanguagePack.return }} title={LanguagePack.searchResult} navRight={{ name: "search", icon: "search", link: "search" }} />
           </div>
           <div style={{ paddingTop: "95px", paddingLeft: "12px" }}>
             <Loading />
           </div>
         </div>;
     }

    if (listData.resultList.length <= 0 && listData.isResultEnd) {
      return (
        <div className="page page-current">
          <div
            style={{
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              zIndex: "10"
            }}
          >
            <NavBar
              navLeft={{ icon: "left", dec: LanguagePack.return }}
              title={LanguagePack.searchResult}
              navRight={{ name: "search", icon: "search", link: "search" }}
            />
          </div>
          <div style={{ paddingTop: "95px", paddingLeft: "12px" }}>
            {LanguagePack.NoRelevantRecipes}
          </div>
        </div>
      );
    }

    return (
      <div className="page page-current">
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            zIndex: "10"
          }}
        >
          <NavBar
            navLeft={{ icon: "left", dec: LanguagePack.return }}
            title={LanguagePack.searchResult}
            navRight={{ name: "search", icon: "search", link: "search" }}
          />
        </div>
        <PullToRefresh
          style={{
            height: this.state.height,
            overflow: "auto",
            paddingTop: "82px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
          indicator={this.state.down ? { deactivate: "上拉可以刷新" } : {}}
          direction={this.state.down ? "up" : "down"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.handleAction();
          }}
        >
          <div>
            <CommonList
              listData={listData.resultList}
              collectHandle={this.collectHandle}
              linkTo={this.linkTo}
            />
          </div>
        </PullToRefresh>
        {devType ? <StatusNavBottom page={"home"} devType={devType} /> : null}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Index;
