
var Index = React.createClass({
  componentDidMount: function () {

  },

  render: function () {
      return (
        <div className="model_alertloading _modelcase _position" style={{display:this.props.type}}>
            <div className="spinner spinner_model">
              <div className="spinner-container container1">
                <div className="circle1 _circle"></div>
                <div className="circle2 _circle"></div>
                <div className="circle3 _circle"></div>
                <div className="circle4 _circle"></div>
              </div>
              <div className="spinner-container container2">
                <div className="circle1 _circle"></div>
                <div className="circle2 _circle"></div>
                <div className="circle3 _circle"></div>
                <div className="circle4 _circle"></div>
              </div>
              <div className="spinner-container container3">
                <div className="circle1 _circle"></div>
                <div className="circle2 _circle"></div>
                <div className="circle3 _circle"></div>
                <div className="circle4 _circle"></div>
              </div>
            </div>
          </div>
      );
  }
});

module.exports = Index;
