const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserController {
  static async login(req, res, next) {
    const loginData = req.body;

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
          throw new Error('User is not an Admin!');
        }
      })
      .catch(next);
  }

  static register(req, res, next) {
    const newData = req.body;

    User.create(newData)
      .then((success) => {
        res.status(201).json({ message: 'Succesfully created new User!', success });
      })
      .catch(next);
  }

  static getUsers(req, res, next) {
    User.findAll()
      .then((users) => {
        res.status(200).json({ message: 'Successfully get all users!', users });
      })
      .catch(next);
  }
}

module.exports = UserController;
