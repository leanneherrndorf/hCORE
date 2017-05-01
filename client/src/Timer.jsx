import React, {Component} from 'react';
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {currentCount: 30}
  }

  options = {
    duration: 25000,
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
    margin: 'auto'
  };

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if (this.props.posts.length === 0 && this.state.currentCount > 1){
      return;
    } else if(this.state.currentCount < 1 || this.props.posts.length > this.props.posts[0].maxHealth) {
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
    return (
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
