const logger = require('../../logger/logger');

const {
    insertDocSubCategory,
    editDocSubCategory,
    getAllDocSubCategory,
    subCategoryNameDuplicateCheck,
    getSubCategoryList
} = require('./docSubCategory.service');

module.exports = {
    insertDocSubCategory: (req, res) => {
        const body = req.body
        const subCategoryname = body?.sub_category_name?.trim()

        subCategoryNameDuplicateCheck(subCategoryname, (err, results) => {
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
                    message: 'Sub category name already exist'
                })
            }
            if (results?.length === 0) {
                insertDocSubCategory(body, (error, results) => {
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

    editDocSubCategory: (req, res) => {
        const body = req.body
        editDocSubCategory(body, (error, results) => {
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

    getAllDocSubCategory: (req, res) => {
        getAllDocSubCategory((error, results) => {
            if (error) {
                logger.error(error)
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

    getSubCategoryList: (req, res) => {
        getSubCategoryList((error, results) => {
            if (error) {
                logger.error(error)
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