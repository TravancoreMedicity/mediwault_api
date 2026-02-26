// @ts-nocheck
require("dotenv").config();
const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const UAParser = require('ua-parser-js');


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
    userBasedValidationCheck,
    userBasedInsertRefreshToken, getAllSuperUsers, verifyOTPforPrint, insertLoginActivity
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
                            otp: otp
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
                    printer_access
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

                if (status) {
                    return res.status(200).json({
                        success: 1,
                        message,
                    });
                } else {

                    const accessToken = generateAccessToken(userData);
                    const refreshToken = generateRefreshToken(user_slno);

                    //to get the IP Address
                    const clientIP =
                        req.headers["x-forwarded-for"]?.split(",").shift() ||
                        req.socket?.remoteAddress ||
                        req.connection?.remoteAddress;

                    // Optional: clean up IPv6 localhost format "::ffff:192.168.1.10"
                    const IPAddress = clientIP?.replace("::ffff:", "") || "unknown";

                    const userAgent = req.headers['user-agent'] || 'Unknown';

                    // for getting browser details
                    const parser = new UAParser(userAgent);
                    const result = parser.getResult();

                    const browserName = result.browser.name || 'Unknown';
                    const browserVersion = result.browser.version || 'Unknown';
                    const osName = result.os.name || 'Unknown';
                    const osVersion = result.os.version || 'Unknown';


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
                            // Call the next log table insert function here
                            insertLoginActivity({ user_slno, IPAddress, browserName, browserVersion, osName, osVersion }, (err, loginResult) => {
                                if (err) {
                                    logger.error(err);
                                    return res.status(500).json({
                                        success: 0,
                                        message: "Error inserting login activity",
                                    });
                                }

                                // Continue response only after both inserts are successful
                                const returnData = {
                                    user_slno,
                                    name,
                                    accessToken,
                                    login_type,
                                    printer_access,
                                    IPAddress,
                                    browserName,
                                    browserVersion,
                                    osName,
                                    osVersion
                                };

                                res.cookie("accessToken", accessToken, {
                                    httpOnly: true,
                                    secure: true,
                                    maxAge: process.env.COOKIE_TIME,
                                    sameSite: "strict",
                                });

                                res.json({
                                    success: 2,
                                    userInfo: JSON.stringify(returnData),
                                    message: "OTP verified successfully",
                                });
                            });
                        }
                    });
                }
            }
        });
    },



    getRefershToken: (req, res) => {
        const id = req.params.id;
        getRefershToken(id, (error, results) => {

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
                                secure: false,
                                maxAge: process.env.COOKIE_TIME, // 15 min
                                sameSite: "lax",
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
                        printer_access
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
                        userBasedInsertRefreshToken({ user_slno, refresh_token: refreshToken }, (error, results) => {
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
                                    printer_access

                                };


                                res.cookie("accessToken", accessToken, {
                                    secure: true,// Set to false for HTTP (localhost). Use true for HTTPS (production).
                                    maxAge: process.env.COOKIE_TIME,// Optional: sets cookie expiry time in milliseconds  15 min
                                    sameSite: "Lax", // Helps with CSRF protection; strict is better than lax for security reasons
                                    // in Production change samsite : "None" and the secure:true for  only https 
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

    getAllSuperUsers: (req, res) => {
        getAllSuperUsers((error, results) => {
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

    verifyOTPforPrint: async (req, res) => {
        const body = req.body;
        verifyOTPforPrint(body, async (error, results) => {
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
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Entered OTP Matched",
                });
            }
        });
    }
};
