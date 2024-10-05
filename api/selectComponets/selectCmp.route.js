const router = require('express').Router();

const { docMainTypeMaster } = require('./selectCmp.controller');


router.get('/docMainTypeMaster', docMainTypeMaster);


module.exports = router