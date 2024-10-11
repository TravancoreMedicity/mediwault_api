const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');
const {
    insertSubTypeMaster,
    editSubTypeMaster,
    getAllSubTypeMaster,
    getSubTypeMasterById,
    selectSubTypeMaster
} = require('./subTypeMaster.controller');


router.post('/insertSubTypeMaster', verifyToken, insertSubTypeMaster);
router.patch('/editSubTypeMaster', verifyToken, editSubTypeMaster);
router.get('/getAllSubTypeMaster', verifyToken, getAllSubTypeMaster);
router.get('/getSubTypeMasterById/:id', verifyToken, getSubTypeMasterById);
router.get('/selectSubTypeMaster', verifyToken, selectSubTypeMaster);

module.exports = router