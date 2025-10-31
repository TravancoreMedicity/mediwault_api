const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { InsertMenuName, GetDatas, UpdateMenuName } = require('./MenuNameMaster.controller');

router.post('/insertMenuName', verifyToken, InsertMenuName)
router.get('/getdatas', verifyToken, GetDatas)
router.patch('/editMenuName', verifyToken, UpdateMenuName)

module.exports = router