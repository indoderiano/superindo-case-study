import React from 'react'
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import Home from '../pages/home.tsx';
import Login from '../pages/login.tsx';
import ManageTransaction from '../pages/manage_transaction.tsx';
import Transaction from '../pages/transaction.tsx';
import Cart from '../pages/cart.tsx';
import Menu from '../components/menu/index.tsx';


function RouterGuest() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Route>
    </Routes>
  )


}

export default RouterGuest;


