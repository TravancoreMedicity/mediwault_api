const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    mobileExist,
    emailExist
} = require('./user.service');

module.exports = {
    insertUser: (req, res) => {
        const body = req.body

        mobileExist(body.mobile, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Mobile number already exist"
                });
            }

            emailExist(body.email, (error, results) => {
                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }

                if (results?.length > 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "Email already exist"
                    });
                }

                if (results?.length === 0) {
                    insertUser(body, (error, results) => {
                        if (error) {
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "User created successfully"
                        });
                    });
                }

            })
        })
    },
    editUser: (req, res) => {
        const body = req.body
        editUser(body, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id
        deleteUser(id, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUser: (req, res) => {
        const id = req.params.id
        getUser(id, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getAllUser: (req, res) => {
        getAllUser((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}