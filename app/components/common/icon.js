
var Index = React.createClass({
  componentDidMount: function () {

  },
  render: function () {

    let _icon = this.props.type;
    return (
      <i className={"iconfont icon-"+_icon}></i>
    );
  }
});

module.exports = Index;
