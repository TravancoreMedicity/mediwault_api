const logger = require('../../logger/logger');
const {
    insertSubTypeMaster,
    checkSubMasterNameDuplicate,
    editSubTypeMaster,
    getAllSubTypeMaster,
    getSubTypeMasterById,
    selectSubTypeMaster
} = require('./subTypeMaster.service');

module.exports = {
    insertSubTypeMaster: (req, res) => {
        const body = req.body
        const name = body?.doc_sub_type_name?.trim()
        checkSubMasterNameDuplicate(name, (error, results) => {
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
                    message: 'Sub type name already exist'
                });
            }

            if (results?.length === 0) {
                insertSubTypeMaster(body, (error, results) => {
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
                            message: 'successfully Created',
                            data: results
                        });
                    }
                })
            }
        })
    },
    editSubTypeMaster: (req, res) => {
        const body = req.body
        editSubTypeMaster(body, (error, results) => {
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
    getAllSubTypeMaster: (req, res) => {
        getAllSubTypeMaster((error, results) => {
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
    getSubTypeMasterById: (req, res) => {
        const id = req.params.id
        getSubTypeMasterById(id, (error, results) => {
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
    selectSubTypeMaster: (req, res) => {
        selectSubTypeMaster((error, results) => {
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