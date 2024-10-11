const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertDocSubCategory,
    editDocSubCategory,
    getAllDocSubCategory,
    getSubCategoryList
} = require('./docSubCategory.controller');


router.post('/insertDocSubCategory', verifyToken, insertDocSubCategory);
router.patch('/editDocSubCategory', verifyToken, editDocSubCategory);
router.get('/getAllDocSubCategory', verifyToken, getAllDocSubCategory);
router.get('/getSubCategoryList', verifyToken, getSubCategoryList)

module.exports = router