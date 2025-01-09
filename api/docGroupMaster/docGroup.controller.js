const logger = require('../../logger/logger');

const {
    insertDocGroup,
    editDocGroup,
    getAllDocGroup,
    checkGroupNameDuplicate,
    getSelectGroupList
} = require('./docGroup.service');

module.exports = {

    insertDocGroup: (req, res) => {
        const body = req.body
        const groupName = body?.group_name?.trim()
        checkGroupNameDuplicate(groupName, (err, results) => {
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
                    message: 'Group name already exist'
                })
            }
            if (results?.length === 0) {
                insertDocGroup(body, (error, results) => {
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
    getAllDocGroup: (req, res) => {
        getAllDocGroup((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    editDocGroup: (req, res) => {
        const body = req.body
        editDocGroup(body, (error, results) => {
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
    getSelectGroupList: (req, res) => {
        getSelectGroupList((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}