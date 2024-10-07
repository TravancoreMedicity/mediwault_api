// @ts-nocheck
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./logger/logger')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const axios = require('axios');

app.use(cors())
app.use(express.json())


const { generateOTP } = require('./api/usermanagment/user.controller')

const userRegistration = require('./api/usermanagment/user.route')
const selectCmp = require('./api/selectComponets/selectCmp.route')
const docTypeMaster = require('./api/documentTypeMaster/docTypeMaster.route')
const subTypeMaster = require('./api/subTypeMaster/subTypeMaster.route')
const categoryMaster = require('./api/documentCategory/docCategory.route')
const docSubCategory = require('./api/docSubCategoryName/docSubCategory.route')
const docGroup = require('./api/docGroupMaster/docGroup.route')
const institutionType = require('./api/InstituteTyeMaster/instituteType.route')
const institutionMaster = require('./api/InstitutionMaster/institutionMaster.route')
const courseType = require('./api/courseType/courseType.route')
const courseMaster = require('./api/courseMaster/courseMater.route')


app.get('/api/generateOTP/:id', generateOTP)  // generate OTP function

app.use('/api/user', userRegistration)
app.use('/api/selectComponets', selectCmp)
app.use('/api/documentTypeMaster', docTypeMaster)
app.use('/api/subTypeMaster', subTypeMaster)
app.use('/api/documentCategory', categoryMaster)
app.use('/api/docSubCategoryName', docSubCategory)
app.use('/api/docGroupMaster', docGroup)
app.use('/api/instituteType', institutionType)
app.use('/api/institutionMaster', institutionMaster)
app.use('/api/courseType', courseType)
app.use('/api/courseMaster', courseMaster)


// General error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 58888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})