// @ts-nocheck
require('dotenv').config();
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');
const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    mobileExist,
    emailExist,
    insertOTP,
    verifyOTP
} = require('./user.service');

const { addHours, format } = require('date-fns');
const logger = require('../../logger/logger');


module.exports = {
    insertUser: (req, res) => {
        const body = req.body

        mobileExist(body.mobile, (error, results) => {
            if (error) {
                logger.error(error)
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
                    logger.error(error)
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
                logger.error(error)
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
                logger.error(error)
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
                logger.error(error)
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
                logger.error(error)
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
    generateOTP: async (req, res) => {
        const mobileNumber = req.params.id;
        const trimmedNumber = mobileNumber.slice(2);
        // First check mobile number registerd or not
        mobileExist(trimmedNumber, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Mobile number not registered"
                });
            }

            if (results.length > 0) {
                const otp = Math.floor(100000 + Math.random() * 900000)
                insertOTP({ mobile: trimmedNumber, otp: otp }, (error, results) => {
                    if (error) {
                        logger.error(error)
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    if (results) {
                        axios.get(`https://sapteleservices.com/SMS_API/sendsms.php?username=Tmc_medicity&password=c9e780&sendername=TMDCTY&mobile=${mobileNumber}&template_id=1407162012178109509&message=Your+Medicity+App+OTP+code:+${otp}+DuHTEah22dE.Travancore+Medicity+.&routetype=1`).then((response) => {
                            return res.status(200).json({
                                success: 2,
                                message: "OTP sent successfully"
                            });
                        }).catch((error) => {
                            logger.error(error)
                            return res.status(200).json({
                                success: 3,
                                message: "Error in sending OTP,Please try again"
                            });
                        })

                    }
                })
            }
        })
    },
    verifyOTPandLogin: async (req, res) => {
        const body = req.body
        verifyOTP(body, (error, results) => {
            if (error) {
                logger.error(error)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Incorrect OTP"
                });
            }
            if (results.length > 0) {

                const userData = results[0]
                const { user_slno, name, login_type } = userData

                const token = jwt.sign(results[0], process.env.TOKEN_SECRET, {
                    expiresIn: "2h"
                });

                const expiresIn = addHours(new Date(), 2);

                const returnData = {
                    user_slno,
                    name,
                    token,
                    login_type,
                    tokenValidity: expiresIn
                }

                return res.status(200).json({
                    success: 2,
                    userInfo: JSON.stringify(returnData),
                    message: "OTP verified successfully"
                });
            }
        })
    }
}