const request = require('supertest');
const app = require('../app_test');
const { Product } = require('../models');

const correctForm = {
  name: 'Anggrek',
  image_url: 'https://cf.shopee.co.id/file/b40b6522ca7fc60117b0b45ec8ee8b31',
  price: 83000,
  stock: 20,
};

function product() {
  beforeAll((done) => {
    Product.create(correctForm)
      .then(() => done())
      .catch((e) => done(e));
  });

  // get product list
  describe('products route', () => {
    // get items with authentication
    describe('get all products', () => {
      it('should receive a list of products within array of objects', (done) => {
        request(app)
          .get('/items')
          .set('token', global.token)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty('products');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });

    // post new product with authentication
    describe('post new product', () => {
      it('should receive a status of 201 and have a success message and created data', (done) => {
        request(app)
          .post('/items')
          .set('token', global.token)
          .set('Content-Type', 'application/json')
          .send(correctForm)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty('created');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });

    // get list by id
    describe('get product by id', () => {
      it('should receive a status of 200 and have a 1 product data and a success message', (done) => {
        request(app)
          .get('/items/1')
          .set('token', global.token)
          .set('Content-Type', 'application/json')
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty('product');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });
  });
}

module.exports = product;
