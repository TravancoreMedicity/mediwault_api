const logger = require('../../logger/logger');
const {
    insertLocationMaster,
    selectLocationMaster,
    updateLocationMaster,
    deleteLocationMaster,
    getLocationMasterById
} = require('./location.service');

module.exports = {

    insertLocationMaster: (req, res) => {
        const body = req.body
        insertLocationMaster(body, (error, results) => {
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
    },

    selectLocationMaster: (req, res) => {
        selectLocationMaster((error, results) => {
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

    updateLocationMaster: (req, res) => {
        const body = req.body
        updateLocationMaster(body, (error, results) => {
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

    deleteLocationMaster: (req, res) => {
        const id = req.params.id
        deleteLocationMaster(id, (error, results) => {
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
                    message: 'successfully Deleted',
                    data: results
                });
            }
        })
    },

    getLocationMasterById: (req, res) => {
        const id = req.params.id
        getLocationMasterById(id, (error, results) => {
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

}