const jwt = require('jsonwebtoken');
require('dotenv').config();


// valify

const valify = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.header('Authorization').split(' ')[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}


exports.valify = valify;