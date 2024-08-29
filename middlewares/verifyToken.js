const jwt = require('jsonwebtoken');
require('dotenv').config();

const {ACCESS_TOKEN_SECRET} = process.env;
 
const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies["access_token"];
    console.log('accessToken =>', accessToken);

    if(!accessToken) return res.status(401).json({message: "unauthorized"});
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({message: 'forbidden', error: err.message});
        const {userid, email} = decode;
        req.userid = userid;
        req.email = email;

        next();
    });
};

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies["refresh_token"];
    console.log('refreshToken =>', refreshToken);

    if(!refreshToken) return res.status(401).json({message: "unauthorized"});
    jwt.verify(refreshToken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({message: 'forbidden', error: err.message});
        const {userid, email} = decode;
        req.userid = userid;
        req.email = email;

        next();
    });
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}