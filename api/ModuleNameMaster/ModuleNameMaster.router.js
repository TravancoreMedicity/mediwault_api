const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertModuleName, GetDatas } = require('./ModuleNameMaster.controller');

router.post('/insertModuleName', verifyToken, insertModuleName)
router.get('/getdatas', verifyToken, GetDatas)

module.exports = router