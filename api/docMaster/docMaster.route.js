const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertDocMaster,
    getDocMaster,
    getDocMasterById,
    getDocMasterLikeName,
    getDocNonSecure,
    getDocSecureOnly
} = require('./docMaster.controller');


router.post('/insertDocMaster', verifyToken, insertDocMaster);
router.get('/getDocMaster', verifyToken, getDocMaster);
router.get('/getDocMasterById/:id', verifyToken, getDocMasterById);
router.get('/getDocMasterLikeName/:name', verifyToken, getDocMasterLikeName);
router.get('/getDocNonSecure', verifyToken, getDocNonSecure);
router.get('/getDocSecureOnly', verifyToken, getDocSecureOnly);

module.exports = router