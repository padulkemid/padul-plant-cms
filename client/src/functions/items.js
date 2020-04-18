const url = 'https://paduljualan.herokuapp.com';
const products = () => {
  const productsUrl = `${url}/items`;
  return fetch(productsUrl, {
    method: 'get',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

const newProduct = (data) => {
  const newProdUrl = `${url}/items`;
  return fetch(newProdUrl, {
    method: 'post',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const editProduct = (data, id) => {
  const editUrl = `${url}/items/${id}`;
  return fetch(editUrl, {
    method: 'put',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const deleteProduct = (id) => {
  const deleteUrl = `${url}/items/${id}`;
  return fetch(deleteUrl, {
    method: 'delete',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export { products, newProduct, editProduct, deleteProduct };
