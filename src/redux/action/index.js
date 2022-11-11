import { requestQuestionApi } from '../../service/Api';

export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';
export const TIMER_DESABLED_BUTTON = 'TIMER_DESABLED_BUTTON';

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsError = (error) => ({
  type: REQUEST_QUESTIONS_ERROR,
  error,
});

export const timerDesablesButton = () => ({
  type: TIMER_DESABLED_BUTTON,
});

// <---------------- Thunk fecth API ---------------->
export function fetchApiQuestions(token) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const response = await requestQuestionApi(token);
      return response;
    } catch (error) {
      dispatch(requestQuestionsError(error));
    }
  };
}
