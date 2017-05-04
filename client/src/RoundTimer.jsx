import React, {Component} from 'react';
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;

class RoundTimer extends Component {
  constructor(props){
    super(props);
    this.state = {currentCount: 20}
  }

  options = {
    duration: 20000,
    easing: 'easeOut',
    strokeWidth: 4,
    color: '#734B76',
    trailColor: '#E9EDF6',
    trailWidth: 1,
    svgStyle: null
  }

  containerStyle = {
    width: '20%',
    height: '20%',
    margin: 'auto',
    marginTop: '80px',
  };
  
  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) {
      this.props.checkRoundTimer();
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
    return (
      <Circle
        progress={1}
        text={this.state.currentCount}
        options={this.options}
        initialAnimate={true}
        containerStyle={this.containerStyle}
        containerClassName={'.progressbar'} 
      />
    );
  }
}

module.exports = RoundTimer;