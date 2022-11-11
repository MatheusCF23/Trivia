import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
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
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  assertions: stateGlobal.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
