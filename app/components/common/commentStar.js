import { Icon } from 'antd-mobile';
var Index = React.createClass({
  componentDidMount: function () {

  },
  starChange(item){
    if(this.props.onStarChange){
      this.props.onStarChange(item+1);
    }else{
      return;
    }
  },
  render: function () {
    let self = this;
    let _point = this.props.point; //组价传入评分
    let fontSize = this.props.fontSize, _size = "";
    let mR = this.props.mR, _mr = "";
    if(fontSize){
      _size = "f-"+fontSize;
    }
    if(mR){
      _mr = "mr-"+mR;
    }
    return(
      <span className="ml-5">
        {
          [0,1,2,3,4].map((_item,_key)=>{
              let star_full = 'staro', col_style = "";
              if(_point>_item){
                col_style = "color-blue";
                star_full = "star";
              }else{
                col_style = "";
                star_full = 'staro';
              }
              return(
                <span className={"_icon star-icon-f12 "+star_full+" "+_size+" "+_mr} onClick={self.starChange.bind(null,_item)}></span>
              )
            })
        }
      </span>
    )
  }
});

module.exports = Index;
