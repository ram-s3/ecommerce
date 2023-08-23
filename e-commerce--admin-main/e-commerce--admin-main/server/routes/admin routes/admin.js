const express = require('express');


const router = express.Router();

const newproduct = require('../../controllers/admin/newproduct');
const newcategory = require("../../controllers/admin/newcategory");
const getcategories = require("../../controllers/admin/prodcat");
const deleteproduct = require("../../controllers/admin/deleteproduct");
const editproduct = require("../../controllers/admin/editproduct");
const loginroute = require("../../controllers/admin/adminlogin");
const isAuth = require('../../middleware/is-auth');
const getProducts = require("../../controllers/admin/getproducts");
const productdetails = require("../../controllers/productdetails");
const deleteCategory = require("../../controllers/admin/deleteCategory");

// user route imports

const getusers = require('../../controllers/admin/users/getusers');
const deluser = require('../../controllers/admin/users/deleteuser');

//order route imports
const getorders = require('../../controllers/admin/Orders/getorders')
const setorderstatus = require("../../controllers/admin/Orders/setorderstatus");




router.get('/products', getProducts.getProducts);



router.post('/login', loginroute.adminlogin);



router.post('/newproduct', newproduct.addnewproductpost);

router.patch('/products/newcategory', isAuth, newcategory.addnewcategory);

router.get('/productcategories', getcategories.getprodcat);

router.get('/productdetails/:id', productdetails.getProductdetails)

router.delete('/productdetails/delete/:id', deleteproduct.deleteproduct);

router.delete('/category/delete/:id', deleteCategory.deleteCategory);

router.patch('/productdetails/edit/:id', editproduct.editproduct);


//user routes

router.get('/getusers', getusers.getusers);

router.delete('/deleteuser/:id', deluser.deleteuser);

//orders routes

router.get('/getorders', getorders.getorders);
router.patch('/order/setstatus/:id', setorderstatus.setorderstatus);

module.exports = router;
