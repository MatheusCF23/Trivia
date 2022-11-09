export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});
