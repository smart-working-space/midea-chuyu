import {Modal, Button} from 'antd-mobile';
const alert = Modal.alert;

module.exports = React.createClass({

	getDefaultProps: function () {
		return {
			multiple: true,
			className: 'upload-button'
		}
	},

	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		multiple: React.PropTypes.bool,
		btnValue: React.PropTypes.string
	},

	getInitialState: function () {
		return {
			android_upload_btn: false,
			visible: false,
			recordData: {
				_type: '',
				icon: '',
				hasRemove: true,
				btnText: '',
				title: '',
				content: ''
			}
		};
	},
	componentDidMount: function () {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid){
			this.setState({
				android_upload_btn: true
			})
		}
	},

	_onChange: function (event) {
		console.log('upload');
		let self = this;
		event.preventDefault();
		var target = event.target;
		var files = target.files;
		var count = this.props.multiple ? files.length : 1;
		var i;
		for (i = 0; i < count; i++) {
			files[i].thumb = URL.createObjectURL(files[i])
		}
		// convert to array
		files = Array.prototype.slice.call(files, 0);
		files = files.filter(function (file) {
			return /image/i.test(file.type)
		})
    var reader = new FileReader();
		console.log("files:"+JSON.stringify(files));
		//alert("files_111:"+JSON.stringify(files));
    reader.readAsDataURL(files[0]);
    reader.onload = function(){
         //img.src = this.result;
				 self.props.onChange(this.result);
     }
	},

	uploadFun(){
		this.setState({
			 visible: true,
			 recordData: {
				 warnIcon: "",
				 icon: "",
				 hasRemove: false,
				 btnText: LanguagePack.sure,
				 title: LanguagePack.Tips,
				 content: LanguagePack.androidTip
			 }
		 })
	},
	sure(){
		this.setState({
			visible: false
		})
	},

	render: function () {
		var className = this.props.className;
		//console.log(this.state.android_upload_btn);
		let _node = (
			<div className="">
				<div className="upload-button">
					<input
						type="file"
						className="upload_input"
						name="fil4e"
						id="fil4e"
						accept="image/*;capture=camera"
						multiple={this.props.multiple}
						ref="fileInput"
						onChange={this._onChange}
						/>
				</div>
			</div>
		)
		if(this.state.android_upload_btn){
			_node = (
				<div className="upload-button" onClick={this.uploadFun}>	</div>
			)
		}
		return (
			<div>
				{_node}
				<Modal title="" animated={false} transparent  visible={this.state.visible}>
					<div className="">
						<div>{this.state.recordData.icon?<img className="showbox_icon" width="120" src={this.state.recordData.icon} />:null}</div>
						<div>
							<div className="showbox_title">
								{this.state.recordData.warnIcon?<img className="warn_showbox_icon" src={this.state.recordData.warnIcon} />:null}
								{this.state.recordData.title}
							</div>
							<div className="showbox_content">{this.state.recordData.content}</div>
						</div>
						<div>
		           <div className="showbox_btn finish_btn" onClick={this.sure}>{this.state.recordData.btnText}</div>
		        </div>
					</div>
				</Modal>
			</div>
		);
	}

})
