import React, {Component} from 'react';
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;


class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentCount: 30,
      text: ''
    }
  }

  // annoyingPrompt() {
  //   let counter = this.state.currentCount;
  //   if (counter <= 30) {
  //     this.setState({text: 'Start'});
  //   } else if (counter <= 20) {
  //     this.setState({text: 'Almost there...'});
  //   } else if (counter <= 10) {
  //     this.setState({text: 'Just a little longer...'});
  //   } else if (counter <= 5 && counter >= 2) {
  //     this.setState({text: 'Ready?'});
  //   } else {
  //     this.setState({text: 'Go!'});
  //   }
  // }

  options = {
    duration: 4400,
    strokeWidth: 4,
    color: '#734B76',
    trailColor: '#E9EDF6',
    trailWidth: 1,
    svgStyle: null
  }

  containerStyle = {
    width: '20%',
    height: '20%',
    margin: 'auto'
  };

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) {
      this.props.checkTimer();
      clearInterval(this.intervalId);
    }
  }
  
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
    return(
      <div>
        <Circle
          progress={1}
          text={this.state.currentCount}
          options={this.options}
          initialAnimate={true}
          containerStyle={this.containerStyle}
          containerClassName={'.progressbar'} 
        />
      </div>
    );
  }
}

module.exports = Timer;
