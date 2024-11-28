const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    verifyOTPandLogin,
    getRefershToken,
    logOutFunctionality
} = require('./user.controller');

router.post('/insertUser', verifyToken, insertUser);
router.patch('/editUser', verifyToken, editUser);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/getUser/:id', verifyToken, getUser);
router.get('/getAllUser', verifyToken, getAllUser);
router.post('/verifyOTP', verifyOTPandLogin);
router.get('/getRefershToken/:id', getRefershToken)
router.get('/logout/:id', logOutFunctionality)


module.exports = router