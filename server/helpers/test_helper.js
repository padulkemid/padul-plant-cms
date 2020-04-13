const { User } = require('../models');

function createOneUser() {
  return User.create({
    username: 'padoel',
    password: 'jancok123',
  })
    .then((success) => {
      console.log(success);
    })
    .catch(console.log);
}

module.exports = createOneUser;
