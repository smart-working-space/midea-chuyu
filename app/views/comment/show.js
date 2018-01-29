
import {hashHistory} from "react-router";
import { Toast } from 'antd-mobile';
//该页面的样式
import "./show.less";
import FileUpload from '../../components/common/fileUpload';

var Index = React.createClass({
    getInitialState: function () {
      return {
          loading: false,
          point: 0,
          picUrl: [],
          files: []
      };
    },
    componentDidMount: function () {
      let props = this.props;
      this.fetch(props);
    },
    componentWillReceiveProps(nextprops){
      this.fetch(nextprops);
    },
    fetch(nextprops){
      let recipeId = GetUrlParams.recipeId(nextprops); //获取页面参数
    },
    linkTo(which_link){
      hashHistory.push('/'+which_link);
    },
    onStarChange(_point){ //评分
      this.setState({
        point: _point
      })
    },
    textChange(val){
      let _val = $('#show_content').val();
      if(_val){
        $('.publish-btn').addClass('can_color');
      }else{
        $('.publish-btn').removeClass('can_color');
      }
    },
    onFileChange: function (file_data) {
      let files = this.state.files;
      testUploadFile("fil4e",this.onUploadRes);
    },
    onUploadRes(res){
      console.log(JSON.stringify(res));
      // alert("res："+JSON.stringify(res));
      if(res.error_code==0){
        let files = this.state.files;
        let _content = res.content||{};
        let _file = _content.file||{};
        let _pic = _file.f_url;
        files.push({
          url: _pic
        });
        this.setState({
            files: files
        })
      }
    },
    publish(){ //发布
      let recipeId = GetUrlParams.recipeId(this.props); //获取页面参数
      let files = this.state.files,
          point = this.state.point,
          content = $('#show_content').val(),
          type = 1,
          picUrl = [];
          files.forEach((item,key)=>{
            picUrl.push(item.url);
          })
      if(content){
        recipeCommentWrite(recipeId, type, point, content, picUrl, this.doRecipeCommentWrite);
      }
    },
    doRecipeCommentWrite(res){
      if(res.comment){
        let recipeId = GetUrlParams.recipeId(this.props); //获取页面参数
        hashHistory.push('/comment?recipeId='+recipeId);
        Toast.info(LanguagePack.commentSuccess, 2);
        // history.go(-1);
      }
    },

    render: function () {

      let self = this;
      let loading = this.state.loading;
      let files = this.state.files;

      if(loading){
        return(
          <div><Loading /></div>
        )
      }
      return (
             <div className='page page-current show'>
               <NavBar
                  title={LanguagePack.showAndShow}
                  navLeft={{icon:'left', dec: LanguagePack.return}}
                  navRight={{icon:'',dec: LanguagePack.ShowPictures, link: "comment_show"}}
                />

                <div className="content show">

                  <div className="show-list">
                    <span className="f-16">{LanguagePack.score}</span>
                    <span className="ml-10">
                      <CommentStar point={this.state.point} fontSize={20} mR={15} onStarChange={this.onStarChange} />
                    </span>
                  </div>
                  <div className="show-list show-uploader">
                    <div className="show-text-section">
                      <textarea id="show_content" className="show-text" placeholder={LanguagePack.writeFeel} onChange={this.textChange}></textarea>
                    </div>
                    <div className="">
                       {/*<Uploader
                          onChange={this.onUploadChange}
                          files={this.state.files}
                        />*/}
                        <div>
                            <FileUpload onChange={this.onFileChange} multiple={false} />

                            <div className="thumb-box">
                            {
                              files.map((item,key)=>{
                                return(
                                  <img src={item.url} width="80" onClick={self.showBigImg} />
                                )
                              })
                            }
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="publish-btn" onClick={this.publish}>{LanguagePack.publish}</div>

                </div>
                {this.props.children}
              </div>
        );
    }
});

module.exports = Index;
