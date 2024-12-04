// @ts-nocheck
require("dotenv").config();
const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const {
    insertUser,
    editUser,
    deleteUser,
    getUser,
    getAllUser,
    mobileExist,
    emailExist,
    insertOTP,
    verifyOTP,
    insertRefreshToken,
    getRefershToken,
    deleteRefreshToken,
    validateUserCredExcistOrNot,
    userBasedValidationCheck
} = require("./user.service");

const { addHours, format } = require("date-fns");
const logger = require("../../logger/logger");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../helperFunction/HelperFunction");
const { encrypt, decrypt } = require("../EncryptionHandler/EncryptionHandler");
const { validateUserLoginCheck } = require("./user.function");

module.exports = {
    insertUser: (req, res) => {
        const body = req.body;

        validateUserCredExcistOrNot(body, (error, results) => {
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
                    message: "User Credentials already exist",
                });
            }

            const salt = genSaltSync(10);
            const passwordEncryption = hashSync(body.password, salt);

            const bodtData = {
                ...body,
                password: passwordEncryption
            }

            insertUser(bodtData, (error, results) => {

                if (error) {
                    logger.error(error);
                    return res.status(200).json({
                        success: 0,
                        message: "Database connection error" + error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "User created successfully",
                });
            });
        })
    },
    editUser: (req, res) => {
        const body = req.body;
        editUser(body, (error, results) => {
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
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
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
    getUser: (req, res) => {
        const id = req.params.id;
        getUser(id, (error, results) => {
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
    getAllUser: (req, res) => {
        getAllUser((error, results) => {
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
    generateOTP: async (req, res) => {
        const mobileNumber = req.params.id;
        const trimmedNumber = mobileNumber.slice(2);
        // First check mobile number registerd or not
        mobileExist(trimmedNumber, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Mobile number not registered",
                });
            }

            if (results.length > 0) {
                const otp = Math.floor(100000 + Math.random() * 900000);
                insertOTP({ mobile: trimmedNumber, otp: otp }, (error, results) => {

                    if (error) {
                        logger.error(error);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error",
                        });
                    }
                    if (results) {
                        return res.status(200).json({
                            success: 2,
                            message: "OTP sent successfully",
                        });

                        // axios
                        //     .get(
                        //         `https://sapteleservices.com/SMS_API/sendsms.php?username=Tmc_medicity&password=c9e780&sendername=TMDCTY&mobile=${mobileNumber}&template_id=1407162012178109509&message=Your+Medicity+App+OTP+code:+${otp}+DuHTEah22dE.Travancore+Medicity+.&routetype=1`
                        //     )
                        //     .then((response) => {
                        //         return res.status(200).json({
                        //             success: 2,
                        //             message: "OTP sent successfully",
                        //         });
                        //     })
                        //     .catch((error) => {
                        //         logger.error(error);
                        //         return res.status(200).json({
                        //             success: 3,
                        //             message: "Error in sending OTP,Please try again",
                        //         });
                        //     });
                    }
                });
            }
        });
    },
    verifyOTPandLogin: async (req, res) => {
        const body = req.body;

        verifyOTP(body, async (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Incorrect OTP",
                });
            }
            if (results.length > 0) {
                const userData = results[0];

                console.log(userData)

                const {
                    user_slno,
                    name,
                    login_type,
                    password_validity,
                    last_passwd_change_date,
                    iv,
                    password_validity_expiry_date,
                    last_login_date,
                    sign_in_per_day_limit,
                    sign_in_per_day_count,
                    is_limited_user,
                    login_method_allowed,
                    limited_user_validity_end_time,
                } = userData;


                const validatingUserLogin = await validateUserLoginCheck(
                    password_validity,
                    last_passwd_change_date,
                    last_login_date,
                    sign_in_per_day_limit,
                    sign_in_per_day_count,
                    is_limited_user,
                    login_method_allowed,
                    limited_user_validity_end_time,
                    body.method
                )

                const { message, status } = validatingUserLogin;
                console.log(message, status)

                if (status) {
                    return res.status(200).json({
                        success: 1,
                        message,
                    });
                } else {

                    const accessToken = generateAccessToken(userData);
                    const refreshToken = generateRefreshToken(user_slno);

                    // insert the refresh token
                    insertRefreshToken({ user_slno, refresh_token: refreshToken }, (error, results) => {
                        if (error) {
                            logger.error(error);
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error",
                            });
                        }

                        if (results) {
                            const returnData = {
                                user_slno,
                                name,
                                accessToken,
                                login_type,
                            };

                            res.cookie("accessToken", accessToken, {
                                httpOnly: true,
                                secure: true,
                                maxAge: process.env.COOKIE_TIME, // 15 min
                                sameSite: "strict",
                            });

                            res.json({
                                success: 2,
                                userInfo: JSON.stringify(returnData),
                                message: "OTP verified successfully",
                            });
                        }
                    });
                }
            }
        });
    },
    getRefershToken: (req, res) => {
        const id = req.params.id;
        // console.log(id)
        getRefershToken(id, (error, results) => {
            // console.log(error)

            if (error) {
                logger.error(error);
                deleteRefreshToken(id, (error, results) => {
                    if (error) {
                        logger.error(error);
                        res.clearCookie("accessToken");
                        return res.status(403).json({ message: "Invalid refresh token" });
                    }
                    res.clearCookie("accessToken");
                    return res.status(403).json({ message: "Invalid refresh token" });
                })
            }

            if (results.length === 0) {
                deleteRefreshToken(id, (error, results) => {
                    if (error) {
                        logger.error(error);
                        res.clearCookie("accessToken");
                        return res.status(403).json({ message: "Invalid refresh token" });
                    }
                    res.clearCookie("accessToken");
                    return res.status(403).json({ message: "Invalid refresh token" });
                })
                // return res.status(403).json({ message: "Invalid refresh token" });
            }

            if (results.length > 0) {
                // console.log(results[0].token)
                const refreshToken = results[0].token;

                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, user) => {
                        if (err) {
                            // DELETE REFRESH TOKEN
                            deleteRefreshToken(id, (error, results) => {
                                if (error) {
                                    logger.error(error);
                                    res.clearCookie("accessToken");
                                    return res.status(403).json({ message: "Invalid refresh token" });
                                }
                                res.clearCookie("accessToken");
                                return res.status(403).json({ message: "Invalid refresh token" });
                            })

                        } else {
                            const newAccessToken = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
                            res.cookie("accessToken", newAccessToken, {
                                httpOnly: true,
                                secure: true,
                                maxAge: process.env.COOKIE_TIME, // 15 min
                                sameSite: "strict",
                            });
                            res.json({ message: "revalidated" });
                        }
                    }
                );
            }
        });
    },
    logOutFunctionality: (req, res) => {
        const id = req.params.id
        deleteRefreshToken(id, (error, results) => {
            console.log(results)
            console.log(error)
            if (error) {
                logger.error(error);
                res.clearCookie("accessToken");
                return res.status(200).json({ message: "Invalid refresh token" });
            }
            res.clearCookie("accessToken");
            return res.status(200).json({ message: "Invalid refresh token" });
        })
    },
    userBasedLoginVerification: async (req, res) => {
        const body = req.body;
        // CHECK USER BASED VALIDATION FIRST CHECK THE PASSWORD CREDENTIAL THEN REST
        userBasedValidationCheck(body, (error, results) => {

            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Incorrect User Credentials",
                });
            }

            if (results.length > 0) {
                const userData = results[0];
                const userPassword = body.passWord
                console.log(userData)
                const validated = compareSync(userPassword, userData.password);

                if (validated) {

                    const {
                        user_slno,
                        name,
                        login_type,
                        password_validity,
                        last_passwd_change_date,
                        password_validity_expiry_date,
                        last_login_date,
                        sign_in_per_day_limit,
                        sign_in_per_day_count,
                        is_limited_user,
                        login_method_allowed,
                        limited_user_validity_end_time,
                    } = userData;

                    const validatingUserLogin = validateUserLoginCheck(
                        password_validity,
                        last_passwd_change_date,
                        last_login_date,
                        sign_in_per_day_limit,
                        sign_in_per_day_count,
                        is_limited_user,
                        login_method_allowed,
                        limited_user_validity_end_time,
                        body.method
                    )

                    const { message, status } = validatingUserLogin;

                    if (status) {
                        return res.status(200).json({
                            success: 1,
                            message,
                        });
                    } else {

                        const accessToken = generateAccessToken(userData);
                        const refreshToken = generateRefreshToken(user_slno);

                        // insert the refresh token
                        insertRefreshToken({ user_slno, refresh_token: refreshToken }, (error, results) => {
                            if (error) {
                                logger.error(error);
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database connection error",
                                });
                            }

                            if (results) {
                                const returnData = {
                                    user_slno,
                                    name,
                                    accessToken,
                                    login_type,
                                };

                                res.cookie("accessToken", accessToken, {
                                    httpOnly: true,
                                    secure: true,
                                    maxAge: process.env.COOKIE_TIME, // 15 min
                                    sameSite: "strict",
                                });

                                res.json({
                                    success: 2,
                                    userInfo: JSON.stringify(returnData),
                                    message: "User Credentials verified successfully",
                                });
                            }
                        });
                    }

                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "Incorrect User Credentials",
                    });
                }
            }
        });
    },
};
