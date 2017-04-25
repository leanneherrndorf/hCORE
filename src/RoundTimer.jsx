import React, {Component} from 'react';

class RoundTimer extends Component {
  constructor(props){
    super(props);
    this.state = {currentCount: 5}
  }
  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) {
      this.props.checkRoundTimer();
      this.props.determineScore();
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
      <div>{this.state.currentCount}</div>
    );
  }
}

module.exports = RoundTimer;