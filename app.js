// @ts-nocheck
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const axios = require('axios');

app.use(cors())
app.use(express.json())


const { generateOTP } = require('./api/usermanagment/user.controller')

const userRegistration = require('./api/usermanagment/user.route')

app.get('/api/generateOTP/:id', generateOTP)  // generate OTP function

app.use('/api/user', userRegistration)

const port = process.env.PORT || 58888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})