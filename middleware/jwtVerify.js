const jwt = require('jsonwebtoken');
const keys=require('../config/keys')

const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authentication,keys.session.cookieKey, (err, decoded)=>{
        if(err)
            next(err)
        else{
            req.user = decoded;
            next();
        }
    })
}

module.exports = verifyToken;