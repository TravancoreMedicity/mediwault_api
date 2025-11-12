const router = require('express').Router();
const { verifyToken } = require('../../tokenValidation/tokenValidation');

const {
    getdocMasterCreateAuditReports, getdocMasterEditAuditReports, getdocDetailCreateAuditReports, getdocDetailEditAuditReports,
    getUserCreateAuditReports, getUserEditAuditReports, getDocTypeCreateAuditReports, getDocTypeEditAuditReports
} = require('./docMasterAuditReports.controller');


router.get('/getdocMasterCreateAuditReports', verifyToken, getdocMasterCreateAuditReports);
router.get('/getdocMasterEditAuditReports', verifyToken, getdocMasterEditAuditReports);
router.get('/getdocDetailCreateAuditReports', verifyToken, getdocDetailCreateAuditReports);
router.get('/getdocDetailEditAuditReports', verifyToken, getdocDetailEditAuditReports);
router.get('/getUserCreateAuditReports', verifyToken, getUserCreateAuditReports);
router.get('/getUserEditAuditReports', verifyToken, getUserEditAuditReports);


router.get('/getDocTypeCreateAuditReports', verifyToken, getDocTypeCreateAuditReports);
router.get('/getDocTypeEditAuditReports', verifyToken, getDocTypeEditAuditReports);

module.exports = router








