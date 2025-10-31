const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { getModulewiseMenus, ModulewiseMenus, createGroupRights, updateGroupMenuRits, UserWiseSettingsRights } = require('./UserGroupRightMaster.controller');

router.get('/getModulewiseMenus/:id', verifyToken, getModulewiseMenus)
router.get("/ModulewiseMenus/:logId", verifyToken, ModulewiseMenus);
//new try
router.post("/", verifyToken, createGroupRights)
router.patch("/", verifyToken, updateGroupMenuRits)
router.get("/userWiseSettingsRights/:loggedUser", verifyToken, UserWiseSettingsRights);
module.exports = router

