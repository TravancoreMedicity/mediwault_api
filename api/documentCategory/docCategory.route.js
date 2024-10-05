const router = require('express').Router();

const {
    insertDocCategory,
    getDocCategoryById,
    editDocCategory,
    getAllDocCategory
} = require('./docCategory.controller');

router.post('/insertDocCategory', insertDocCategory);
router.get('/getDocCategoryById/:id', getDocCategoryById);
router.patch('/editDocCategory', editDocCategory);
router.get('/getAllDocCategory', getAllDocCategory);

module.exports = router