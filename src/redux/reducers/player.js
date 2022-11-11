import { ADD_PLAYER, ADD_ASSERTIONS } from '../action';

const INITTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
};

const player = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.player.name,
      score: 0,
      email: action.player.email,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };

  default:
    return state;
  }
};

export default player;
