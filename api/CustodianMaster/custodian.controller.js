const logger = require('../../logger/logger');

const {
    insertCustodianMaster,
    selectCustodianMaster,
    selectCustodianMasterById,
    updateCustodianMaster,
    deleteCustodianMaster,
    selectCustodianMasterList,
    checkCustodianDepartment
} = require('./custodian.service');

module.exports = {
    insertCustodianMaster: (req, res) => {
        const body = req.body

        const deptID = body.custodian_department_name
        checkCustodianDepartment(deptID, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results && results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'Department name already exist'
                });
            }

            if (results && results.length === 0) {
                insertCustodianMaster(body, (error, results) => {
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
    selectCustodianMaster: (req, res) => {
        selectCustodianMaster((error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    selectCustodianMasterById: (req, res) => {
        const id = req.params.id
        selectCustodianMasterById(id, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateCustodianMaster: (req, res) => {
        const body = req.body
        updateCustodianMaster(body, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'successfully Updated',
                data: results
            });
        })
    },
    deleteCustodianMaster: (req, res) => {
        const id = req.params.id
        deleteCustodianMaster(id, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'successfully Deleted',
                data: results
            });
        })
    },
    selectCustodianMasterList: (req, res) => {
        selectCustodianMasterList((error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}