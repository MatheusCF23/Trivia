import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getLocalStorage, saveRankingLocalStorage } from '../service/localStorage';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankingPlayers: [],
    };
  }

  componentDidMount() {
    this.saveDataPlayerRanking();
  }

  fetchImgPlayerGravatar = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const imgPlayerGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return imgPlayerGravatar;
  };

  saveDataPlayerRanking = () => {
    const { name, score } = this.props;
    const imgPlayer = this.fetchImgPlayerGravatar();
    const playerData = {
      imgPlayer,
      name,
      score,
    };

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      this.setState((prev) => ({
        rankingPlayers: [...prev.rankingPlayers, playerData],
      }), () => {
        const { rankingPlayers } = this.state;
        saveRankingLocalStorage(rankingPlayers);
      });
    } else {
      const ranking = getLocalStorage('ranking');
      this.setState({
        rankingPlayers: [...ranking, playerData],
      }, () => {
        const { rankingPlayers } = this.state;
        saveRankingLocalStorage(rankingPlayers);
      });
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  orderScorePlayers = (array) => {
    const arrayOrderScore = array.sort((a, b) => b.score - a.score);
    return arrayOrderScore;
  };

  render() {
    const { rankingPlayers } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
        <div>
          { this.orderScorePlayers(rankingPlayers).map((player, index) => (
            <div key={ index }>
              <img src={ player.imgPlayer } alt="icon-player" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  name: stateGlobal.player.name,
  score: stateGlobal.player.score,
  email: stateGlobal.player.email,
});

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
