const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertInstitutionMaster,
    editInstitutionMaster,
    getAllInstitutionMaster
} = require('./institutionMaster.controller');


router.post('/insertInstitutionMaster', verifyToken, insertInstitutionMaster);
router.patch('/editInstitutionMaster', verifyToken, editInstitutionMaster);
router.get('/getAllInstitutionMaster', verifyToken, getAllInstitutionMaster);

module.exports = router