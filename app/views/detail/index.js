import { hashHistory } from "react-router";
import { Flex, Icon, ActionSheet } from "antd-mobile";
//import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
//import "../../../node_modules/react-html5video/dist/ReactHtml5Video.css"; // import css
//该页面的样式
import "./index.less";
import StatusNavBottom from "../../components/common/StatusNavBottom";
import MenuAction from "../../mvc/actions/MenuAction";
import MenuStore from "../../mvc/stores/MenuStore";
import CrossScreen from "./crossScreen";
import YouMeng from "../../components/common/youMeng";

var Index = React.createClass({
  mixins: [Reflux.connect(MenuStore, "detailSource")],
  getInitialState: function() {
    return {
      which_screen: "vertical",
      detailSource: {},
      devType: "",
      icons: [
        //分享图标
        {
          icon: (
            <img
              src="https://os.alipayobjects.com/rmsportal/zfQfLxUmXfgWech.png"
              style={{
                height: 27,
                verticalAlign: "top"
              }}
            />
          ),
          title: "支付宝"
        },
        {
          icon: (
            <img
              src="https://os.alipayobjects.com/rmsportal/pTINxOHGLBxzEAG.png"
              style={{
                height: 27,
                verticalAlign: "top"
              }}
            />
          ),
          title: "微信好友"
        },
        {
          icon: (
            <img
              src="https://os.alipayobjects.com/rmsportal/VMjNbIuafpXfjQE.png"
              style={{
                height: 27,
                verticalAlign: "top"
              }}
            />
          ),
          title: "QQ"
        }
      ],

      nutrition: [
        //营养对应表
        { En_word: "Energy", Ch_word: LanguagePack.energy, dist: "kcal" }, //能量/kcal
        { En_word: "Protein", Ch_word: LanguagePack.protein, dist: "g" }, //蛋白质/g
        { En_word: "Fat", Ch_word: LanguagePack.fat, dist: "g" }, //脂肪/g
        {
          En_word: "Carbohydrate",
          Ch_word: LanguagePack.carbohydrate,
          dist: "g"
        }, //碳水化合物/g
        { En_word: "Tdf", Ch_word: LanguagePack.fiber, dist: "g" }, //膳食纤维/g
        { En_word: "VitaminA", Ch_word: LanguagePack.VitaminA, dist: "μg" }, //维生素A/μg
        { En_word: "VitaminB1", Ch_word: LanguagePack.VitaminB1, dist: "mg" }, //维生素B1/mg
        { En_word: "VitaminB2", Ch_word: LanguagePack.VitaminB2, dist: "mg" }, //维生素B2/mg
        { En_word: "VitaminC", Ch_word: LanguagePack.VitaminC, dist: "mg" }, //维生素C/mg
        { En_word: "VitaminE", Ch_word: LanguagePack.VitaminE, dist: "mg" }, //维生素E/mg
        { En_word: "Na", Ch_word: LanguagePack.Na, dist: "mg" }, //钠/mg
        { En_word: "K", Ch_word: LanguagePack.K, dist: "mg" }, //钾/mg
        { En_word: "Ca", Ch_word: LanguagePack.Ca, dist: "mg" }, //钙/mg
        { En_word: "Fe", Ch_word: LanguagePack.Fe, dist: "mg" }, //铁/mg
        { En_word: "Zn", Ch_word: LanguagePack.Zn, dist: "mg" } //锌/mg
      ]
    };
  },
  componentDidMount: function() {
    let props = this.props;
    $("#alertloading").hide();
    $(".model_alertloading").hide();
    this.getDetailSource(props);
  },
  getDetailSource(nextprops) {
    let self = this;
    let recipeId = GetUrlParams.recipeId(nextprops); //获取页面参数
    var devType = window.localStorage.getItem("DevType");
    self.setState({
      devType: devType
    });
    MenuAction.detail(devType, recipeId);
  },
  //收藏
  collectHandle(recipeId, isCollect) {
    let detailSource = this.state.detailSource || {};

    //友盟统计
    let _action = "";
    if (isCollect == "no") {
      _action = "_menu_collect";
    }
    if (isCollect == "yes") {
      _action = "_menu_cancel_collect";
    }
    let _menu =
      "{" +
      "menuName:" +
      detailSource.name +
      "," +
      "menuID:" +
      detailSource.id +
      "}";
    YouMeng.count(_menu, _action); //友盟统计

    MenuAction.detailFavoriteHandle(this.state.devType, recipeId, isCollect);
  },
  //营养块
  nutritionFn(nutrition, state_nutrition) {
    let _arr = [],
      Energy = "";
    for (var index in nutrition) {
      for (var _index in state_nutrition) {
        if (index == state_nutrition[_index].En_word) {
          if (state_nutrition[_index].En_word == "Energy") {
            Energy = nutrition[index];
            break;
          }
          if (+nutrition[index] > 0) {
            _arr.push({
              Ch_word: state_nutrition[_index].Ch_word,
              value: nutrition[index],
              dist: state_nutrition[_index].dist
            });
          }
        }
      }
    }

    let _node = _arr.map((item, key) => {
      if (key < 10) {
        return (
          <Flex key={key}>
            <Flex.Item>
              <span className="f-12 color-light-bold">{item.Ch_word}</span>
            </Flex.Item>
            <Flex.Item>
              <span className="f-12 color-light-bold">
                {item.value}
                {item.dist}
              </span>
            </Flex.Item>
          </Flex>
        );
      }
    });
    if (nutrition) {
      return (
        <div className="detail-dec-section">
          <div className="d-title mb-8">{LanguagePack.mainNutrient}</div>
          {_node}
          <div
            className="d-title mb-8"
            style={{
              borderTop: "1px solid rgb(217, 217, 217)",
              marginTop: "16px",
              paddingTop: "10px"
            }}
          >
            {LanguagePack.energyComponent}
            <span className="f-12 color-light-bold"> ({Energy}kcal) </span>
          </div>
        </div>
      );
    }
  },
  buyLink(buy_arr) {
    //购买菜单
    let _arr = [];
    for (var key in buy_arr) {
      _arr.push(buy_arr[key].name);
    }
    var BUTTONS = _arr;
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        // title: '标题',
        message: "食材购买",
        maskClosable: true
      },
      buttonIndex => {
        //this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    );
  },
  showShareActionSheet(detailSource) {
    //分享

    let paramjson = {
      title: detailSource.name,
      content: detailSource.desc,
      pic: detailSource.picurl,
      url:
        "http://iot2.midea.com.cn:8080/third-api/recipe/detail/" +
        detailSource.id
    };
    //  alert("传入字符串参数paramjson_string:"+JSON.stringify(paramjson));
    console.log(paramjson);
    var _return = bridge.UMengshare(JSON.stringify(paramjson));
    //  alert("str_return:"+_return);

    //友盟统计
    let _menu =
      "{" +
      "menuName:" +
      detailSource.name +
      "," +
      "menuID:" +
      detailSource.id +
      "}";
    YouMeng.count(_menu, "_menu_share"); //友盟统计

    return;

    const icons = this.state.icons;
    ActionSheet.showShareActionSheetWithOptions(
      {
        options: icons,
        title: "分享",
        message: "分享功能暂未开放"
      },
      buttonIndex => {
        //console.log(icons[buttonIndex].title );
      }
    );
  },
  linkTo(recipeId, which_link) {
    //跳评论页
    hashHistory.push("/" + which_link + "?recipeId=" + recipeId);
  },
  showCrossScreen() {
    this.setState({
      which_screen: "cross"
    });
  },
  verticalScreen() {
    let self = this;
    let state_nutrition = this.state.nutrition;
    let detailSource = this.state.detailSource,
      effect = detailSource.effect || [],
      mainingredients = detailSource.mainingredients || [],
      ingredients = detailSource.ingredients || [],
      steps = detailSource.steps || [],
      nutrition = detailSource.nutrition || {};
    let _nut = {
      Ca: 675,
      Carbohydrate: 52.5,
      Energy: 655,
      Fat: 25,
      Fe: 17.5,
      K: 2390,
      Na: 19.5
    };
    let _navbar = (
      <NavBar
        title={detailSource.name}
        navLeft={{ icon: "left", dec: LanguagePack.return }}
        navRight={{ icon: "search", link: "search" }}
      />
    );
    console.log(detailSource, "detailSource");
    if (JSON.stringify(detailSource) == "{}") {
      return <div className="page page-current">
          <div style={{ position: "fixed", top: "0px", left: "0px", width: "100%", zIndex: "10" }}>
            {_navbar}
            <div className="tags-section detail">
              <Flex justify="between">
                <span className="star-icon-f20">
                  <span className="">
                    <span className="_icon hearto" style={{ position: "relative", top: "1px" }} />
                  </span>
                  <span className="md-dec-number"> 0</span>
                </span>
                <span className="star-icon-f18">
                  <span className="_icon share" /> <span style={{ fontSize: "14px", position: "relative", top: "-2px" }}>
                    {LanguagePack.share}
                  </span>
                </span>
                <span className="star-icon-f20">
                  <span className="_icon message" /> <span className="md-dec-number">
                    0
                  </span>
                </span>
              </Flex>
            </div>
            <Loading />
          </div>
        </div>;
    }

    //是否有视频
    let _video = "";
    if (+detailSource.hasVideo) {
      _video = <div className="play-btn" />;
    }

    //设备
    let devicetypes = detailSource.devicetypes;
    let devicetypes_dec = SwitchDec.switchDevicetypes(+devicetypes);
    //难度
    let easy = detailSource.easy;
    let easy_dec = SwitchDec.switchEasy(easy);
    //是否收藏
    let recorded_col = "",
      _heart = "hearto";
    if (detailSource.recorded == "yes") {
      recorded_col = "color-red";
      _heart = "heart";
    } else {
      recorded_col = "";
      _heart = "hearto";
    }

    let _nav_bottom = this.state.devType ? (
      <StatusNavBottom
        detailSource={detailSource}
        page={"detail"}
        totalbytectrl={detailSource.totalbytectrl}
        devType={this.state.devType}
      />
    ) : null;

    let buy_arr = []; //购买菜单
    let _step_length = steps.length;

    //let _detail_url = PicTransformFun.picTransform(detailSource.picurl,"_x");//图片压缩
    let _num_record = 0;

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
          {_navbar}
          <div className="tags-section detail">
            <Flex justify="between">
              <span
                className="star-icon-f20"
                onClick={self.collectHandle.bind(
                  null,
                  detailSource.id,
                  detailSource.recorded
                )}
              >
                <span className={recorded_col}>
                  <span
                    className={"_icon " + _heart}
                    style={{ position: "relative", top: "1px" }}
                  />
                </span>
                <span className="md-dec-number">
                  {" "}
                  {detailSource.recorded_people}
                </span>
              </span>
              <span
                className="star-icon-f18"
                onClick={this.showShareActionSheet.bind(null, detailSource)}
              >
                <span className="_icon share" />{" "}
                <span
                  style={{
                    fontSize: "14px",
                    position: "relative",
                    top: "-2px"
                  }}
                >
                  {LanguagePack.share}
                </span>
              </span>
              <span
                className="star-icon-f20"
                onClick={this.linkTo.bind(null, detailSource.id, "comment")}
              >
                <span className="_icon message" />{" "}
                <span className="md-dec-number">
                  {detailSource.commentCount}
                </span>
              </span>
            </Flex>
          </div>
        </div>
        <div className="_content_detail pd-70">
          <div className="detail-video-section">
            {detailSource.hasVideo ? (
              <div className="_video_content">
                {/*<video controls muted poster="http://121.41.75.163:8000/source/image/20161015/1476501528861oph5_x.jpg">
                          <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                          你的浏览器不支持
                        </video>*/}
                <Video
                  controls
                  muted
                  poster="http://121.41.75.163:8000/source/image/20161119/14795483147921gjf_x.jpg"
                >
                  <source
                    src="http://media.w3.org/2010/05/sintel/trailer.mp4"
                    type="video/mp4"
                  />
                  <Overlay />
                  <Controls>
                    <Play />
                    <Seek />
                    <Time />
                    <Mute />
                    <Fullscreen />
                  </Controls>
                </Video>
              </div>
            ) : (
              <img src={detailSource.picurl} />
            )}
            {_video}
            {detailSource.hasVideo ? null : (
              <div className="detail_mask">
                <div
                  className="fl"
                  style={{ position: "relative", left: "10px" }}
                >
                  <span className="dev_name">{devicetypes_dec}</span>
                  <span className="dev_title">{LanguagePack.difficulty} </span>
                  <span className="dev_how">{easy_dec}</span>
                </div>
                <div
                  className="fr"
                  style={{ position: "relative", right: "10px" }}
                >
                  <span
                    className="_icon clock"
                    style={{ opacity: "0.5", position: "relative", top: "3px" }}
                  />{" "}
                  {detailSource.time}
                  {LanguagePack.min} {detailSource.timeSec}
                  {LanguagePack.sec}
                </div>
              </div>
            )}
            {/*<div className="detail_cross_btn" onClick={this.showCrossScreen}>{LanguagePack.crossScreen}</div>*/}
          </div>

          <div className="detail-list">
            <Flex>
              <Flex.Item>
                <CommentStar point={+detailSource.point} />
                <span className="f-14">
                  {" "}
                  {detailSource.pointCount}
                  {LanguagePack.item}
                </span>
              </Flex.Item>
              <Flex.Item>
                <span className="f-14">
                  {detailSource.finishCount}
                  {LanguagePack.PeopleDoNumber}
                </span>
              </Flex.Item>
            </Flex>
            <div className="mt-15 f-14">{detailSource.desc}</div>
            {this.nutritionFn(nutrition, state_nutrition)}
          </div>

          <div className="detail-list">
            <div className="mt-10 mb-10">
              {/*
                        <Flex
                           justify="center"
                         >
                           <span className="main_dec"><Icon type="minuscircle" /></span>
                           <span className="main_word">{detailSource.weight} <span className="f-16">人份</span></span>
                           <span className="main_dec"><Icon type="pluscircle" /></span>
                        </Flex>
                      */}
            </div>
            <div className="mb-20">
              <div className="d-title">{LanguagePack.mainingredients}</div>
              <div className="detail-dec-section no-border">
                {mainingredients.map((_item, _key) => {
                  _item = _item || {};
                  let _shoppin_elm = "";
                  if (_item.buyUrl) {
                    _shoppin_elm = (
                      <span className="f-14 ml-10" key={_key}>
                        <Icon type="shoppingcart" />
                      </span>
                    );
                    buy_arr.push(_item);
                  }
                  return (
                    <div className="detail-dec-list f-12" key={_key}>
                      {_item.name} <span className=""> ({_item.weight})</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="">
              <div className="d-title">{LanguagePack.ingredients}</div>
              <div className="detail-dec-section no-border">
                {ingredients.map((_item, _key) => {
                  _item = _item || {};
                  let _shoppin_elm = "";
                  if (_item.buyUrl) {
                    _shoppin_elm = (
                      <span className="f-14 ml-10" key={_key}>
                        <Icon type="shoppingcart" />
                      </span>
                    );
                    buy_arr.push(_item);
                  }
                  return (
                    <div className="detail-dec-list f-12" key={_key}>
                      {_item.name} <span className=""> ({_item.weight})</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*<div style={{width: '100%',textAlign: 'center',marginTop:'20px'}}>
                      <div className="md-btn col_light buy_section" onClick={this.buyLink.bind(null,buy_arr)}>食材购买<span className="buy_icon"></span></div>
                    </div>*/}
          </div>

          {steps.map((_item, _key) => {
            //是否有视频
            let _has_video = "";
            if (+_item.hasVideo) {
              _has_video = <div className="play-btn" key={_key} />;
            }
            let byte20 = _item.byte20 || [];

            let _step_icon_elm = "";
            if (byte20.length > 0) {
              _step_icon_elm = <span className="step_icon" key={_key} />;
            }

            let _load_section;
            //let _step_url = PicTransformFun.picTransform(_item.url,"_x");//图片压缩
            if (_key < 0) {
              _load_section = <img src={_item.url} />;
            } else {
              _load_section = <img src={_item.url} />;
            }

            if (byte20.length > 0) {
              _num_record++;
            }
            console.log(_num_record, "_num_record");

            return (
              <div className="detail-list no-padding">
                <div
                  className="detail-video-section pd-15"
                  style={{ background: "#fff" }}
                >
                  {_load_section}
                  {_has_video}
                </div>
                <div className="pd-15" style={{ paddingTop: "0" }}>
                  <div className="d-title">
                    {LanguagePack._step}
                    {_key + 1} {_step_icon_elm}
                  </div>
                  <div className="f-14 mt-5">{_item.desc}</div>
                  {byte20.map((this_item, this_key) => {
                    let _devicetypes_dec = SwitchDec.switchDevicetypes(
                      this_item.devicetype
                    );
                    let _cmd = this_item.cmd || [];
                    return (
                      <div className="mt-20" key={this_key}>
                        <Flex justify="center">
                          <span>
                            {LanguagePack.step} {_num_record} {LanguagePack._bu}
                          </span>
                          {/*<span className="">{_devicetypes_dec}</span>*/}
                          {_cmd[0].h > 0 ? (
                            <span>
                              <span className="bold-word">{_cmd[0].h}</span>
                              <span>{LanguagePack.hour}</span>
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="bold-word">{_cmd[0].m}</span>
                          {LanguagePack.min}
                          <span className="bold-word">{_cmd[0].s}</span>
                          {LanguagePack.sec}
                        </Flex>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {detailSource.tips ? (
            <div className="detail-list">
              <span className="" style={{ color: "#b13b00" }}>
                Tips: {detailSource.tips}
              </span>
            </div>
          ) : null}
        </div>
        {_nav_bottom}
      </div>
    );
  },
  returnDetail(type) {
    if (type) {
      this.setState({
        which_screen: "vertical"
      });
    }
  },
  render: function() {
    let detailSource = this.state.detailSource;
    let which_screen = this.state.which_screen;
    if (which_screen == "vertical") {
      return <div>{this.verticalScreen()}</div>;
    } else if (which_screen == "cross") {
      return (
        <div>
          <CrossScreen
            detailSource={detailSource}
            devType={this.state.devType}
            returnDetail={this.returnDetail}
          />
        </div>
      );
    }
  }
});

module.exports = Index;
