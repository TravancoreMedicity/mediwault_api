const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertCustodianMaster,
    selectCustodianMaster,
    selectCustodianMasterById,
    updateCustodianMaster,
    deleteCustodianMaster,
    selectCustodianMasterList,
    selectCustodianByDept
} = require('./custodian.controller');

router.post('/insertCustodianMaster', verifyToken, insertCustodianMaster);
router.get('/selectCustodianMaster', verifyToken, selectCustodianMaster);
router.patch('/updateCustodianMaster', verifyToken, updateCustodianMaster);
router.delete('/deleteCustodianMaster/:id', verifyToken, deleteCustodianMaster);
router.get('/selectCustodianMasterById/:id', verifyToken, selectCustodianMasterById);
router.get('/selectCustodianMasterList', verifyToken, selectCustodianMasterList);
router.get('/selectCustodianByDept/:id', verifyToken, selectCustodianByDept);

module.exports = router