const jwt = require('jsonwebtoken');
require('dotenv').config();


// create token
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const rawToke = jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRES_IN});

// get token

exports.getToken = (req, res) => {
    res.json({token: rawToke});
}