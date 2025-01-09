const logger = require('../../logger/logger');
const {
    insertRackMaster,
    updateRackMaster,
    deleteRackMaster,
    selectRackMaster,
    selectRackMasterById,
    selectCmpRackMaster
} = require('./rack.service');

module.exports = {
    insertRackMaster: (req, res) => {
        const body = req.body
        insertRackMaster(body, (error, results) => {
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
    updateRackMaster: (req, res) => {
        const body = req.body
        updateRackMaster(body, (error, results) => {
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
    deleteRackMaster: (req, res) => {
        const id = req.params.id
        deleteRackMaster(id, (error, results) => {
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
    selectRackMaster: (req, res) => {
        selectRackMaster((error, results) => {
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
    selectRackMasterById: (req, res) => {
        const id = req.params.id
        selectRackMasterById(id, (error, results) => {
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
    selectCmpRackMaster: (req, res) => {
        selectCmpRackMaster((error, results) => {
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