import { hashHistory } from "react-router";
import { Accordion, List } from "antd-mobile";
//该页面的样式
import "./index.less";

import SearchAction from "../../mvc/actions/SearchAction";
import SearchStore from "../../mvc/stores/SearchStore";
import YouMeng from "../../components/common/youMeng";

var index = React.createClass({
  mixins: [Reflux.connect(SearchStore, "source")],
  getInitialState: function() {
    return {
      canSee: true,
      keyword: "",
      source: {},
      result: []
    };
  },
  componentDidMount: function() {
    SearchAction.getAll();
  },

  clickRecipeName(value) {
    // console.log("选中"+value.toString());
    let _name = "search:" + value;
    YouMeng.count(_name, "_menu_search"); //友盟统计

    hashHistory.push("/result?keyword=" + value);
  },
  searchChangeCallBack(value) {
    console.log(value, "search");
    this.setState({
      keyword: value
    });
    if (value) {
      keywordList(value, this.getKeywordList);
    } else {
      this.setState({
        canSee: true
      });
    }
  },
  getKeywordList(res) {
    console.log(res, "result");
    if (res) {
      let keywordList = res.keywordList || [];
      let _list = [];
      if (keywordList.length <= 0) {
        _list.push({ label: LanguagePack.inputAgain });
      }
      keywordList.forEach((item, key) => {
        _list.push({ label: item.name });
      });
      this.setState({
        canSee: false,
        result: _list
      });
    }
  },
  onInputSubmitBack(val) {
    let _name = "search:" + val;
    YouMeng.count(_name, "_menu_search"); //友盟统计

    hashHistory.push("/result?keyword=" + val);
  },
  //调到搜索结果页
  linkTo(_key, which_link) {
    let _name = "search:" + _key;
    YouMeng.count(_name, "_menu_search"); //友盟统计
    hashHistory.push("/" + which_link + "?key=" + _key);
  },
  render: function() {
    let self = this;
    let _navbar = (
      <NavBar
        title={"searchBar"}
        navLeft={{ icon: "left", dec: LanguagePack.return }}
        navRight={{ name: "search", icon: "", link: "search" }}
        placeholder={LanguagePack.keyword}
        searchChangeCallBack={this.searchChangeCallBack}
        onInputSubmit={this.onInputSubmitBack}
      />
    );

    let source = this.state.source;
    let category = source.category || [];

    if (category.length <= 0) {
      return (
        <div>
          {_navbar}
          <div className="content search">
            <Accordion defaultActiveKey="0" className="my-accordion">
              <Accordion.Panel header={LanguagePack.time}>
                <List.Item>
                  <div className="btn-section">
                    <span className="float-btn color-weight">
                      {LanguagePack.less30}
                    </span>
                    <span className="float-btn color-weight">
                      {LanguagePack.less60}
                    </span>
                    <span className="float-btn color-weight">
                      {LanguagePack.less90}
                    </span>
                    <span className="float-btn color-weight">
                      {LanguagePack.more90}
                    </span>
                  </div>
                </List.Item>
              </Accordion.Panel>
            </Accordion>
            <Loading />
          </div>
        </div>
      );
    }

    let _result = this.state.result || [];

    return (
      <div className="page page-current search">
        {_navbar}
        {this.state.canSee ? (
          <div className="content search">
            <Accordion defaultActiveKey="0" className="my-accordion">
              {category.map((item, key) => {
                let btnList = item.list || [];
                if (key < 8) {
                  return (
                    <Accordion.Panel header={item.name} key={key}>
                      <List.Item>
                        <div className="btn-section">
                          {btnList.map((_item, _key) => {
                            return (
                              <span
                                className="float-btn color-weight"
                                onClick={self.linkTo.bind(
                                  null,
                                  _item.key,
                                  "result"
                                )}
                                key={_key}
                              >
                                {_item.value}
                              </span>
                            );
                          })}
                        </div>
                      </List.Item>
                    </Accordion.Panel>
                  );
                }
              })}
            </Accordion>
          </div>
        ) : (
          <div className="content">
            {_result.map((item, key) => {
              return (
                <div
                  className="search_li"
                  onClick={self.clickRecipeName.bind(null, item.label)}
                  key={key}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
});

module.exports = index;
