const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertCourseType,
    editCourseTypeMaster,
    getAllCourseType,
    getCourseTypeSelect
} = require('./courseType.controller');


router.post('/insertCourseType', verifyToken, insertCourseType);
router.patch('/editCourseTypeMaster', verifyToken, editCourseTypeMaster);
router.get('/getAllCourseType', verifyToken, getAllCourseType);
router.get('/getCourseTypeSelect', verifyToken, getCourseTypeSelect);

module.exports = router