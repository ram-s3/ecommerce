import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './app.css';
// import Homepage, { loader as productloader } from './pages/Homepage';
// import Productdetails, { loader as productdetailsloader, action as deleteproductaction } from './pages/Productdetails';
// import Navigationlayout from './pages/Navigationlayout';

// import Contactus from './pages/Contactus';
import ErrorPage from './pages/ErrorPage';
// import Editproductpage from './pages/Editproductpage';
// import Newproductpage from './pages/Newproductpage';
// import { action as productaction } from './components/Editform';
// import Authpage from './pages/Authpage';
// import { action as authaction } from './components/Authform';
// import { action as logoutaction } from './pages/Logout';
// import Useraccount from './pages/Useraccount';
import { loader as gettokenloader, authrouteloader } from './util/authtoken';
// import AdminNav from './pages/admin/AdminNav';
import Adminauth, { action as adminauthaction } from './components/admin/Adminauth';


import { action as adminlogoutaction } from './pages/admin/logout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';

import Users from './pages/admin/Users';
import { action } from './components/admin/Newcategoryform';
import Editproductpage from './pages/admin/Editproductpage';

import { action as categoriesaction } from './components/admin/Newcategoryform';
import { loader as categoriesloader } from './pages/admin/Products';
import { action as productaction } from './components/admin/Newproductform';
import { loader as productdata } from './components/admin/Editform';
import { action as editproductaction } from './components/admin/Editform';
import { action as deleteproductaction } from './components/ProductList';
import { action as deletecategoryaction } from './pages/admin/Products';


import { loader as usersloader } from './pages/admin/Users';
import { action as userdeleteaction } from "./pages/admin/Users";


import { loader as orderloader } from './pages/admin/Orders';
import { action as orderstatusaction } from './pages/admin/Orders';


const router = createBrowserRouter([

  // {
  //   path: '/',
  //   id: 'root',
  //   loader: gettokenloader,
  //   element: <Navigationlayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       // index: true, element: <Homepage />, loader: productloader
  //     },
  //     {
  //       path: '/productdetails/:id/',
  //       // id: 'productdetails',
  //       loader: productdetailsloader,
  //       element: <Productdetails />
  //     },
  //     //   children: [
  //     //     { index: true, element: <Productdetails />, action: deleteproductaction },
  //     //     { path: 'edit', element: <Editproductpage />, action: productaction, loader: authrouteloader },

  //     //   ]
  //     // },
  //     { path: '/auth', element: <Authpage />, action: authaction },

  //     // { path: '/admin/newproduct', element: <Newproductpage />, action: productaction, loader: authrouteloader },

  //     { path: '/contactus', element: <Contactus /> },
  //     { path: '/logout', action: logoutaction },
  //     { path: '/useraccount', element: <Useraccount />, loader: authrouteloader }
  //   ]
  // },
  {
    path: '/admin',
    id: 'adminroot',
    loader: gettokenloader,
    element: <Adminauth />,
    action: adminauthaction,



  },
  {
    path: '/admin/dashboard',
    errorElement: <ErrorPage />,
    element: <AdminDashboard />,
    id: 'dashboardstarting',
    children: [
      {
        path: 'products',
        element: <Products />,
        action: productaction,
        loader: categoriesloader,

      },
      {
        path: 'products/newcategory',
        action: categoriesaction,
      },

      {
        path: 'products/edit/:id', element: <Editproductpage />,
        action: editproductaction,
        loader: productdata

      },

      {
        path: 'products/delete/:id',
        action: deleteproductaction
      },

      {
        path: 'products/delete/category/:id',
        action: deletecategoryaction
      },

      // usersroutes


      {
        path: 'users', element: <Users />, loader: usersloader
      },


      {
        path: 'users/delete/:id',
        action: userdeleteaction
      },



      {
        path: 'orders', element: <Orders />, loader: orderloader
      },

      {
        path: 'orders/setstatus/:id',
        action: orderstatusaction
      },



      // {
      //   path: 'productdetails/:id/',
      //   id: 'productdetails',
      //   loader: productdetailsloader,

      //   children: [
      //     { index: true, element: <Productdetails />, action: deleteproductaction },
      //     { path: 'edit', element: <Editproductpage />, action: productaction, loader: authrouteloader },

      //   ]
      // },
      // { path: 'newproduct', element: <Newproductpage />, action: productaction, loader: authrouteloader },


    ]

  },

  { path: '/admin/logout', action: adminlogoutaction },

]


);


function App() {

  return <RouterProvider router={router} />;

}

export default App;
