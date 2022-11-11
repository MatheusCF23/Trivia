import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { timerDesablesButton } from '../redux/action';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
  }

  // Esperando 5 segundos para INICIAR o timer na tela.
  componentDidMount() {
    const fivSeconds = 5000;
    setTimeout(() => {
      this.timerGame();
    }, fivSeconds);
  }

  // Função para fazer o decremento no estado local.
  timerGame = () => {
    const oneSecond = 1000;
    const countTimer = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }), () => this.verifyCount(countTimer));
    }, oneSecond);
  };

  // Verificando se o contador chegou a zero.
  verifyCount = (timer) => {
    const { count } = this.state;
    const { dispatch } = this.props;
    if (count === 0) {
      clearInterval(timer);
      dispatch(timerDesablesButton(count));
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

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
