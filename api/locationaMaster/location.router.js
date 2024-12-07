const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertLocationMaster,
    selectLocationMaster,
    updateLocationMaster,
    deleteLocationMaster,
    getLocationMasterById
} = require('./location.controller');

router.post('/insertLocationMaster', verifyToken, insertLocationMaster);
router.get('/selectLocationMaster', verifyToken, selectLocationMaster);
router.patch('/updateLocationMaster', verifyToken, updateLocationMaster);
router.delete('/deleteLocationMaster/:id', verifyToken, deleteLocationMaster);
router.get('/getLocationMasterById/:id', verifyToken, getLocationMasterById);

module.exports = router