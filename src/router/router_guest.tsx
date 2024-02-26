import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/home.tsx';
import Login from '../pages/login.tsx';
import Register from '../pages/register.tsx'


function RouterGuest() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Route>
    </Routes>
  )


}

export default RouterGuest;


