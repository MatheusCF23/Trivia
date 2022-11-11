import { requestQuestionApi } from '../../service/Api';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsError = (error) => ({
  type: REQUEST_QUESTIONS_ERROR,
  error,
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
