const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');
const {
    insertSubTypeMaster,
    editSubTypeMaster,
    getAllSubTypeMaster,
    getSubTypeMasterById
} = require('./subTypeMaster.controller');


router.post('/insertSubTypeMaster', verifyToken, insertSubTypeMaster);
router.patch('/editSubTypeMaster', verifyToken, editSubTypeMaster);
router.get('/getAllSubTypeMaster', verifyToken, getAllSubTypeMaster);
router.get('/getSubTypeMasterById/:id', verifyToken, getSubTypeMasterById);

module.exports = router