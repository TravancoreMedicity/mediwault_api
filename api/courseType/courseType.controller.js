const logger = require('../../logger/logger');

const {
    insertCourseType,
    editCourseTypeMaster,
    getAllCourseType,
    getCourseTypeSelect,
    checkDuplicateCourseTypeName
} = require('./courseType.service');

module.exports = {

    insertCourseType: (req, res) => {
        const body = req.body
        const name = body?.course_type_name?.trim()
        checkDuplicateCourseTypeName(name, (err, results) => {
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
                    message: 'Course type name already exist'
                })
            }
            if (results?.length === 0) {
                insertCourseType(body, (err, results) => {
                    if (err) {
                        logger.error(err)
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

    editCourseTypeMaster: (req, res) => {
        const body = req.body

        editCourseTypeMaster(body, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Record Updated successfully',
                data: results
            })
        })
    },

    getAllCourseType: (req, res) => {
        getAllCourseType((err, results) => {
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
                })
            }
            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        })
    },

    getCourseTypeSelect: (req, res) => {
        getCourseTypeSelect((err, results) => {
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
                })
            }
            if (results) {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        })
    }
}