const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertDocGroup,
    editDocGroup,
    getAllDocGroup,
    getSelectGroupList
} = require('./docGroup.controller');


router.post('/insertDocGroup', verifyToken, insertDocGroup);
router.patch('/editDocGroup', verifyToken, editDocGroup);
router.get('/getAllDocGroup', verifyToken, getAllDocGroup);
router.get('/getSelectGroupList', verifyToken, getSelectGroupList)

module.exports = router