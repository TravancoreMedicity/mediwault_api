
const mysql = require('mysql2');

const hrm_pool = mysql.createPool({
    host: process.env.DB_HOST_HRM,
    user: process.env.DB_USER_HRM,
    password: process.env.DB_PASS_HRM,
    database: process.env.MYSQL_DB_HRM,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});


module.exports = hrm_pool