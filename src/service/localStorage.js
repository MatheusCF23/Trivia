export const removeLocalStorage = (param) => {
  localStorage.removeItem(param);
};

export const getLocalStorage = (param) => {
  const tokenLocalStorage = localStorage.getItem(param);
  return tokenLocalStorage;
};
