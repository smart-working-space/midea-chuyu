import { hashHistory } from 'react-router';
import { Icon,NavBar,SearchBar } from 'antd-mobile';

var Index = React.createClass({
  getInitialState: function () {
    return {
      _val:''
    }
  },
  return(){
    hashHistory.goBack();
  },
  linkTo(){
    let which_link = this.props.navRight.link;
    if(which_link=="javascript_click"){
      if(this.props.navRightClickCallBack){
        this.props.navRightClickCallBack();
      }
      return;
    }
    if(this.props.urlParams){
      hashHistory.push('/'+which_link+"?recipeId="+this.props.urlParams);
      return;
    }
    hashHistory.push('/'+which_link);
  },
  searchChange(value){
    this.setState({
      _val: value
    })
    if(this.props.searchChangeCallBack){
      this.props.searchChangeCallBack(value);
    }
  },

  render: function () {

      let nav_left_dom = "", nav_right_dom = "",title_dom = "";
      if(this.props.navLeft.icon){
        nav_left_dom = <Icon type="left" color='#fff' size='md' />;
      }
      if(this.props.navRight.icon){
        nav_right_dom = <Icon type="search" color='#fff' />;
      }
      if(this.props.title=="searchBar"){
        title_dom = (
          <div className="nav-search">
            <SearchBar
              value={this.state._val}
              placeholder={this.props.placeholder}
              onChange={this.searchChange}
              onSubmit={(value) => { this.props.onInputSubmit(value); }}
              onFocus={() => { console.log('onFocus'); }}
              onBlur={() => { console.log('onBlur'); }}
            />
          </div>
        )
      }else{
        title_dom = (
          <div className="f-18 color-white" style={{fontWeight:'bold',position:'relative',top:'-4px'}}>{this.props.title}</div>
        )
      }


      return (
          <header className="">

            <NavBar
             className="navbar_bg"
             mode="dark"
             leftContent={<span style={{display:'inline-block',width:'50px'}} onClick={this.return}>{nav_left_dom}</span>}
             rightContent={<span style={{display:'inline-block',width:'27px'}}  onClick={this.linkTo}>{nav_right_dom}</span>}
           >{title_dom}</NavBar>
          </header>
        );
    }
});

module.exports = Index;
