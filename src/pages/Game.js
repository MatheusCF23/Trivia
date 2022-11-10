import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <div>
        <Header />
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
