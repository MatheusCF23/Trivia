const reqApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(endpoint);
  const DATA = await request.json();
  return DATA;
};

export default reqApi;
