require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const axios = require('axios');

app.use(cors())
app.use(express.json())

const userRegistration = require('./api/usermanagment/user.route')


app.use('/api/user', userRegistration)

app.get('/api/generateOTP', async (req, res) => {

    const mobile = req.body.mobile
    const otp = Math.floor(100000 + Math.random() * 900000)
    axios.get(`https://sapteleservices.com/SMS_API/sendsms.php?username=Tmc_medicity&password=c9e780&sendername=TMDCTY&mobile=919846009616&template_id=1407162012178109509&message=Your+Medicity+App+OTP+code:+${otp}+DuHTEah22dE.Travancore+Medicity+.&routetype=1`)
    // return res.send(`https://api.msg91.com/api/sendhttp.php?sender=AMRIT&route=4&mobiles=${mobile}&authkey=293135AaDjQpHmO9d0f6e7f4&message=Your+OTP+is+${otp}&country=91`)
})


const port = process.env.PORT || 58888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})