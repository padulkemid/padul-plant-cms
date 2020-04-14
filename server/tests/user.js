const request = require('supertest');
const app = require('../app_test');
const { User, sequelize } = require('../models');

const { queryInterface } = sequelize;

const correctForm = {
  email: 'padoel@cenah.com',
  username: 'padoel',
  password: 'jancok123',
  role: 'user',
};

function login() {
  beforeAll((done) => {
    User.create(correctForm)
      .then(() => done())
      .catch((e) => done(e));
  });

  describe('user and admin login', function () {
    // admin login res
    describe('admin login', function () {
      it('should send an token object with status code 200, representing admin message', function (done) {
        request(app)
          .post('/login')
          .send({
            username: 'admin',
            password: 'admin',
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty('token');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('isAdmin');
            global.token = body.token;
            done();
          })
          .catch(done);
      });
    });

    // user login res
    describe('user login', function () {
      it('should send an token object with status code 200, representing success message', function (done) {
        request(app)
          .post('/login')
          .send(correctForm)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty('token');
            expect(body).toHaveProperty('message');
            expect(body).not.toHaveProperty('isAdmin');
            done();
          })
          .catch(done);
      });
    });

    // errors
    // wrong username
    describe('normal login', function () {
      it('should throw an error because username is not found', function (done) {
        request(app)
          .post('/login')
          .send({
            username: 'aldalsdhalskdajsd',
            password: 'asdasd',
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(404);
            expect(body).not.toHaveProperty('token');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });

    // wrong password
    describe('normal login', function () {
      it('should throw an error because password is wrong', function (done) {
        request(app)
          .post('/login')
          .send({
            username: 'padoel',
            password: 'asdasdasd',
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(404);
            expect(body).not.toHaveProperty('token');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });
  });
}

module.exports = login;
