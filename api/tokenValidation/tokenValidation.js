// @ts-nocheck
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const logger = require('../../logger/logger')
module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.get('authorization')
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    logger.error(err)
                    return res.json({
                        status: 102,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            logger.error("No token")
            return res.json({
                status: 101,
                message: "Invalid Token"
            });
        }
    }
}