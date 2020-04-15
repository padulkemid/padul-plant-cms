const login = (data) => {
  const loginUrl = 'https://paduljualan.herokuapp.com/login';

  return fetch(loginUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export { login };
