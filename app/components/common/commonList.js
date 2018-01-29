import { Icon } from 'antd-mobile';
var Index = React.createClass({
  getInitialState: function () {
    return {
      _data: []
    };
  },
  componentDidMount: function () {
    this.setState({
      _data: this.props.listData
    })
  },
  componentWillReceiveProps: function(nextprops){
    this.setState({
      _data: nextprops.listData
    })
  },
 collectHandle(recipe,isCollect,item){
   if(this.props.collectHandle){
     this.props.collectHandle(recipe,isCollect,item);
   }
 },
 linkTo(recipe){
   if(this.props.linkTo){
     this.props.linkTo(recipe);
   }
 },
  render: function () {
      let _data = this.state._data;
      let self = this;

      return (
        <div>
          {
            _data.map((item,key)=>{
              //难度

              let level_dec = SwitchDec.switchEasy(item.level);

              //是否有视频

              let _video = "";
              if(+item.hasVideo){
                _video = (
                  <div className="play-btn" key={key}></div>
                )
              }
              //是否收藏

              let _heart = "hearto";
              if(+item.isCollect){
                _heart = "heart";
              }

              //图片压缩
              let _url = item.picUrl;

              let _lazy_section = (<img src={_url} key={key} />);

              return(
                <div className="md-card" key={key}>
                  <div className="md-card-body">
                    <div className="md-video-section" onClick={self.linkTo.bind(null,item.recipe)}>
                      {_lazy_section}
                      {_video}
                     </div>

                    <div className="md-card-dec">
                      <span className="color-weight">{item.name}</span>
                      <span className="sub-title ml-15 color-light f-12">{item.abstruct}</span>
                    </div>
                    <div className="md-card-foot">
                      <div className="">
                        <span className="">
                          <CommentStar point={+item.point} />
                        </span>
                        <span className=" ml-15">
                          <span className="f-14" style={{position:'relative',top:'-2px'}}>{LanguagePack.difficulty}<span className="color-light ml-3">{level_dec}</span></span>
                        </span>
                        <span className="ml-15">
                          <span className="f-14" style={{position:'relative',top:'-2px'}}><span className="_icon clock" style={{opacity:'0.5',position:'relative',top:'2px'}}></span> {item.costTime}{LanguagePack.min} {item.costTimeSec}{LanguagePack.sec}</span>
                        </span>
                        <span className="ml-15">
                          <span className="f-14 " onClick={self.collectHandle.bind(null,item.recipe,+item.isCollect,item)}>
                            <span className={"_icon "+_heart} style={{position:'relative',top:'1px'}}></span>
                            <span className="_top-1"> {item.collectTime}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      );
  }
});

module.exports = Index;
