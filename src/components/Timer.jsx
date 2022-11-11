import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    const fivSeconds = 5000;
    setTimeout(() => {
      this.timerGame();
    }, fivSeconds);
  }

  timerGame = () => {
    const oneSecond = 1000;
    const countTimer = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }), () => this.verifyCount(countTimer));
    }, oneSecond);
  };

  verifyCount = (timer) => {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(timer);
    }
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>30 segundos para responder a pergunta:</p>
        <p>{count}</p>
      </div>
    );
  }
}

export default Timer;
