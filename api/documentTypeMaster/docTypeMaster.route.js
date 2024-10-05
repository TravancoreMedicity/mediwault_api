const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertDocTypeMaster,
    getDocTypeMaster,
    getDocTypeMasterById,
    editDocTypeMaster,
    inactiveDocTypeMater
} = require('./docTypeMaster.controller');

router.post('/insertDocTypeMaster', verifyToken, insertDocTypeMaster);
router.get('/getDocTypeMaster', verifyToken, getDocTypeMaster);
router.get('/getDocTypeMasterById/:id', verifyToken, getDocTypeMasterById);
router.patch('/editDocTypeMaster', verifyToken, editDocTypeMaster);
router.post('/inactiveDocTypeMater/:id', verifyToken, inactiveDocTypeMater)


module.exports = router