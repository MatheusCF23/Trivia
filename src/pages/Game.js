import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getLocalStorage, removeLocalStorage, saveRankingLocalStorage } from '../service/localStorage';
import { fetchApiQuestions, countScore, addAssertions } from '../redux/action';
import '../style/Game.css';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      questions: [],
      indexQuestion: 0,
      btnNext: false,
      answered: false,
      sortedAnswers: [],
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const tokenUser = getLocalStorage('token');
    const resultApi = await dispatch(fetchApiQuestions(tokenUser));
    if (resultApi.results.length === 0) {
      removeLocalStorage('token');
      history.push('/');
    }

    this.setState({
      isLoading: false,
      questions: resultApi.results,
    }, () => {
      const { questions, indexQuestion } = this.state;
      const answers = [questions[indexQuestion].correct_answer,
        ...questions[indexQuestion].incorrect_answers];
      this.setState({ sortedAnswers: this.handleSortAnswers(answers) });
    });
    saveRankingLocalStorage([]);
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleCountDificult = (dificult) => {
    const one = 1;
    const two = 2;
    const three = 3;
    switch (dificult) {
    case 'easy':
      return one;
    case 'medium':
      return two;
    case 'hard':
      return three;
    default:
      return 0;
    }
  };

  handleClickAnswer = ({ target }) => {
    const { score, dispatch, timer } = this.props;
    const ten = 10;
    const { id } = target;
    const { questions, indexQuestion } = this.state;
    if (id === questions[indexQuestion].correct_answer) {
      const updatescore = score + ten
       + (timer * this.handleCountDificult(questions[indexQuestion].difficulty));
      dispatch(countScore(updatescore));
      dispatch(addAssertions());
    }
    this.setState({ btnNext: true, answered: true });
  };

  handleClickNext = () => {
    const { questions, indexQuestion } = this.state;
    const { history } = this.props;
    const four = 4;
    if (indexQuestion === four) {
      history.push('/feedback');
    }
    this.setState(
      (prev) => ({ indexQuestion: prev.indexQuestion + 1,
        btnNext: false,
        answered: false }),
      () => {
        const answer = [questions[indexQuestion + 1].correct_answer,
          ...questions[indexQuestion + 1].incorrect_answers];
        this.setState({ sortedAnswers: this.handleSortAnswers(answer) });
      },
    );
  };

  handleSortAnswers = (array) => {
    const magicNumber = 0.5;
    return array.sort(() => Math.random() - magicNumber);
  };

  handleClasses = (answer, correct) => {
    const { answered } = this.state;
    let classBtn = '';
    if (answered && answer === correct) {
      classBtn = 'correct_answer';
    } else if (answered && answer !== correct) {
      classBtn = 'wrong_answer';
    } else {
      classBtn = 'answer';
    }
    return classBtn;
  };

  render() {
    const { isLoading, questions, indexQuestion, btnNext, sortedAnswers } = this.state;
    const { disabledButtonAnswers } = this.props;

    if (isLoading) return (<p>Loading...</p>);
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
        <div>
          <div>
            <p data-testid="question-category">{questions[indexQuestion].category}</p>
            <p data-testid="question-text">{questions[indexQuestion].question}</p>
            <div data-testid="answer-options">
              { sortedAnswers.map((answer, idx) => (
                <button
                  id={ answer }
                  key={ idx }
                  data-testid={ answer === questions[indexQuestion].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${idx}` }
                  className={ this.handleClasses(
                    answer,
                    questions[indexQuestion].correct_answer,
                  ) }
                  type="button"
                  onClick={ this.handleClickAnswer }
                  disabled={ disabledButtonAnswers }
                >
                  {answer}
                </button>
              )) }
              { btnNext
                  && (
                    <button
                      data-testid="btn-next"
                      type="button"
                      onClick={ this.handleClickNext }
                    >
                      Next
                    </button>)}
              <Timer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  disabledButtonAnswers: stateGlobal.game.disabledButtonAnswers,
  score: stateGlobal.player.score,
  timer: stateGlobal.game.timer,
});

Game.propTypes = {
  disabledButtonAnswers: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
