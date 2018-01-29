import { Icon, Tabs, Toast, PullToRefresh, Carousel } from "antd-mobile";
import { hashHistory } from "react-router";
import "./index.less";

import ThemeAction from "../../mvc/actions/ThemeAction";
import ThemeStore from "../../mvc/stores/ThemeStore";
import ListAction from "../../mvc/actions/ListAction";
import ListStore from "../../mvc/stores/ListStore";
import StatusNavBottom from "../../components/common/StatusNavBottom";
import CommonList from "../../components/common/commonList";

var Index = React.createClass({
  mixins: [
    Reflux.connect(ListStore, "listData"),
    Reflux.connect(ThemeStore, "themeData")
  ],
  getInitialState: function() {
    return {
      hasMore: true,
      listData: { sourceList: [], isEnd: false },
      height: document.documentElement.clientHeight,
      devType: "",
      snType: "",
      _active: 0,
      themeData: {
        list: [],
        theme: "",
        noMore: false
      },
      refreshing: false,
      down: true
    };
  },

  componentDidMount: function() {
    $("#alertloading").show();
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei
    }), 0);
    this.fetch();

    setTimeout(function() {
      var elm_loading = $("#alertloading").css("display");
      console.log("loading dispaly:" + elm_loading);
      if (elm_loading == "block") {
        $("#alertloading").hide();
        Toast.info("查询不到设备,请检查设备是否在线或者检查网络是否可用", 12);
      }
    }, 20000);
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
          snType.indexOf("0ET135QL") > -1 ||
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

        let _active = 0;
        ThemeAction.getAll(devType, snType, _active);
        ListAction.getAll(devType, snType, _active, "init");
      },
      function(errCode) {}
    );
  },

  handleAction() {
     this.setState({ refreshing: true });
    if (this.state.listData.isEnd) {
      this.setState({
        refreshing: false,
        hasMore: false
      });
    } else {
      setTimeout(() => {
        ListAction.getAll(
          this.state.devType,
          this.state.snType,
          this.state._active,
          "loading"
        );
        this.setState({ refreshing: false });
      }, 1000);
    }
  },

  linkTo(recipeId) {
    hashHistory.push("/detail?recipeId=" + recipeId);
  },
  collectThemeHandle(recipeId, isCollect, item) {
    //收藏
    ThemeAction.favoriteHandle(this.state.devType, recipeId, isCollect, item);
  },
  collectHandle(recipeId, isCollect, item) {
    //收藏
    ListAction.favoriteHandle(this.state.devType, recipeId, isCollect, item);
  },
  tabHandle(tab, index) {
    let { devType, snType, _active } = this.state;

    let key = index;
    console.log(key, "selectedSegmentIndex");
    this.setState({
      _active: key,
      hasMore: true
    });
    ListAction.getAll(devType, snType, key, "clickInit");
  },
  themeNode() {
    let { _active, themeData } = this.state;
    let self = this;
    if (_active == 1 || _active == 2) {
      return;
    }
    if (themeData.list.length <= 0) {
      if (themeData.noMore) {
        return;
      } else {
        return <Loading />;
      }
    }
    return (
      <div className="card-content">
        <div className="md-card">
          <div className="md-card-body">
            <div className="md-video-section">
              <div className="theme_name">
                {themeData.theme}{" "}
                <span
                  className="f-12"
                  style={{ position: "relative", top: "5px" }}
                >
                  <Icon type="right" />
                </span>{" "}
              </div>
              <Carousel
                className="my-carousel"
                autoplay={true}
                dots={false}
                infinite
                selectedIndex={1}
                swipeSpeed={35}
                beforeChange={(from, to) =>
                  console.log(`slide from ${from} to ${to}`)
                }
                afterChange={index => console.log("slide to", index)}
              >
                {themeData.list.map(function(item, i) {
                  //是否收藏
                  let _heart = "hearto";
                  if (+item.isCollect) {
                    _heart = "heart";
                  }
                  //let _url = PicTransformFun.picTransform(item.picUrl,"_x");
                  return (
                    <div className="">
                      <img
                        className="theme_img"
                        src={item.picUrl}
                        onClick={self.linkTo.bind(null, item.recipe, "detail")}
                      />
                      <div className="row mt-10">
                        <div className="col-80">
                          <div className="md-card-dec">
                            <span className="color-weight">{item.name}</span>
                            <span className="sub-title ml-15 color-light f-12">
                              {item.abstruct}
                            </span>
                          </div>
                        </div>
                        <div className="col-20">
                          <span
                            className="f-14"
                            onClick={self.collectThemeHandle.bind(
                              null,
                              item.recipe,
                              +item.isCollect,
                              item
                            )}
                          >
                            <span className={"_icon " + _heart} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  },

  render() {
    let tabs = [
      { title: LanguagePack.recommend },
      { title: LanguagePack.score },
      { title: LanguagePack.collection }
    ];

    let { hasMore, listData, devType, _active, themeData } = this.state;
    //themeData.list = themeData.list||[];
    console.log(this.state);
    let self = this;
    if (listData.sourceList.length <= 0 && listData.isEnd) {
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
              title={LanguagePack.cloudRecipe}
              navRight={{ name: "search", icon: "search", link: "search" }}
            />
            <Tabs
              tabs={tabs}
              initialPage={0}
              animated={false}
              onTabClick={this.tabHandle}
              tabBarBackgroundColor={"#333"}
              tabBarUnderlineStyle={{ border: "none" }}
              tabBarTextStyle={{ color: "#fff" }}
            />
          </div>
          <div style={{ paddingTop: "137px", paddingLeft: "12px" }}>
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
            title={LanguagePack.cloudRecipe}
            navRight={{ name: "search", icon: "search", link: "search" }}
          />
          <Tabs
            tabs={tabs}
            initialPage={0}
            animated={false}
            onTabClick={this.tabHandle}
            tabBarBackgroundColor={"#333"}
            tabBarUnderlineStyle={{ border: "none" }}
            tabBarTextStyle={{ color: "#fff" }}
          />
        </div>
        <PullToRefresh
          className="pull_refresh"
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: "auto",
            paddingTop: "126px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          distanceToRefresh={55}
          indicator={this.state.down ? { deactivate: "上拉可以刷新" } : {}}
          direction={this.state.down ? "up" : "down"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.handleAction();
          }}
        >
          <div>
            {this.themeNode()}
            <CommonList
              listData={listData.sourceList}
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
