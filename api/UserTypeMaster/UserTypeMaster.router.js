const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertUserType, GetDatas } = require('./UserTypeMaster.controller');

router.post('/insertUserType', verifyToken, insertUserType)
router.get('/getdatas', verifyToken, GetDatas)

module.exports = router