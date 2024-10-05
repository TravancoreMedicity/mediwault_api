const router = require('express').Router();

const {
    insertSubTypeMaster,
    editSubTypeMaster,
    getAllSubTypeMaster,
    getSubTypeMasterById
} = require('./subTypeMaster.controller');


router.post('/insertSubTypeMaster', insertSubTypeMaster);
router.patch('/editSubTypeMaster', editSubTypeMaster);
router.get('/getAllSubTypeMaster', getAllSubTypeMaster);
router.get('/getSubTypeMasterById/:id', getSubTypeMasterById);

module.exports = router