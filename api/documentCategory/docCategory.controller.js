const logger = require('../../logger/logger');

const {
    insertDocCategory,
    getDocCategoryById,
    editDocCategory,
    getAllDocCategory,
    docCategoryDuplicateCheck,
    selectCategoryMaster
} = require('./docCategory.service');

module.exports = {
    insertDocCategory: (req, res) => {
        const body = req.body;
        const docCategoryName = body?.category_name?.trim();

        docCategoryDuplicateCheck(docCategoryName, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'Document category name already exist'
                });
            }
            if (results?.length === 0) {
                insertDocCategory(body, (error, results) => {
                    if (error) {
                        logger.error(error);
                        return res.status(500).json({
                            success: 0,
                            message: 'Database connection error'
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
            }
        })
    },
    getDocCategoryById: (req, res) => {
        const id = req.params.id;
        getDocCategoryById(id, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: 'Record not found'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    editDocCategory: (req, res) => {
        const body = req.body;
        editDocCategory(body, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: 'Record not found'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getAllDocCategory: (req, res) => {
        getAllDocCategory((error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    selectCategoryMaster: (req, res) => {
        selectCategoryMaster((error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}