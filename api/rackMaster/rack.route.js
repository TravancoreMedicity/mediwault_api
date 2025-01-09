const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertRackMaster,
    updateRackMaster,
    deleteRackMaster,
    selectRackMaster,
    selectRackMasterById,
    selectCmpRackMaster
} = require('./rack.controller');


router.post('/insertRackMaster', verifyToken, insertRackMaster);
router.get('/selectRackMaster', verifyToken, selectRackMaster);
router.patch('/updateRackMaster', verifyToken, updateRackMaster);
router.delete('/deleteRackMaster/:id', verifyToken, deleteRackMaster);
router.get('/selectRackMasterById/:id', verifyToken, selectRackMasterById);
router.get('/selectCmpRackMaster', verifyToken, selectCmpRackMaster);

module.exports = router