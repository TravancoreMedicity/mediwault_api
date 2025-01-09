const logger = require('../../logger/logger');
const {
    insertCusDepartment,
    selectCusDepartmentList,
    updateCusDepartment,
    deleteCusDepartment,
    selectCusDepartmentById,
    selectCusDepartment,
    checkCusDepartmentNameDuplicate
} = require('./custDepartent.service');

module.exports = {
    insertCusDepartment: (req, res) => {
        const body = req.body;
        const name = body?.custodian_department_name?.trim()

        checkCusDepartmentNameDuplicate(name, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'Custodian Department name already exist'
                });
            }

            if (results?.length === 0) {
                insertCusDepartment(body, (error, results) => {
                    if (error) {
                        logger.error(error)
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }

                    if (results) {
                        return res.status(200).json({
                            success: 1,
                            message: 'successfully Inserted',
                            data: results
                        });
                    }
                })
            }
        })
    },
    selectCusDepartmentList: (req, res) => {
        selectCusDepartmentList((error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        })
    },
    updateCusDepartment: (req, res) => {
        const body = req.body
        updateCusDepartment(body, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    message: 'successfully Updated',
                    data: results
                });
            }
        })
    },
    deleteCusDepartment: (req, res) => {
        const id = req.params.id
        deleteCusDepartment(id, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    message: 'successfully Deleted',
                    data: results
                });
            }
        })
    },
    selectCusDepartmentById: (req, res) => {
        const id = req.params.id
        selectCusDepartmentById(id, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        })
    },
    selectCusDepartment: (req, res) => {
        selectCusDepartment((error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        })
    }
}