import { hashHistory } from 'react-router';
import { Tabs, Flex} from 'antd-mobile';
//该页面的样式
import "./index.less";
import CommentCardList from '../../components/common/commentCardList';
import CommentAction from "../../mvc/actions/CommentAction";
import CommentStore from "../../mvc/stores/CommentStore";


var Index = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
      return {
        loading: true,
        commentCountData: {},
        recipeCommentData: {}
      };
    },
    componentDidMount: function () {
      let props = this.props;
      this.fetch(props);
    },
    fetch(nextprops){
      let recipeId = nextprops.params.id; //获取页面参数
      
      recipeCommentCount(recipeId, this.getRecipeCommentCount); //评论数
      recipeCommentList(recipeId, 1, this.getRecipeCommentList); //评论列表
    },
    getRecipeCommentCount(res){
      if(res){
        this.setState({
          commentCountData: res
        })
      }
    },
    getRecipeCommentList(res){
      if(res){
        this.setState({
          recipeCommentData: res,
          loading: false
        })
      }
    },
    //tag点击
    tagChange(tab,key){
      //console.log(key);
      let recipeId = GetUrlParams.recipeId(this.props); //获取页面参数
      let _type = 1;
      if(key==0){
          _type = 1;
      }
      if(key==1){
          _type = 2;
      }
      recipeCommentList(recipeId, _type, this.getRecipeCommentList); //评论列表
    },

    //评论块
    commentListSection(recipeId){
      let loading = this.state.loading;
      if(loading){
        return(
          <div><Loading /></div>
        )
      }
      //卡片数据
      let recipeCommentData = this.state.recipeCommentData,
          cardData = recipeCommentData.list||[];
      return <CommentCardList cardData={cardData} recipeId={recipeId} />;
    },

    linkTo(which_link){
      let recipeId = GetUrlParams.recipeId(this.props); //获取页面参数
      hashHistory.push('/'+which_link+"?recipeId="+recipeId);
    },
    render: function () {

      let self = this;

      let recipeId = GetUrlParams.recipeId(this.props); //获取页面参数

      let commentCountData = this.state.commentCountData;

      //tag配置
      let _count = commentCountData.commentCount?commentCountData.commentCount:0,
          _hasPicCount = commentCountData.hasPicCommentCount?commentCountData.hasPicCommentCount:0;
      let tagConfig = [
        {title: LanguagePack.whole+"( "+_count+" )"},
        { title: LanguagePack.picture+"( "+_hasPicCount+" )"}
      ];

       return (
             <div className='page page-current comment'>
               <div style={{position:'fixed',top:'0px',left:'0px',width:'100%',zIndex:'10'}}>
                 <NavBar
                    title={LanguagePack.comment}
                    navLeft={{icon:'left', dec: LanguagePack.return}}
                    navRight={{icon:'',dec: LanguagePack.ShowPictures, link: "comment_show"}}
                    urlParams={recipeId}
                  />
                  <div className="tags-section home">
                   <Tabs tabs={tagConfig}
                       initialPage={0}
                       animated={false}
                       onTabClick={this.tagChange}
                       tabBarBackgroundColor={"#333"}
                       tabBarUnderlineStyle={{border:'none'}}
                       tabBarTextStyle={{color:'#fff'}}
                     />
                  </div>
                </div>
                <div className="content home comment pd-70" style={{paddingTop:'120px'}}>
                  {this.commentListSection(recipeId)}
                </div>
                <nav className="bar bar-tab comment">
                  <Flex
                    justify="center"
                  >
                    <div className="am-search">
                      <div className="am-search-input" onClick={this.linkTo.bind(null,"comment_show")}>
                        <input
                          type="search"
                          disabled="disabled"
                          className="am-search-value"
                          defaultValue={LanguagePack.writeComment}
                          placeholder={LanguagePack.writeComment}
                          />
                      </div>
                    </div>
                  </Flex>
                </nav>

                {this.props.children}
              </div>
        );
    }
});

module.exports = Index;
