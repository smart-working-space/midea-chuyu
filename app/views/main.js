import "../css/index.less";
import "../css/sui.css";
var Main = React.createClass({
    render: function () {
        return (
            <div className="whole-page main">
                <LoadingModel type={'none'} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = Main;
