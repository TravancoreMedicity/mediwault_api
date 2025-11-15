const router = require('express').Router();
const { verifyToken } = require('../../tokenValidation/tokenValidation');

const {
    getdocMasterCreateAuditReports, getdocMasterEditAuditReports, getdocDetailCreateAuditReports, getdocDetailEditAuditReports,
    getUserCreateAuditReports, getUserEditAuditReports, getDocTypeCreateAuditReports, getDocTypeEditAuditReports,
    getSubTypeCreateAuditReports, getSubTypeEditAuditReports, getDocCatCreateAuditReports, getDocCatEditAuditReports, getDocSubCategoryAuditReports, getDocSubCategoryEditAuditReports, getDocNestedCatCreateAuditReports, getDocNestedCatEditAuditReports, getDocGroupCreateAuditReports, getDocGroupEditAuditReports

} = require('./docMasterAuditReports.controller');


router.get('/getdocMasterCreateAuditReports', verifyToken, getdocMasterCreateAuditReports);
router.get('/getdocMasterEditAuditReports', verifyToken, getdocMasterEditAuditReports);
router.get('/getdocDetailCreateAuditReports', verifyToken, getdocDetailCreateAuditReports);
router.get('/getdocDetailEditAuditReports', verifyToken, getdocDetailEditAuditReports);
router.get('/getUserCreateAuditReports', verifyToken, getUserCreateAuditReports);
router.get('/getUserEditAuditReports', verifyToken, getUserEditAuditReports);

router.get('/getDocTypeCreateAuditReports', verifyToken, getDocTypeCreateAuditReports);
router.get('/getDocTypeEditAuditReports', verifyToken, getDocTypeEditAuditReports);

router.get('/getSubTypeCreateAuditReports', verifyToken, getSubTypeCreateAuditReports);
router.get('/getSubTypeEditAuditReports', verifyToken, getSubTypeEditAuditReports);

router.get('/getDocCatCreateAuditReports', verifyToken, getDocCatCreateAuditReports);
router.get('/getDocCatEditAuditReports', verifyToken, getDocCatEditAuditReports);

router.get('/getDocSubCategoryAuditReports', verifyToken, getDocSubCategoryAuditReports);
router.get('/getDocSubCategoryEditAuditReports', verifyToken, getDocSubCategoryEditAuditReports);

//nested category
router.get('/getDocNestedCatCreateAuditReports', verifyToken, getDocNestedCatCreateAuditReports);
router.get('/getDocNestedCatEditAuditReports', verifyToken, getDocNestedCatEditAuditReports);

router.get('/getDocGroupCreateAuditReports', verifyToken, getDocGroupCreateAuditReports);
router.get('/getDocGroupEditAuditReports', verifyToken, getDocGroupEditAuditReports);

module.exports = router












