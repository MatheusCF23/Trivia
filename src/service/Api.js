const reqApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export const requestQuestionApi = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export default reqApi;
