import { TIMER_DESABLED_BUTTON } from '../action';

const INITTIAL_STATE = {
  disabledButtonAnswers: false,
  timer: 30,
};

const game = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_DESABLED_BUTTON:
    return {
      ...state,
      disabledButtonAnswers: true,
      timer: action.timer,
    };
  default:
    return state;
  }
};

export default game;
