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

app.get('/api/generateOTP/:id', async (req, res) => {
    const mobileNumber = req.params.id;
    const trimmedNumber = mobileNumber.slice(2);
    // First check mobile number registerd or not
    mobileExist(trimmedNumber, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: 1,
                message: "Mobile number not registered"
            });
        }

        if (results.length > 0) {
            const otp = Math.floor(100000 + Math.random() * 900000)
            insertOTP({ mobile: trimmedNumber, otp: otp }, (error, results) => {
                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                if (results) {
                    axios.get(`https://sapteleservices.com/SMS_API/sendsms.php?username=Tmc_medicity&password=c9e780&sendername=TMDCTY&mobile=${mobileNumber}&template_id=1407162012178109509&message=Your+Medicity+App+OTP+code:+${otp}+DuHTEah22dE.Travancore+Medicity+.&routetype=1`).then((response) => {
                        return res.status(200).json({
                            success: 2,
                            message: "OTP sent successfully"
                        });
                    }).catch((error) => {
                        return res.status(200).json({
                            success: 3,
                            message: "Error in sending OTP,Please try again"
                        });
                    })

                }
            })
        }

    })

    // return res.send(`https://api.msg91.com/api/sendhttp.php?sender=AMRIT&route=4&mobiles=${mobile}&authkey=293135AaDjQpHmO9d0f6e7f4&message=Your+OTP+is+${otp}&country=91`)
})


const userRegistration = require('./api/usermanagment/user.route')
const { mobileExist, insertOTP } = require('./api/usermanagment/user.service')


app.use('/api/user', userRegistration)

const port = process.env.PORT || 58888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})