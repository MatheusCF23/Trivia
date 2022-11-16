export const getLocalStorage = (param) => {
  const tokenLocalStorage = localStorage.getItem(param);
  return tokenLocalStorage;
};

export const saveRankingLocalStorage = (param) => {
  localStorage.setItem('ranking', JSON.stringify(param));
};

export const removeLocalStorage = (param) => {
  localStorage.removeItem(param);
};
