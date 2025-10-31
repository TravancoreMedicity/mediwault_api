const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const {
    insertCusDepartment,
    selectCusDepartmentList,
    updateCusDepartment,
    deleteCusDepartment,
    selectCusDepartmentById,
    selectCusDepartment,
    selectHrDeptDetails
} = require('./custDepartment.controller');


router.post('/insertCusDepartment', verifyToken, insertCusDepartment);
router.get('/selectCusDepartmentList', verifyToken, selectCusDepartmentList);
router.patch('/updateCusDepartment', verifyToken, updateCusDepartment);
router.delete('/deleteCusDepartment/:id', verifyToken, deleteCusDepartment);
router.get('/selectCusDepartmentById/:id', verifyToken, selectCusDepartmentById);
router.get('/selectCusDepartment', verifyToken, selectCusDepartment);
router.get('/selectHrDeptDetails', verifyToken, selectHrDeptDetails);
module.exports = router