const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertModuleName, GetDatas, GetAllModules } = require('./ModuleNameMaster.controller');

router.post('/insertModuleName', verifyToken, insertModuleName)
router.get('/getdatas', verifyToken, GetDatas)
router.get('/selectAllModules', verifyToken, GetAllModules)
module.exports = router