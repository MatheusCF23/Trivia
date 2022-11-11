import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions } = this.props;
    const acertos = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        {
          assertions < acertos ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1>
        }
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  assertions: stateGlobal.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
