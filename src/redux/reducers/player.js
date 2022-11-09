import { ADD_PLAYER, UPDATE_TOKEN } from '../action';

const INITTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
    };
  case UPDATE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default player;
