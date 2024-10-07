const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertInstituteType,
    editInstituteTypeMaster,
    getAllInstituteType,
    getInstitutionTypeSelect
} = require('./instituteType.controller');


router.post('/insertInstituteType', verifyToken, insertInstituteType);
router.patch('/editInstituteTypeMaster', verifyToken, editInstituteTypeMaster);
router.get('/getAllInstituteType', verifyToken, getAllInstituteType);
router.get('/getInstitutionTypeSelect', verifyToken, getInstitutionTypeSelect);

module.exports = router