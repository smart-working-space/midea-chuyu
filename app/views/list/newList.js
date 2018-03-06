import {  SearchBar, WhiteSpace, WingBlank,Flex,PullToRefresh,Carousel } from "antd-mobile";
import { hashHistory } from "react-router";
import "./index.less";
import ListAction from "../../mvc/actions/ListAction";
import ListStore from "../../mvc/stores/ListStore";

var Index = React.createClass({
  mixins: [
    Reflux.connect(ListStore, "listData"),
  ],
  getInitialState: function() {
    return {
      hasMore: true,
      listData: { sourceList: [],categoryList:[],themeList:[],categoryValue:"",searchName:"",nothing:false, isEnd: false },
      height: document.documentElement.clientHeight,
      devType: "",
      snType: "",
      refreshing: false,
      down: true,
      newCategoryList:[],
      slideIndex: 0,
      value:""
    };
  },

  componentDidMount: function() {
    // $("#alertloading").show();
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei
    }), 0);
    this.fetch();
  },
  fetch() {
    ListAction.getTheme();    
    ListAction.getAllCategory();    
    ListAction.getAll('init','','');
  },
  categoryClick(item){
    let {listData} = this.state;
    let categoryList=listData.categoryList;
    categoryList.forEach((_item,key)=>{
      if(item.value==_item.value){
         _item.isCategoryActive = true;
      }else{
        _item.isCategoryActive = false;
      }
    })
    ListAction.getAll('init',item.value,"");
  },

  handleAction() {
    let {listData} = this.state;
     this.setState({ refreshing: true });
    if (this.state.listData.isEnd) {
      this.setState({
        refreshing: false,
        // hasMore: false
      });
    } else {
      setTimeout(() => {
        ListAction.getAll("loading",listData.categoryValue,listData.searchName);
        this.setState({ refreshing: false });
      }, 1000);
    }
  },
  submitData(val){
    let {listData} = this.state;
    ListAction.getAll('init','',val);
  },
  cancelClick(value){
    this.setState({ value: '' });
    ListAction.getAll('init','',"");
  },

  linkTo(recipeId) {
    hashHistory.push("/detail/" + recipeId);
  },
  
  themeNode() {
    return (
      <div className="card-content">
       
        
      </div>
    );
  },

  render() {
    let {listData} = this.state, self = this;
    console.log(listData,'listdata');
    let themeList = listData.themeList;
    let categoryList=listData.categoryList;
    let sourceList = listData.sourceList;
    let showNode = null;
    if(listData.nothing){
      showNode = (
        <div className="content_section" style={{paddingTop:'20px'}}>该条件下，没有菜谱哦，换个条件试试呗</div>
      )
    }else{
      showNode = (
        <div className="content_section">
        {
          sourceList.map((item,key)=>{
            let _heart = "hearto";
            if(+item.isCollect){
              _heart = "heart";
            }

            return(
              <div className="content_list">
                <img className="list_pic" src={item.picUrl} onClick={self.linkTo.bind(null,item.recipe)} />
                <Flex justify="between">
                  <div className="">{item.name}</div>
                  <div className=""><span className={"_icon "+_heart} style={{position:'relative',top:'3px'}}></span> 收藏人数 {item.collectTime}人</div>
                </Flex>
              </div>
            )
          })
        }
        </div>
      )
    }
    return(
        <div className="whole-page">
          <div className="search_section">
            <Carousel className="space-carousel"
              autoplay={false}
              infinite
              selectedIndex={1}
            >
              {themeList.map((item, index) => (
              
                  <img
                    src={item.picUrl}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top',height:'100px' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                    onClick={self.linkTo.bind(null,item.recipe)}
                  />
              
              ))}
            </Carousel>
            <SearchBar placeholder="请输入菜谱名" maxLength={8} onSubmit={self.submitData} onClear={self.cancelClick} />
          </div>
          <div className="main_section">
            <Flex justify="between" align="start">
              <div className="left_tags">
                  <div className="category_section">
                  {
                      categoryList.map((item,key)=>{
                        let isCategoryActive = '';
                        if(item.isCategoryActive){
                          isCategoryActive = 'category_active';
                        }
                        return (
                          <div className={"category_list "+isCategoryActive} key={key} onClick={self.categoryClick.bind(null,item)}>{item.value}</div>                        
                        )
                      })
                  }
                  </div>
              </div>
              <div className="right_content">
                <PullToRefresh
                  className="pull_refresh"
                  ref={el => this.ptr = el}
                  style={{
                    height: this.state.height,
                    overflow: "auto"
                  }}
                  distanceToRefresh={55}
                  indicator={this.state.down ? { deactivate: "上拉可以刷新" } : {}}
                  direction={this.state.down ? "up" : "down"}
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.handleAction();
                  }}
                >
                  {showNode}
                </PullToRefresh>
                 
              </div>
            </Flex>
          </div>
         
          {this.props.children}
        </div>
      )
  }
});

module.exports = Index;
