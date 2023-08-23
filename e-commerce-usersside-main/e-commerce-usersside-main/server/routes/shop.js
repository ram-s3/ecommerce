

const express = require('express');

const router = express.Router();

const productsroute = require('../controllers/products');
const addUserroute = require("../controllers/adduser");
const addcontactroute = require('../controllers/addcontact');
const productdetails = require('../controllers/productdetails');
const loginuserroute = require('../controllers/login');
const isAuth = require('../middleware/is-auth');
const searchroute = require("../controllers/searchroute");
const getproductsbycat = require("../controllers/getproductsbycat");
const getuserdetails = require("../controllers/getuserdetails");
const paymentroute = require('../controllers/paymentroute');
const orderroute = require('../controllers/orderroute');
const updateuserroute = require("../controllers/updateuserroute");

// const newproduct = require('../controllers/newproduct');
// const deleteproduct = require("../controllers/deleteproduct");
// const editproduct = require("../controllers/editproduct");

router.get('/', productsroute.getProducts);

router.post('/signup', addUserroute.postNewUser);

router.post('/contact', addcontactroute.postNewContact);

router.get('/productdetails/:id', productdetails.getProductdetails);

router.post('/login', loginuserroute.loginuser);

router.get('/search/:searchquery', searchroute.searchproduct);

router.get('/categoryby/:category', getproductsbycat.getProducts);

router.get('/account/user/:id', getuserdetails.userdetails);

router.post('/payment', paymentroute.payment);

router.get('/ordersby/:userid', orderroute.orderdetails)

router.post('/updateuser', updateuserroute.updateuser);

// router.post('/newproduct', isAuth, newproduct.addnewproductpost);

// router.delete('/productdetails/:id', isAuth, deleteproduct.deleteproduct);

// router.patch('/productdetails/edit/:id', isAuth, editproduct.editproduct);

module.exports = router;

