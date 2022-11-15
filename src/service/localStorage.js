if (!JSON.parse(localStorage.getItem('ranking'))) {
  localStorage.setItem('ranking', JSON.stringify([]));
}

export const getLocalStorage = (param) => {
  const tokenLocalStorage = JSON.parse(localStorage.getItem(param));
  return tokenLocalStorage;
};

export const saveRankingLocalStorage = (param) => {
  localStorage.setItem('ranking', JSON.stringify(param));
};

export const addPlayerRanking = (param) => {
  if (param) {
    const rankinAnterior = getLocalStorage('ranking');
    console.log('ranking anterior', rankinAnterior);
    saveRankingLocalStorage([...rankinAnterior, param]);
  }
};

export const removeLocalStorage = (param) => {
  localStorage.removeItem(param);
};
