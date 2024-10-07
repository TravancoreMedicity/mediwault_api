const logger = require('../../logger/logger');

const {
    insertInstituteType,
    editInstituteTypeMaster,
    getAllInstituteType,
    checkDuplicateInstituteTypeName,
    getInstitutionTypeSelect
} = require('./instituteType.service');

module.exports = {
    insertInstituteType: (req, res) => {
        const body = req.body
        const name = body?.institute_type_name?.trim()

        checkDuplicateInstituteTypeName(name, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'Institute type name already exist'
                })
            }
            if (results?.length === 0) {
                insertInstituteType(body, (error, results) => {
                    if (error) {
                        logger.error(error)
                        return res.status(500).json({
                            success: 0,
                            message: 'Database connection error'
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: 'Record Inserted successfully',
                        data: results
                    })
                })
            }
        })
    },

    editInstituteTypeMaster: (req, res) => {
        const body = req.body
        editInstituteTypeMaster(body, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: 'Record not found'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Record Updated successfully',
                data: results
            })
        })
    },

    getAllInstituteType: (req, res) => {
        getAllInstituteType((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    data: []
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
    getInstitutionTypeSelect: (req, res) => {
        getInstitutionTypeSelect((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    data: []
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