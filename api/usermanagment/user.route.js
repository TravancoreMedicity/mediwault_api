const router = require('express').Router();

const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    verifyOTPandLogin
} = require('./user.controller');


router.post('/insertUser', insertUser);
router.patch('/editUser', editUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUser/:id', getUser);
router.get('/getAllUser', getAllUser);
router.post('/verifyOTP', verifyOTPandLogin)


module.exports = router