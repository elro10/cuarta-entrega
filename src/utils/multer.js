import multer from "multer";
import path from "path";
import { __dirname, __filename } from "./utils.js";
import fs from "fs"

//filtro de archivos
const validFields = (body) => {
    const { identificacion, domicilio, estadoDeCuenta } = body;
    if (!identificacion || !domicilio || !estadoDeCuenta) {
        return false;
    } else {
        return true;
    }
}

const filterExistance = (req,file,cb) => {
    const isValid = validFields(req.body);
    console.log(req.body);
    !isValid ? cb(null, false) : cb(null,true);
}


//profile pic Upload
const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/images"))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.email}-profile-${file.originalname}`)
    }
});

//documents upload
const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/documents"))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.params.uid}-document-${file.originalname}`)
    }
});


export const uploaderDocuments = multer({ storage: documentStorage});
export const uploaderProfile = multer({ storage: profilePicStorage });