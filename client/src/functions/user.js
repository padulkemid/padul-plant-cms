const users = () => {
  const usersUrl = 'https://paduljualan.herokuapp.com/users';
  return fetch(usersUrl, {
    method: 'get',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export { users };
