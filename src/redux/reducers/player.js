import { ADD_PLAYER } from '../action';

const INITTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default player;
