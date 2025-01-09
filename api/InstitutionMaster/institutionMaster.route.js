const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertInstitutionMaster,
    editInstitutionMaster,
    getAllInstitutionMaster,
    selectInstituteMaster
} = require('./institutionMaster.controller');


router.post('/insertInstitutionMaster', verifyToken, insertInstitutionMaster);
router.patch('/editInstitutionMaster', verifyToken, editInstitutionMaster);
router.get('/getAllInstitutionMaster', verifyToken, getAllInstitutionMaster);
router.get('/selectInstituteMaster', verifyToken, selectInstituteMaster);

module.exports = router