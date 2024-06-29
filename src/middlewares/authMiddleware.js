const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const SECRET_KEY = "b1664565cdeb4f67e77ab0cafcb64d09b729639ae2c7e9c9ba315f956de78473";

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = await User.findByPk(user.sub);
    if (!req.user) return res.sendStatus(401);
    next();
  });
};
