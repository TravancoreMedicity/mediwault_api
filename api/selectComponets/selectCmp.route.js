const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { docMainTypeMaster } = require('./selectCmp.controller');


router.get('/docMainTypeMaster', verifyToken, docMainTypeMaster);


module.exports = router