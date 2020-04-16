const products = () => {
  const productsUrl = 'https://paduljualan.herokuapp.com/items';

  return fetch(productsUrl, {
    method: 'get',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export { products };
