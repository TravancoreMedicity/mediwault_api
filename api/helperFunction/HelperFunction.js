// @ts-nocheck
require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../../logger/logger');

const generateAccessToken = (userData) => jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

const generateRefreshToken = ({ userSlno }) => jwt.sign({ id: userSlno }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10m' });


module.exports = { generateAccessToken, generateRefreshToken }