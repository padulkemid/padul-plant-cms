const request = require('supertest');
const app = require('../app_test');

function login() {
  describe('admin login', () => {
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
            username: 'admin',
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

    // not an admin
    describe('normal login', () => {
      it('should throw an error because user is not an admin', (done) => {
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
            expect(body).not.toHaveProperty('isAdmin');
            expect(body).toHaveProperty('message');
            done();
          })
          .catch(done);
      });
    });
  });
}

module.exports = login;
