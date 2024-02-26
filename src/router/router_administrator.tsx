import React from 'react'
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import Home from '../pages/home.tsx';
import Login from '../pages/login.tsx';
import ManageTransaction from '../pages/admin/manage_transaction.tsx';
import Transaction from '../pages/transaction.tsx';
import Cart from '../pages/cart.tsx';
import Menu from '../components/menu/index.tsx';
import MasterDataProductCategory from '../pages/admin/master_data_product_category.tsx';
import MasterDataProduct from '../pages/admin/master_data_product.tsx';


function RouterAdmin() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="product-category" element={<MasterDataProductCategory />} />
        <Route path="products" element={<MasterDataProduct />} />
        {/* <Route path="transaction" element={<Transaction />} /> */}
        <Route path="manage-transaction" element={<ManageTransaction />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="cart" element={<Cart />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )


}

export default RouterAdmin;


