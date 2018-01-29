import { Flex,Toast,NoticeBar } from 'antd-mobile';
import "./crossScreen.less";
import StatusNavBottom from "../../components/common/StatusNavBottom";

var swipeIndex = 0;
const recieveVoiceArr = [
  {"index":0,"dec":"下一页","dec2":'下一步'},
  {"index":1,"dec":"第一页","dec2":'第一步'},
  {"index":2,"dec":"第二页","dec2":'第二步'},
  {"index":3,"dec":"第三页","dec2":'第三步'},
  {"index":4,"dec":"第四页","dec2":'第四步'},
  {"index":5,"dec":"第五页","dec2":'第五步'},
  {"index":6,"dec":"第六页","dec2":'第六步'},
  {"index":7,"dec":"第七页","dec2":'第七步'},
  {"index":8,"dec":"第八页","dec2":'第八步'},
  {"index":9,"dec":"第九页","dec2":'第九步'},
  {"index":10,"dec":"第十页","dec2":'第十步'},
  {"index":11,"dec":"第十一页","dec2":'第十一步'},
  {"index":12,"dec":"第十二页","dec2":'第十二步'},
  {"index":13,"dec":"第十三页","dec2":'第十三步'},
  {"index":14,"dec":"第十四页","dec2":'第十四步'},
  {"index":15,"dec":"第十五页","dec2":'第十五步'},
  {"index":16,"dec":"第十六页","dec2":'第十六步'},
  {"index":17,"dec":"第十七页","dec2":'第十七步'},
  {"index":18,"dec":"第十八页","dec2":'第十八步'},
  {"index":19,"dec":"上一页","dec2":'上一步'},
];

var Index = React.createClass({
  getInitialState: function () {
    return {
      devType: '',
      detailSource: {},
      _cheight: '',
      _cwidth:'',
      nutrition: [ //营养对应表
         {"En_word":"Energy", "Ch_word":LanguagePack.energy, "dist": "kcal"},		//能量/kcal
         {"En_word":"Protein", "Ch_word":LanguagePack.protein, "dist": "g"},   //蛋白质/g
         {"En_word":"Fat", "Ch_word":LanguagePack.fat, "dist": "g"},   //脂肪/g
         {"En_word":"Carbohydrate", "Ch_word":LanguagePack.carbohydrate, "dist": "g"},   //碳水化合物/g
         {"En_word":"Tdf", "Ch_word":LanguagePack.fiber, "dist": "g"},   //膳食纤维/g
         {"En_word":"VitaminA", "Ch_word":LanguagePack.VitaminA, "dist": "μg"},   //维生素A/μg
         {"En_word":"VitaminB1", "Ch_word":LanguagePack.VitaminB1, "dist": "mg"},   //维生素B1/mg
         {"En_word":"VitaminB2", "Ch_word":LanguagePack.VitaminB2, "dist": "mg"},   //维生素B2/mg
         {"En_word":"VitaminC", "Ch_word":LanguagePack.VitaminC, "dist": "mg"},   //维生素C/mg
         {"En_word":"VitaminE", "Ch_word":LanguagePack.VitaminE, "dist": "mg"},   //维生素E/mg
         {"En_word":"Na", "Ch_word":LanguagePack.Na, "dist": "mg"},   //钠/mg
         {"En_word":"K", "Ch_word":LanguagePack.K, "dist": "mg"},   //钾/mg
         {"En_word":"Ca", "Ch_word":LanguagePack.Ca, "dist": "mg"},   //钙/mg
         {"En_word":"Fe", "Ch_word":LanguagePack.Fe, "dist": "mg"},   //铁/mg
         {"En_word":"Zn", "Ch_word":LanguagePack.Zn, "dist": "mg"}   //锌/mg
      ],
    };
  },
  componentDidMount: function () {
    let self = this;
    let _cwidth = document.body.clientWidth ,
        _cheight = document.body.clientHeight ;
    console.log(_cwidth,_cheight);
    $('.cross-section').width(_cheight);
    $('.cross-section').height(_cwidth);
    $('.cross-section').css({marginLeft:-(_cheight/2)});
    $('.cross-section').css({marginTop:-(_cwidth/2)});
    this.setState({
      _cheight: _cheight,
      _cwidth: _cwidth,
      devType: this.props.devType,
      detailSource: this.props.detailSource
    })

    bridge.getEnableVoice(function(callback){//进来页面判断语音模式
      console.log("getEnableVoice:",JSON.stringify(callback));
      if(callback[0]=='no'){
        bridge.setEnableVoice("yes",function(_callback){console.log("setEnableVoice",_callback)});
      }
    })

  },
  componentWillReceiveProps(nextprops){
    this.setState({
      devType: nextprops.devType,
      detailSource: nextprops.detailSource,
    })
  },
  componentDidUpdate(){
    let self = this;
     window.mySwiper = new Swiper('.swiper-cross', {
      loop: false,
      autoplay : false,
      direction : 'horizontal',
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      // 如果需要分页器
      pagination: '.swiper-pagination',
      onSlideChangeStart: function(swiper){
        swipeIndex = swiper.activeIndex;
        console.log(swipeIndex);
      }
    })
    // $('.detail-list').click(function(){
    //   mySwiper.slideTo(2, 1000, false);//切换到第一个slide，速度为1秒
    // })

    window.recieveVoiceMessage = function(message){
      console.log("recieveVoiceMessage",message,typeof message);
      message = JSON.parse(message);
      recieveVoiceArr.forEach((item,key)=>{
        if((item.dec===message.text)||(item.dec2===message.text)){
          if(message.text==='上一页'||message.text==='上一步'){
            swipeIndex--;
          }
          else if(message.text==='下一页'||message.text==='下一步'){
            swipeIndex++
          }else{
            swipeIndex = item.index-1;
          }
          if(swipeIndex>=0){
            mySwiper.slideTo(swipeIndex, 500, false);
          }
          console.log(swipeIndex,9999);
        }
      })
    }
  },
  //营养块
  nutritionFn(nutrition,state_nutrition){
    let _arr = [],Energy = '';
    for(var index in nutrition){
      for(var _index in state_nutrition){
        if( index==state_nutrition[_index].En_word ){
          if(state_nutrition[_index].En_word=='Energy'){
            Energy = nutrition[index];
            break;
          }
          if(+nutrition[index]>0){
            _arr.push({
              "Ch_word": state_nutrition[_index].Ch_word,
              "value": nutrition[index],
              "dist": state_nutrition[_index].dist
            });
          }
        }
      }
    }

   let _node = _arr.map((item,key)=>{
     if(key<10){
       return(
         <Flex key={key}>
           <Flex.Item>
             <span className="f-14 color-light-bold">{item.Ch_word}</span>
           </Flex.Item>
           <Flex.Item>
             <span className="f-14 color-light-bold">{item.value}{item.dist}</span>
           </Flex.Item>
         </Flex>
       )
     }

    })
    if(nutrition){
      return (
          <div className="">
            <div className="fl" style={{width:'50%',position:'relative',padding:'15px'}}>
              <div className="d-title mb-8">{LanguagePack.mainNutrient}</div>
              {_node}
            </div>
            <div className="fl" style={{width:'50%',position:'relative',padding:'15px'}}>
              <div className="d-title mb-8">{LanguagePack.energyComponent}
               <span className="f-14 color-light-bold">  ({Energy}kcal) </span>
              </div>
            </div>
          </div>
      );
    }
  },
  _returnDetail(){
    bridge.getEnableVoice(function(callback){//进来页面判断语音模式
      console.log("getEnableVoice111:",callback);
      if(callback[0]=='yes'){
        bridge.setEnableVoice("no",function(_callback){"setEnableVoice",console.log(_callback);});
      }
    })
    if(this.props.returnDetail){
      this.props.returnDetail(true);
    }
  },

  render: function () {
    let self = this;
    let state_nutrition = this.state.nutrition;
    let detailSource = this.state.detailSource,
        effect = detailSource.effect||[],
        mainingredients = detailSource.mainingredients||[],
        ingredients = detailSource.ingredients||[], steps = detailSource.steps||[],
        nutrition = detailSource.nutrition||{};
    let _step_length = steps.length;
    //设备
    let  devicetypes = detailSource.devicetypes;
    let devicetypes_dec = SwitchDec.switchDevicetypes(+devicetypes);
    let buy_arr = []; //购买菜单
    if(JSON.stringify(detailSource) == "{}"){
      return(
          <div className="cross-section">loading...</div>
        )
    }

    return (
          <div className="cross-section">
            <NoticeBar  mode="closable">支持语音翻页哦</NoticeBar>
            <div className="return_detail_btn" onClick={this._returnDetail}>X</div>
            <div className="swiper-container swiper-cross">
             <div className="swiper-wrapper">
               <div className="swiper-slide swiper-no-swiping">
                <div className="detail-list">
                  <div className="clearfix">
                    <div className="fl" style={{width:'50%',padding:'10px'}}>
                      <img src={detailSource.picurl} width='100%' />
                    </div>
                    <div className="fl" style={{width:'50%'}}>
                      <div className="detail-list">
                          <Flex>
                            <Flex.Item>
                              <CommentStar point={+detailSource.point} />
                              <span className="f-16"> {detailSource.pointCount}{LanguagePack.item}</span>
                            </Flex.Item>
                            <Flex.Item>
                              <span className="f-16">{detailSource.finishCount}{LanguagePack.PeopleDoNumber}</span>
                            </Flex.Item>
                          </Flex>
                          <div className="mt-15 f-16">{detailSource.desc}</div>

                      </div>
                   </div>
                  </div>
                </div>
                </div>
                <div className="swiper-slide swiper-no-swiping">
                  <div className="detail-list" style={{padding:'5px 25px'}}>
                    <div className="clearfix">
                      {
                        this.nutritionFn(nutrition,state_nutrition)
                      }
                    </div>
                  </div>
                </div>
                <div className="swiper-slide swiper-no-swiping">
                  <div className="detail-list">
                    <div className="clearfix">
                    <div className="mt-10 mb-10">
                      {/*
                        <Flex
                           justify="center"
                         >
                           <span className="main_dec"><Icon type="minuscircle" /></span>
                           <span className="main_word">{detailSource.weight} <span className="f-16">人份</span></span>
                           <span className="main_dec"><Icon type="pluscircle" /></span>
                        </Flex>
                      */}
                    </div>
                    <div className="mb-20">
                        <div className="d-title">{LanguagePack.mainingredients}</div>
                        <div className="detail-dec-section no-border">
                        {
                          mainingredients.map((_item,_key)=>{
                            _item = _item||{};
                            let _shoppin_elm = '';
                            if(_item.buyUrl){
                              _shoppin_elm = (
                                <span className='f-16 ml-10' key={_key}><Icon type="shoppingcart" /></span>
                              );
                              buy_arr.push(_item);
                            }
                            return(
                                <div className="detail-dec-list f-14" key={_key}>
                                  {_item.name} <span className=""> ({_item.weight})</span>
                                  {_shoppin_elm}
                                </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    </div>
                    <div className="swiper-slide swiper-no-swiping">
                        <div className="d-title">{LanguagePack.ingredients}</div>
                        <div className="detail-dec-section no-border">
                        {
                          ingredients.map((_item,_key)=>{
                            _item = _item||{};
                            let _shoppin_elm = '';
                            if(_item.buyUrl){
                              _shoppin_elm = (
                                <span className='f-14 ml-10' key={_key}><Icon type="shoppingcart" /></span>
                              );
                              buy_arr.push(_item);
                            }
                            return(
                                <div className="detail-dec-list f-14" key={_key} style={{width:'30%'}}>
                                  {_item.name} <span className=""> ({_item.weight})</span>
                                  {_shoppin_elm}
                                </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    {/*<div style={{width: '100%',textAlign: 'center',marginTop:'20px'}}>
                      <div className="md-btn col_light buy_section" onClick={this.buyLink.bind(null,buy_arr)}>食材购买<span className="buy_icon"></span></div>
                    </div>*/}

                  </div>
                </div>
                {
                  steps.map((_item,_key)=>{
                    //是否有视频
                    let byte20 = _item.byte20||[];

                    let _step_icon_elm = "";
                    if(byte20.length>0){
                      _step_icon_elm = (
                        <span className="step_icon"></span>
                      )
                    }

                    let _step_url = PicTransformFun.picTransform(_item.url,"_h");//图片压缩
                     return (
                       <div className="swiper-slide swiper-no-swiping">
                         <div className="detail-list no-padding">
                           <div className="clearfix" style={{background:'#fff'}}>
                            <div className="fl"  style={{width:this.state._cheight/2,padding:'20px'}}>
                              <img src={_step_url} />
                            </div>
                            <div className="fl"  style={{width:this.state._cheight/2,padding:'20px'}}>
                              <div className="pd-15">
                                  <div className="d-title">{LanguagePack._step}  {_key+1}/{_step_length} {_step_icon_elm}</div>
                                  <div className="f-16 mt-5">{_item.desc}</div>
                                  {
                                    byte20.map((this_item,this_key)=>{
                                      let _devicetypes_dec = SwitchDec.switchDevicetypes(this_item.devicetype);
                                      let _cmd = this_item.cmd||[];
                                      return(
                                        <div className="mt-20" key={this_key}>

                                             <span>{devicetypes_dec}</span>
                                             {/*<span className="">{_devicetypes_dec}</span>*/}
                                             {_cmd[0].h>0?(<span><span className="bold-word">{_cmd[0].h}</span><span>{LanguagePack.hour}</span></span>):''}
                                             <span className="bold-word">{_cmd[0].m}</span>{LanguagePack.min}
                                             <span className="bold-word">{_cmd[0].s}</span>{LanguagePack.sec}

                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                           </div>

                       </div>
                     );
                  })}
               </div>
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev swiper-button-black _swiper_btn "></div>
              <div className="swiper-button-next swiper-button-black _swiper_btn "></div>
            {
              this.state.devType?(<StatusNavBottom detailSource={detailSource} page={'detail'} totalbytectrl={detailSource.totalbytectrl} devType={this.state.devType} />):null
            }

        </div>
      );
  }
});

module.exports = Index;
