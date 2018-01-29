import {Link,Router, Route, IndexRoute, useRouterHistory} from "react-router";
import { Flex, Toast, Modal, Button} from 'antd-mobile';
const prompt = Modal.prompt;

var Index = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      canSee: false,
      respUid: '',
      respComment: '',
      username: '',
      respUsername: '',
      cardData: []
    };
  },
  componentDidMount: function () {
    this.setState({
      cardData: this.props.cardData
    })
  },
  componentWillReceiveProps(nextprops){
    this.setState({
      cardData: nextprops.cardData
    })
  },
  like(commentId){
    recipeAddGood(commentId, this.doRecipeAddGood.bind(this,commentId));
  },
  doRecipeAddGood(commentId,res){
    if(res.saved=="yes"){
      Toast.info(LanguagePack.likeSuccess, 2);
      let _cardData = this.state.cardData;
      _cardData.forEach((item,key)=>{
          if(item.comment==commentId){
            item.good_count++;
          }
      })
      this.setState({
        cardData: _cardData
      })
      //this.context.router.push('/comment'+"?recipeId="+this.props.recipeId);
    }
  },

  showModal(_respUid,_respComment,_username,respUsername) {
    //console.log(respUsername);
    $('#reply_content').val('');
    this.setState({
      canSee: true,
      respUid: _respUid,
      respComment: _respComment,
      username: _username,
      respUsername: respUsername
    });
  },
  onClose() {
    this.setState({
      canSee: false,
      content: '',
      username: '',
      respUsername: ''
    });
  },

  replyWord(){
    let recipeId = this.props.recipeId,
        type = 0,
        content = $('#reply_content').val(),
        respUid = this.state.respUid,
        respComment = this.state.respComment,
        username = this.state.username,
        respUsername = this.state.respUsername;
    //Toast.info('回复评论请求中', 2);
    recipeCommentReply(recipeId, type, content, respUid, respComment, this.doRecipeCommentReply.bind(this,respComment,content,username,respUsername));
  },
  doRecipeCommentReply(respComment,content,username,respUsername,res){
    if(res.comment){
      console.log(res.comment,respComment,content,username,respUsername,'666');
      this.setState({
        canSee: false,
      });
      Toast.info(LanguagePack.replySuccess, 2);
      let _cardData = this.state.cardData;
      let c_time = new Date().getTime();
      _cardData.forEach((item,key)=>{
          if(item.comment==respComment){
            let replys = item.replys||[];
            if(replys.length<=0){
              item.replys = [{
                uid: window.localStorage.getItem("DEFAULT_UID"),
                content: content,
                username: username,
                PARENTCOMMENTID: respComment,
                time: c_time
              }]
            }else{
              replys.push({
                uid: window.localStorage.getItem("DEFAULT_UID"),
                content: content,
                username: username,
                PARENTCOMMENTID: respComment,
                time: c_time
              });
            }
          }
          item.reply_count++;
      })
      console.log(_cardData,'_cardData');
      this.setState({
        cardData: _cardData
      })
      //window.location.reload();
      //this.context.router.push('/comment'+"?recipeId="+this.props.recipeId);
    }
  },

  render: function () {

      let self = this;
      //获取组件传的卡片数据
      let cardData = this.state.cardData;
      return (
          <div className="_comment_list">
          {
            cardData.map((item,key)=>{
              let picUrls = item.picUrls||[]; //评论图片
              let replys = item.replys||[]; //回复
              return(
                <div className="comment-section" key={key}>
                  <div className="row">
                     <div className="fl header-picture"><img src={item.userPhotoUrl} /></div>
                     <div className="fl ml-15 comment-detail">
                       <Flex
                         justify="between"
                       >
                         <span className="_username">{item.username} </span>
                         <span className="f-12"> {LanguagePack.score}
                            <CommentStar point={+item.point} />
                         </span>
                       </Flex>
                       <div className="dec mt-7 f-12">{item.content}</div>

                       <div className="mt-15 pics-section">
                       {
                         picUrls.map((_item,_key)=>{
                           return(
                              <div className="pic" key={_key}><img src={_item} /></div>
                           )
                         })
                       }
                       </div>

                       <div className="mt-7">
                         <Flex
                           justify="between"
                         >
                           <span className="f-12 date">{TimeLine.timeSwitch(item.time)}</span>
                           <span className="f-14">
                              <span className="click-section" onClick={self.like.bind(null,item.comment)}><span className="_icon like"></span> {item.good_count}</span>
                              <span className="click-section ml-8" onClick={this.showModal.bind(null,'',item.comment,item.username,"")}>
                                <span className="_icon message"></span> {item.reply_count}
                              </span>
                           </span>
                         </Flex>
                       </div>

                       <div className="mt-15 f-12">
                       {
                         replys.map((_item,_key)=>{
                           _item = _item||{};
                           let _reply = '：';
                           if(_item.respUsername){
                             _reply = "："+LanguagePack.reply+_item.respUsername;
                           }
                           return(
                             <div className="reply_section">
                               <div className="" onClick={this.showModal.bind(null,_item.uid,item.comment,_item.username,_item.respUsername)}>
                                 <span className="replay-dec" key={_key}>{_item.username}{_reply} </span>
                                 <span> {_item.content}</span>
                               </div>
                               <div className="mt-5"><span className="f-12 date">{TimeLine.timeHandle(_item.time)}{LanguagePack.ago}</span></div>
                              </div>
                           )
                         })
                       }
                       </div>
                     </div>
                  </div>
                </div>
              )
            })
          }
            <Modal title={LanguagePack.comment} animated={false} transparent visible={this.state.canSee}>
              <div className="">
                <textarea id='reply_content' className="show-text border" placeholder={": "+LanguagePack.reply+" "+this.state.username}></textarea>
              </div>
              <div className="mt-5">
                <Flex align="center">
                 <Flex.Item>
                   <Button type="primary" onClick={this.replyWord}>{LanguagePack.reply}</Button>
                 </Flex.Item>
                 <Flex.Item>
                   <Button  onClick={this.onClose}>{LanguagePack.cancel}</Button>
                 </Flex.Item>
                </Flex>
               </div>
            </Modal>
          </div>
      );
    }
});

module.exports = Index;
