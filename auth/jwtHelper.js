
require('dotenv').config();
let jwt = require('jsonwebtoken');


module.exports.isAuth=(req,res,next)=> {
    let token = req.headers['auth'];
    if (!token) {
        return res.status(403).json({"status" : false, "msg" : "Please provide token"  })
    }
    else {
        jwt.verify(token,process.env.JWT_SECRET, function (err,user){
            if (err) {
                return res.status(401).json({"status" : false, "msg" : "Error in token validation" })
            } 
            req.user = user;
            next();
        })
    }
}


