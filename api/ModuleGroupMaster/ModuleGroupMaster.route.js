const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertModuleGroup, GetDatas } = require('./ModuleGroupMaster.controller');

router.post('/insertModuleGroup', verifyToken, insertModuleGroup)
router.get('/getdatas', verifyToken, GetDatas)

module.exports = router