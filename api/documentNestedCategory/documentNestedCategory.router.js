const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertNestedDocCategory,
    NestedDocCategory,
    getAllDocSubCategory,
    getSubCategoryList, getSubCategoryById
} = require('./documentNestedCategory.controller');


router.post('/insertNestedDocCategory', verifyToken, insertNestedDocCategory);
router.patch('/editNestedCategoryName', verifyToken, NestedDocCategory);
router.get('/getAllNestedCategory', verifyToken, getAllDocSubCategory);
router.get('/getSubCategoryList', verifyToken, getSubCategoryList);
router.get('/getSubCategoryById/:catSlno', verifyToken, getSubCategoryById);

module.exports = router