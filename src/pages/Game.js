import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getLocalStorage, removeLocalStorage } from '../service/localStorage';
import { fetchApiQuestions } from '../redux/action';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      questions: [],
      indexQuestion: 0,
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const tokenUser = getLocalStorage('token');
    const resultApi = await dispatch(fetchApiQuestions(tokenUser));
    if (resultApi.results.length === 0) {
      removeLocalStorage();
      history.push('/');
    }
    this.setState({ isLoading: false, questions: resultApi.results });
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClickAnswer = () => {
    this.setState((prev) => ({ indexQuestion: prev.indexQuestion + 1 }));
  };

  handleSortAnswers = (array) => {
    const magicNumber = 0.5;
    return array.sort(() => Math.random() - magicNumber);
  };

  render() {
    const { isLoading, questions, indexQuestion } = this.state;
    if (isLoading) return (<p>Loading...</p>);

    const questCurrent = [questions[indexQuestion]];

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
          { questCurrent.map((quest, index) => {
            const answers = [quest.correct_answer, ...quest.incorrect_answers];
            const newAnswers = this.handleSortAnswers(answers);

            return (
              <div key={ index }>
                <p data-testid="question-category">{quest.category}</p>
                <p data-testid="question-text">{quest.question}</p>
                <div data-testid="answer-options">
                  { newAnswers.map((answer, idx) => (
                    <button
                      key={ idx }
                      data-testid={ answer === quest.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${idx}` }
                      type="button"
                      onClick={ this.handleClickAnswer }
                    >
                      {answer}
                    </button>
                  )) }
                </div>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
