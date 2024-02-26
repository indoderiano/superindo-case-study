import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomeCustomer from '../pages/customer/home_customer.tsx';
import Cart from '../pages/customer/cart.tsx';
import PageProduct from '../pages/customer/product.tsx'
// import { useAppSelector } from '../app/hooks.ts';
// import { selectAccountRole } from '../features/account/accountSlice.ts';


function RouterCustomer() {
  // let role = useAppSelector(selectAccountRole);
  // let isRoleAccepted = role == "customer" ? true : false;

  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomeCustomer />} />
        <Route path="products" element={<PageProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )

}

export default RouterCustomer;


