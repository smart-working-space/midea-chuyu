import { Icon, Tabs, Toast, PullToRefresh, Carousel } from "antd-mobile";
import { hashHistory } from "react-router";
import "./index.less";

import ThemeAction from "../../mvc/actions/ThemeAction";
import ThemeStore from "../../mvc/stores/ThemeStore";
import ListAction from "../../mvc/actions/ListAction";
import ListStore from "../../mvc/stores/ListStore";

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
    // $("#alertloading").show();
    this.fetch();
  },
  fetch() {
    let self = this;
    //ThemeAction.getAll();
    ListAction.getAll('init');
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
  
  themeNode() {
    return (
      <div className="card-content">
       
        
      </div>
    );
  },

  render() {
      return(
        <div>
            {this.props.children}
        </div>
      )
  }
});

module.exports = Index;
