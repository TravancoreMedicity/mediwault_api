const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");

const {
  insertDocMaster,
  getDocMaster,
  getDocMasterById,
  getDocMasterLikeName,
  getDocNonSecure,
  getDocSecureOnly,
  getDocDetlinfo,
  getDocTypeCount,
} = require("./docMaster.controller");

router.post("/insertDocMaster", verifyToken, insertDocMaster);
router.get("/getDocMaster", verifyToken, getDocMaster);
router.get("/getDocMasterById/:id", verifyToken, getDocMasterById);
router.get("/getDocMasterLikeName/:name", verifyToken, getDocMasterLikeName);
router.get("/getDocNonSecure", verifyToken, getDocNonSecure);
router.get("/getDocSecureOnly", verifyToken, getDocSecureOnly);
router.get("/getDocDetl/:id", verifyToken, getDocDetlinfo);
router.get("/getDocTypeCount", verifyToken, getDocTypeCount);

module.exports = router;
