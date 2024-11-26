// @ts-nocheck
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");

const generateAccessToken = (userData) =>
    jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

const generateRefreshToken = ({ userSlno }) =>
    jwt.sign({ id: userSlno }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });

module.exports = { generateAccessToken, generateRefreshToken };
