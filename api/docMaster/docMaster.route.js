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
  getDocMasterLikeNameNonSecureOnly,
  getSearchData,
  updateDocMaster, UpdateRenewDocument, DocDelete, ReplaceDocument, DocApprovals, getNonSecDocMaster
} = require("./docMaster.controller");

router.post("/insertDocMaster", verifyToken, insertDocMaster);
router.get("/getDocMaster", verifyToken, getDocMaster);
router.get("/getDocMasterById/:id", verifyToken, getDocMasterById);
router.get("/getDocMasterLikeName/:id", verifyToken, getDocMasterLikeName);
router.get("/getDocMasterLikeNameNonSecureOnly/:id", verifyToken, getDocMasterLikeNameNonSecureOnly);
router.get("/getDocNonSecure", verifyToken, getDocNonSecure);
router.get("/getDocSecureOnly", verifyToken, getDocSecureOnly);
router.get("/getDocDetl/:id", verifyToken, getDocDetlinfo);
router.get("/getDocTypeCount", verifyToken, getDocTypeCount);
router.post("/getSearchData", verifyToken, getSearchData);
router.patch("/updateDocMaster", verifyToken, updateDocMaster);
router.patch("/updateRenewDocument", verifyToken, UpdateRenewDocument)
router.patch("/DocDelete", verifyToken, DocDelete);
router.patch("/ReplaceDocument", verifyToken, ReplaceDocument);
router.patch("/DocApproval", verifyToken, DocApprovals);
router.get("/getNonSecDocMaster", verifyToken, getNonSecDocMaster);

module.exports = router;


