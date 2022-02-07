const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {      
        if (err) {
          return res.json({ message: 'Token inválido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          message: 'Se requiere un token.' 
      });
    }
 }

module.exports = verifyToken;