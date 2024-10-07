const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');


const {
    insertCourseMater,
    editCourseMaster,
    getAllCourseMaster,
    getCourseMasterById,
    getSelectCourseMaster
} = require('./courseMaster.controller');


router.post('/insertCourseMater', verifyToken, insertCourseMater);
router.patch('/editCourseMaster', verifyToken, editCourseMaster);
router.get('/getAllCourseMaster', verifyToken, getAllCourseMaster);
router.get('/getCourseMasterById/:id', verifyToken, getCourseMasterById);
router.get('/getSelectCourseMaster', verifyToken, getSelectCourseMaster);

module.exports = router