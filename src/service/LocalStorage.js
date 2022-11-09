export const saveLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify({
    ranking: [
      { name: '', score: 0, picture: '' },
    ],
    token,
  }));
};

export const getLocalStorage = () => {
  const storage = JSON.parse(localStorage.getItem('token'));
  return storage;
};
