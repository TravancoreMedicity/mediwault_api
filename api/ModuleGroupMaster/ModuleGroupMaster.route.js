const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { insertModuleGroup, GetDatas, EditModuleGroup } = require('./ModuleGroupMaster.controller');

router.post('/insertModuleGroup', verifyToken, insertModuleGroup)
router.get('/getdatas', verifyToken, GetDatas)
router.patch('/editModuleGroup', verifyToken, EditModuleGroup)

module.exports = router

