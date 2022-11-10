import { ADD_PLAYER } from '../action';

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

  default:
    return state;
  }
};

export default player;
