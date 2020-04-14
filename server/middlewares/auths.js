const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      throw new Error('Token not found!');
    } else {
      (req.UserId = decoded.UserId), (req.Role = decoded.Role);
      next();
    }
  });
}

function authorization(req, res, next) {
  //
}

module.exports = {
  authentication,
  authorization,
};
