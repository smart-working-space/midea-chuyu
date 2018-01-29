var DevType = window.localStorage.getItem("DevType"); //设备类型型号
/*时分倒计时组件*/
var CountDown = React.createClass({
    getInitialState: function() {
        return {
            timer: null,
            hours: 0,
            minutes:0,
            seconds: 0
        };
    },
    countDown: function(nextprops){
        var self = this,
            // endTime = moment(this.props.data.endTime),
            // startTime = (this.props.data.startTime && moment(this.props.data.startTime)) || moment(),
            propsHours = parseInt(nextprops.cur_hours),
            propsMinute = parseInt(nextprops.cur_minute),
            propsSeconds = parseInt(nextprops.cur_seconds),
            curAllSeconds = propsHours*60*60+propsMinute*60+propsSeconds,
            diff = curAllSeconds,
            minute = 60,
            hour = 60 * minute;

        clearInterval(this.state.timer);
        this.setState({
            timer: setInterval(function() {
                diff--;
                if(DevType=='B0'||DevType=='b0'){
                   var hours = Math.floor( diff/hour ),
                    minutes = Math.floor( diff / minute),
                    seconds = diff - minutes * minute;
                }else{
                   var hours = Math.floor( diff/hour ),
                    minutes = Math.floor( (diff-hour*hours) / minute),
                    seconds = diff - hour*hours - minutes * minute;
                }

                if (diff < 0) {
                    clearInterval(self.state.timer);
                } else {

                    hours = hours < 10 ? "0" + hours : hours;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    self.setState({
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    });
                }

            }, 1000)
        });
    },
    componentDidMount: function() {
      console.log(this.props,'props');
      this.changeInitialState(this.props);
    },
    componentWillReceiveProps: function(nextprops){
      console.log(nextprops,'nextprops666');
      this.changeInitialState(nextprops);
    },
    changeInitialState(nextprops){

       let hours = parseInt(nextprops.cur_hours),
          minutes = parseInt(nextprops.cur_minute),
          seconds = parseInt(nextprops.cur_seconds);
           if(DevType=='B2'||DevType=='b2'){
            if(minutes>60){
              hours = Math.floor(minutes/60);
              minutes = minutes%60;
            }
          }
          hours = hours < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
        //console.log("hours:"+hours+"  minutes:"+minutes+" seconds:"+seconds);
        //alert("hours:"+hours+"  minutes:"+minutes+" seconds:"+seconds);


      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      })
      this.doInitialState(nextprops);
    },
    doInitialState(nextprops){
      if(nextprops.ctrl_stop){
        clearInterval(this.state.timer);
        return;
      }else{

        this.countDown(nextprops);
      }
    },
    componentWillUnmount: function() {
        clearInterval(this.state.timer);
    },
    // render: function() {
    //     var Content = this.props.component;
    //     return (
    //         <Content isworking={this.props.isworking || false } hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds}/>
    //
    //
    //     );
    // }

    render: function(){
        // var timeTitle = '离截至时间：';
        // if(this.props.isworking){
        //     timeTitle = '距离结束时间：';
        // }
        let hours = this.state.hours, minutes = this.state.minutes, seconds = this.state.seconds;
        //console.log(minutes);
        let _time_section = '';
        if(parseInt(hours) === 0 && parseInt(minutes) === 0 && parseInt(seconds) === 0){
            return (
                <span className="f-20 color-white">

                </span>
            );
        } else{
          if(parseInt(minutes)==0){
            minutes = '00';
          }
          if(parseInt(seconds)==0){
            seconds = '00';
          }

          if(DevType=='B0'||DevType=='b0'){
            _time_section = (
              <span className="f-20 color-white">
                {minutes + ":" + seconds}
              </span>
            )
          }else{
            if(parseInt(hours)>=1){
              _time_section = (
                <span className="f-20 color-white">
                  {hours + ":" + minutes}
                </span>
              )
            }else{
              if(parseInt(minutes)<3){
                _time_section = (
                  <span className="f-20 color-white">
                    {minutes + ":" + seconds}
                  </span>
                )
              }else{
                _time_section = (
                  <span className="f-20 color-white">
                    {hours + ':' + minutes}
                  </span>
                )
              }
            }
          }

          return _time_section;
        }

      }
});

module.exports = CountDown;
