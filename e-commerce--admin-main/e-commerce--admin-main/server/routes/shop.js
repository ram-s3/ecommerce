const express = require('express');

const router = express.Router();

const productsroute = require('../controllers/products');
const addUserroute = require("../controllers/adduser");
const addcontactroute = require('../controllers/addcontact');
const productdetails = require('../controllers/productdetails');
const loginuserroute = require('../controllers/login');
const isAuth = require('../middleware/is-auth');


// const newproduct = require('../controllers/newproduct');
// const deleteproduct = require("../controllers/deleteproduct");
// const editproduct = require("../controllers/editproduct");

router.get('/', productsroute.getProducts);

router.post('/signup', addUserroute.postNewUser);

router.post('/contact', addcontactroute.postNewContact);

router.get('/productdetails/:id', productdetails.getProductdetails);

router.post('/login', loginuserroute.loginuser);

// router.post('/newproduct', isAuth, newproduct.addnewproductpost);

// router.delete('/productdetails/:id', isAuth, deleteproduct.deleteproduct);

// router.patch('/productdetails/edit/:id', isAuth, editproduct.editproduct);

module.exports = router;

