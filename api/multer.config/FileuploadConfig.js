// @ts-nocheck
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../../logger/logger');

// Define a base directory where all uploads will be stored
const baseDirectory = 'D:/DocMeliora/Inteliqo';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const body = req.body

        console.log(req.body)
        //Create a CUSTOM FOOLDRER with id

        const folderName = `DOC17102025`
        const uploadPath = path.join(baseDirectory, folderName)
        // Log the folder path to verify

        // Check if the folder exists or create it
        if (!fs.existsSync(uploadPath)) {
            try {
                fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder
            } catch (error) {
                logger.error(error)
                return cb(error);
            }
        }

        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const newFileName = `DOC${Date.now()}${extension}`;
        cb(null, newFileName)
    }
})

const maxSize = 10 * 1024 * 1024

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /pdf|jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        logger.error('Error: Only .png, .jpg, .jpeg and .pdf files are allowed!')
        cb('Error: Only .png, .jpg, .jpeg and .pdf files are allowed!');
    }
}


const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array('file', 10)

module.exports = {
    uploadFile
}