const request = require('supertest');
const app = require('../app_test');
const { User } = require('../models');

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

  describe('user and admin login', () => {
    // admin login res
    describe('admin login', () => {
      it('should send an token object with status code 200, representing admin message', (done) => {
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
    describe('user login', () => {
      it('should send an token object with status code 200, representing success message', (done) => {
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
    describe('normal login', () => {
      it('should throw an error because username is not found', (done) => {
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
    describe('normal login', () => {
      it('should throw an error because password is wrong', (done) => {
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

  describe('register new user', () => {
    // add new user
    describe('add new user', () => {
      it('should add new user in database and send status of 201 also a success message', (done) => {
        request(app)
          .post('/register')
          .send(correctForm)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).not.toHaveProperty('token');
            done();
          })
          .catch(done);
      });
    });

    // bad request on register
    describe('add new user but bad form request', () => {
      it('should not add new user and send error', (done) => {
        request(app)
          .post('/register')
          .send({
            email: '',
            password: '1',
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
            expect(body).not.toHaveProperty('token');
            expect(body).not.toHaveProperty('success');
            done();
          })
          .catch(done);
      });
    });
  });
}

module.exports = login;
