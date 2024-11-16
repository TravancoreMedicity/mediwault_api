const logger = require('../../logger/logger');

const {
    insertCourseMater,
    editCourseMaster,
    getAllCourseMaster,
    getCourseMasterById,
    getSelectCourseMaster,
    checkCourserName
} = require('./courseMaster.service');

module.exports = {

    insertCourseMater: (req, res) => {
        const body = req.body
        const name = body?.course_name?.trim()

        checkCourserName(name, (err, results) => {
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
                    message: 'Course name already exist'
                })
            }

            if (results?.length === 0) {
                insertCourseMater(body, (err, results) => {
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

    editCourseMaster: (req, res) => {
        const body = req.body
        editCourseMaster(body, (err, results) => {
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

    getAllCourseMaster: (req, res) => {
        getAllCourseMaster((err, results) => {
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
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getCourseMasterById: (req, res) => {
        const id = req.params.id
        getCourseMasterById(id, (err, results) => {
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
                    message: 'Record not found'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getSelectCourseMaster: (req, res) => {
        getSelectCourseMaster((err, results) => {
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
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}