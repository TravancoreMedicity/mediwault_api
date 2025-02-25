const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { InsertMenuName, GetDatas } = require('./MenuNameMaster.controller');

router.post('/insertMenuName', verifyToken, InsertMenuName)
router.get('/getdatas', verifyToken, GetDatas)

module.exports = router