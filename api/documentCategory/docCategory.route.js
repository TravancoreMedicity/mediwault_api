const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertDocCategory,
    getDocCategoryById,
    editDocCategory,
    getAllDocCategory,
    selectCategoryMaster
} = require('./docCategory.controller');

router.post('/insertDocCategory', verifyToken, insertDocCategory);
router.get('/getDocCategoryById/:id', verifyToken, getDocCategoryById);
router.patch('/editDocCategory', verifyToken, editDocCategory);
router.get('/getAllDocCategory', verifyToken, getAllDocCategory);
router.get('/selectCategoryMaster', verifyToken, selectCategoryMaster);

module.exports = router