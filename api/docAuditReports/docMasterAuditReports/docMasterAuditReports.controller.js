const {
    getdocMasterCreateAuditReports, getdocMasterEditAuditReports, getdocDetailCreateAuditReports, getdocDetailEditAuditReports,
    getUserCreateAuditReports, getUserEditAuditReports, getDocTypeCreateAuditReports, getDocTypeEditAuditReports
} = require('./docMasterAuditReports.service');

module.exports = {

    getdocMasterCreateAuditReports: (req, res) => {
        getdocMasterCreateAuditReports((error, results) => {
            if (error) {
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

    getdocMasterEditAuditReports: (req, res) => {
        getdocMasterEditAuditReports((error, results) => {
            if (error) {
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
    getdocDetailCreateAuditReports: (req, res) => {
        getdocDetailCreateAuditReports((error, results) => {
            if (error) {
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

    getdocDetailEditAuditReports: (req, res) => {
        getdocDetailEditAuditReports((error, results) => {
            if (error) {
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
    getUserCreateAuditReports: (req, res) => {
        getUserCreateAuditReports((error, results) => {
            if (error) {
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

    getUserEditAuditReports: (req, res) => {
        getUserEditAuditReports((error, results) => {
            if (error) {
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

    getDocTypeCreateAuditReports: (req, res) => {
        getDocTypeCreateAuditReports((error, results) => {
            if (error) {
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

    getDocTypeEditAuditReports: (req, res) => {
        getDocTypeEditAuditReports((error, results) => {
            if (error) {
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





