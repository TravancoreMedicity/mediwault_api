const logger = require('../../logger/logger');

const { insertUserType, GetDatas, validateUserTypeExcistOrNot, editUserType } = require('./UserTypeMaster.service');

module.exports = {
    insertUserType: (req, res) => {
        const body = req.body;

        validateUserTypeExcistOrNot(body, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error" + error,
                });
            }

            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Module Name already exist",
                });
            }
            insertUserType(body, (error, results) => {
                if (error) {
                    logger.error(error);
                    return res.status(200).json({
                        success: 0,
                        message: "Database connection error" + error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "successfully Inserted",
                });
            });
        })
    },
    GetDatas: (req, res) => {
        GetDatas((error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    editUserType: (req, res) => {
        const body = req.body;
        editUserType(body, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}