const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    verifyOTPandLogin
} = require('./user.controller');

router.post('/insertUser', verifyToken, insertUser);
router.patch('/editUser', verifyToken, editUser);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/getUser/:id', verifyToken, getUser);
router.get('/getAllUser', verifyToken, getAllUser);
router.post('/verifyOTP', verifyOTPandLogin)


module.exports = router