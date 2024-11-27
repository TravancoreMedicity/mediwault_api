// @ts-nocheck
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./logger/logger");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // in Production change the URL Name <-- remember this
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// General error handling middleware

//for log the error
app.use(morgan("dev"));
//for log the error in console log file
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    message: "unexpected error was occured",
  });
});

//VALIDATE TOKEN
const activeUsers = {};

const { generateOTP } = require("./api/usermanagment/user.controller");

const userRegistration = require("./api/usermanagment/user.route");
const selectCmp = require("./api/selectComponets/selectCmp.route");
const docTypeMaster = require("./api/documentTypeMaster/docTypeMaster.route");
const subTypeMaster = require("./api/subTypeMaster/subTypeMaster.route");
const categoryMaster = require("./api/documentCategory/docCategory.route");
const docSubCategory = require("./api/docSubCategoryName/docSubCategory.route");
const docGroup = require("./api/docGroupMaster/docGroup.route");
const institutionType = require("./api/InstituteTyeMaster/instituteType.route");
const institutionMaster = require("./api/InstitutionMaster/institutionMaster.route");
const courseType = require("./api/courseType/courseType.route");
const courseMaster = require("./api/courseMaster/courseMater.route");
const docMaster = require("./api/docMaster/docMaster.route");
const { validateToken } = require("./api/tokenValidation/tokenValidation");

app.get("/api/generateOTP/:id", generateOTP); // generate OTP function
app.get("/api/validateToken", validateToken);
app.use("/api/docMaster", docMaster);
app.use("/api/user", userRegistration);
app.use("/api/selectComponets", selectCmp);
app.use("/api/documentTypeMaster", docTypeMaster);
app.use("/api/subTypeMaster", subTypeMaster);
app.use("/api/documentCategory", categoryMaster);
app.use("/api/docSubCategoryName", docSubCategory);
app.use("/api/docGroupMaster", docGroup);
app.use("/api/instituteType", institutionType);
app.use("/api/institutionMaster", institutionMaster);
app.use("/api/courseType", courseType);
app.use("/api/courseMaster", courseMaster);

// io.on("connection", (socket) => {

//   socket.on("login", ({ userId }) => {
//     if (activeUsers[userId]) {
//       // Disconnect previous client if the user is already logged in
//       const previousSocket = activeUsers[userId];
//       previousSocket.emit("multiple-login", "You have been logged out due to login from another device.");
//       previousSocket.disconnect();
//     }

//     // Store the current user and socket
//     activeUsers[userId] = socket;

//     console.log(`User ${userId} logged in with socket ${socket.id}`);
//   });

//   socket.on("disconnect", () => {
//     // Remove the user from active users on disconnection
//     for (const [userId, userSocket] of Object.entries(activeUsers)) {
//       if (userSocket.id === socket.id) {
//         delete activeUsers[userId];
//         console.log(`User ${userId} disconnected`);
//       }
//     }
//   });
// });


const port = process.env.PORT || 58888;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
