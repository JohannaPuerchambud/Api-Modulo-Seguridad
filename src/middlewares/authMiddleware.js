const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const SECRET_KEY = "b1664565cdeb4f67e77ab0cafcb64d09b729639ae2c7e9c9ba315f956de78473";

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Could not validate credentials", headers: { "WWW-Authenticate": "Bearer" } });
  }

  try {
    jwt.verify(token, SECRET_KEY, async (err, user) => {
      if (err) return res.sendStatus(403);

      const cedula = user.sub;
      if (!cedula) {
        return res.status(401).json({ message: "Could not validate credentials", headers: { "WWW-Authenticate": "Bearer" } });
      }

      const foundUser = await User.getUserById(cedula);
      if (!foundUser) {
        return res.status(401).json({ message: "Could not validate credentials", headers: { "WWW-Authenticate": "Bearer" } });
      }

      req.user = foundUser;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Could not validate credentials", headers: { "WWW-Authenticate": "Bearer" } });
  }
};
