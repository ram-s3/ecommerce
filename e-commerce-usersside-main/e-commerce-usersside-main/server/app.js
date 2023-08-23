const express = require('express');
const bodyparser = require("body-parser");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const mongoConnectimport = require('./util/database');

const shoproutes = require('./routes/shop');
const adminroutes = require('./routes/admin routes/admin');
const app = express();

const filestorage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/images');
    },
    filename: (req, file, cd) => {
        cd(null, uuidv4() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cd(null, false);
    }
}

var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.use(bodyparser.json());
app.use(cors());
app.use(multer({ storage: filestorage, fileFilter: fileFilter }).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,PATCH");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
    next();
})


app.use(shoproutes);
app.use("/admin", adminroutes);

mongoConnectimport.mongoConnect(() => {
    app.listen(8080);
})