const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    docMainTypeMaster,
    getSerialNumber
} = require('./selectCmp.controller');


router.get('/docMainTypeMaster', verifyToken, docMainTypeMaster);
router.get('/getDocNumber', verifyToken, getSerialNumber);


module.exports = router