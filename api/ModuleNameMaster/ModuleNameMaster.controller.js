const logger = require('../../logger/logger');

const { insertModuleName, GetDatas, validateModuleNameExcistOrNot, GetAllModules, UpdateModuleName } = require('./ModuleNameMaster.service');

module.exports = {
    insertModuleName: (req, res) => {
        const body = req.body;

        validateModuleNameExcistOrNot(body, (error, results) => {
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
            insertModuleName(body, (error, results) => {

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
    GetAllModules: (req, res) => {
        GetAllModules((error, results) => {
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
    UpdateModuleName: (req, res) => {
        const body = req.body;
        UpdateModuleName(body, (error, results) => {
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