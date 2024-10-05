const logger = require('../../logger/logger');
const {
    docMainTypeMaster
} = require('./selectCmp.service')

module.exports = {
    docMainTypeMaster: (req, res) => {
        docMainTypeMaster((error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results && results?.length > 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'success',
                    data: results
                });
            }
        })
    }
}