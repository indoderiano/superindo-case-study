import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from '../pages/home.tsx';
import Login from '../pages/login.tsx';
import ManageTransaction from '../pages/manage_transaction.tsx';
import Transaction from '../pages/transaction.tsx';
import Cart from '../pages/cart.tsx';
import Menu from '../components/menu/index.tsx';


function RouterCustomer() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="transaction" element={<Transaction />} />
        {/* <Route path="manage-transaction" element={<ManageTransaction />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  )


}

export default RouterCustomer;


