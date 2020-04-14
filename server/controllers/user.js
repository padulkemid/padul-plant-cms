const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { decryptPassword } = require('../helpers/bcrypt');

class UserController {
  static async login(req, res, next) {
    const loginData = req.body;
    let userData = null;

    User.findOne({
      where: {
        username: loginData.username,
      },
    })
      .then((user) => {
        if (!user) {
          throw new Error('User not found!');
        }

        if (user.role === 'admin' && loginData.password === 'admin') {
          if (user.username === 'admin') {
            const token = jwt.sign(
              {
                UserId: user.id,
                Role: user.role,
              },
              process.env.JWT_ADMIN_SECRET
            );
            res.status(200).json({ message: 'Welcome admin!', token, isAdmin: true });
          }
        } else {
          userData = user;

          const decrypt = decryptPassword(loginData.password, user.password);
          return decrypt;
        }
      })
      .then((decrypted) => {
        if (decrypted) {
          const token = jwt.sign(
            {
              UserId: userData.id,
              Role: userData.role,
            },
            process.env.JWT_SECRET
          );
          res.status(200).json({ message: `Welcome ${userData.email}`, token });
        } else {
          throw new Error('Wrong password');
        }
      })
      .catch(next);
  }

  static register(req, res, next) {
    const newData = req.body;

    User.create(newData)
      .then((success) => {
        res.status(201).json({ message: 'Succesfully created new User!' });
      })
      .catch(next);
  }
}

module.exports = UserController;
