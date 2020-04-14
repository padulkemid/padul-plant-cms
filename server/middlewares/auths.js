const jwt = require('jsonwebtoken');
const { Product } = require('../models');

function authentication(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Token not found // Not an admin!');
    } else {
      req.UserId = decoded.UserId;
      req.Role = decoded.Role;
      next();
    }
  });
}

function authorization(req, res, next) {
  const { Role } = req;
  const { id } = req.params;

  if (Role === 'admin') {
    Product.findOne({
      where: {
        id,
      },
    })
      .then((product) => {
        if (!product) {
          throw new Error(`Data with id ${id}, not found!`);
        } else {
          next();
        }
      })
      .catch(next);
  } else {
    throw new Error(`You're not an Admin!`);
  }
}

module.exports = {
  authentication,
  authorization,
};
