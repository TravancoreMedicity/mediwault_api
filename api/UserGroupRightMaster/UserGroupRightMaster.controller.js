const logger = require('../../logger/logger');

const { getModulewiseMenus, ModulewiseMenus, validateGroupRights, getMenuSlno, insertGroupRight, getGroupMenuRigths, updateGroupMenuRights, UserWiseSettingsRights } = require('./UserGroupRightMaster.service');

module.exports = {

    getModulewiseMenus: (req, res) => {
        const id = req.params.id;
        getModulewiseMenus(id, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            // Ensure results is an array before checking length
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    ModulewiseMenus: (req, res) => {
        const id = req.params.module_name;
        ModulewiseMenus(id, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            // Ensure results is an array before checking length
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    createGroupRights: (req, res) => {

        const body = req.body;
        const body_result = body;

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        validateGroupRights(body, (err, results) => {

            const value = JSON.parse(JSON.stringify(results))

            if (Object.keys(value).length === 0) {

                // Insert the values
                getMenuSlno(body, (err, results) => {

                    const postData = {
                        user_group_slno: body.user_group_slno,
                        module_slno: body.module_slno
                    }

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    const menuSLno = JSON.parse(JSON.stringify(results))

                    const menuDetl = menuSLno.map((val) => {
                        const newArray = [body.user_group_slno, body.module_slno, val.menu_slno]
                        return newArray;
                    })

                    insertGroupRight(menuDetl, (err, results) => {
                        if (err) {
                            // logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        if (results) {

                            getGroupMenuRigths(body, (err, results) => {

                                if (err) {
                                    logger.errorLogger(err)
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }

                                if (!results) {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "No Data Found"
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    data: results,
                                    message: "Updated Successfully"
                                });
                            })
                        }
                    });

                })

            } else {
                //Get The Selected Values
                getMenuSlno(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const menuSLno = JSON.parse(JSON.stringify(results))
                    let array = menuSLno?.filter((row) => {
                        return !value?.find((val) => {
                            return row.menu_slno === val.menu_slno;
                        })
                    })
                    if (Object.keys(array).length === 0) {
                        getGroupMenuRigths(body, (err, results) => {

                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }

                            if (!results) {
                                return res.status(200).json({
                                    success: 0,
                                    message: "No Data Found"
                                });
                            }

                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Updated Successfully"
                            });
                        })

                    } else {
                        const menuDetl = array.map((val) => {
                            const newArray = [body.user_group_slno, body.module_slno, val.menu_slno]
                            return newArray;
                        })

                        insertGroupRight(menuDetl, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            if (results) {

                                getGroupMenuRigths(body, (err, results) => {

                                    if (err) {
                                        logger.errorLogger(err)
                                        return res.status(200).json({
                                            success: 0,
                                            message: err
                                        });
                                    }

                                    if (!results) {
                                        return res.status(200).json({
                                            success: 0,
                                            message: "No Data Found"
                                        });
                                    }

                                    return res.status(200).json({
                                        success: 1,
                                        data: results,
                                        message: "Updated Successfully"
                                    });
                                })
                            }
                        });
                    }
                })
            }
        })
    },
    updateGroupMenuRits: (req, res) => {
        const body = req.body
        updateGroupMenuRights(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data Found"
                });
            }
            if (results) {

                getGroupMenuRigths(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully",
                        data: results
                    });
                })
            }
        })
    },

    UserWiseSettingsRights: (req, res) => {
        const id = req.params.loggedUser;
        // console.log(" req.params.", req.params);

        UserWiseSettingsRights(id, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            // Ensure results is an array before checking length
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}