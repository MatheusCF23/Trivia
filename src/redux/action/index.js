export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});
