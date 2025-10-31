const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertUserType, GetDatas, editUserType } = require('./UserTypeMaster.controller');

router.post('/insertUserType', verifyToken, insertUserType)
router.get('/getdatas', verifyToken, GetDatas)
router.patch('/editUserType', verifyToken, editUserType)

module.exports = router

