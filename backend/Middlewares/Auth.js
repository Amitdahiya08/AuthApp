
const jwt  = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403)
            .json({message: "Unauthorized, JWT Token is required"});
    }
    try {
        // here payload stores all the user info
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user =  payload;
        next();
    } catch (error) {
        return res.status(403)
            .json({message: "Unauthorized, JWT Token is Invalid"});
    }
}

module.exports = ensureAuthenticated;