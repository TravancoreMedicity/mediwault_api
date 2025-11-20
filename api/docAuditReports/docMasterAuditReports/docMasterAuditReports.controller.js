const {
    getdocMasterCreateAuditReports, getdocMasterEditAuditReports, getdocDetailCreateAuditReports, getdocDetailEditAuditReports,
    getUserCreateAuditReports, getUserEditAuditReports, getDocTypeCreateAuditReports, getDocTypeEditAuditReports, getSubTypeCreateAuditReports, getSubTypeEditAuditReports, getDocCatCreateAuditReports, getDocCatEditAuditReports, getDocSubCategoryAuditReports, getDocSubCategoryEditAuditReports, getDocNestedCatCreateAuditReports, getDocNestedCatEditAuditReports, getDocGroupCreateAuditReports, getDocGroupEditAuditReports, getInstituteTypeCreateAuditReports, getInstituteTypeEditAuditReports, getInstituteMastCreateAuditReports, getInstituteMastEditAuditReports

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
    },
    getSubTypeCreateAuditReports: (req, res) => {
        getSubTypeCreateAuditReports((error, results) => {
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

    getSubTypeEditAuditReports: (req, res) => {
        getSubTypeEditAuditReports((error, results) => {
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
    getDocCatCreateAuditReports: (req, res) => {
        getDocCatCreateAuditReports((error, results) => {
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

    getDocCatEditAuditReports: (req, res) => {
        getDocCatEditAuditReports((error, results) => {
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
    getDocSubCategoryAuditReports: (req, res) => {
        getDocSubCategoryAuditReports((error, results) => {
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

    getDocSubCategoryEditAuditReports: (req, res) => {
        getDocSubCategoryEditAuditReports((error, results) => {
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

    ////////
    getDocNestedCatCreateAuditReports: (req, res) => {
        getDocNestedCatCreateAuditReports((error, results) => {
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

    getDocNestedCatEditAuditReports: (req, res) => {
        getDocNestedCatEditAuditReports((error, results) => {
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
    getDocGroupCreateAuditReports: (req, res) => {
        getDocGroupCreateAuditReports((error, results) => {
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

    getDocGroupEditAuditReports: (req, res) => {
        getDocGroupEditAuditReports((error, results) => {
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
    getInstituteTypeCreateAuditReports: (req, res) => {
        getInstituteTypeCreateAuditReports((error, results) => {
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

    getInstituteTypeEditAuditReports: (req, res) => {
        getInstituteTypeEditAuditReports((error, results) => {
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
    // getInstituteMastCreateAuditReports, getInstituteMastEditAuditReports

    getInstituteMastCreateAuditReports: (req, res) => {
        getInstituteMastCreateAuditReports((error, results) => {
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


    getInstituteMastEditAuditReports: (req, res) => {
        getInstituteMastEditAuditReports((error, results) => {
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



