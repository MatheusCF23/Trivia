import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRancking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const acertos = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        {
          assertions < acertos ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1>
        }
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClickPlayAgain }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.handleClickRancking }
          >
            Ranking
          </button>
        </div>
        <h1>score</h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <p>Total de acertos</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  assertions: stateGlobal.player.assertions,
  score: stateGlobal.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
