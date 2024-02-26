import React, { useEffect, useState } from 'react';
import { localstorage_clear } from '../helper/localstorage.ts';
import { reset, selectAccountRole } from '../features/account/accountSlice.ts';
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';




function Logout() {

  // useEffect(() => {
  //   console.log()
  // },[])

  let role = useAppSelector(selectAccountRole);
  let dispatch = useAppDispatch();

  let logout = () => {
    console.log("LOGOUT");
    localstorage_clear();
    dispatch(reset());

    console.log("after logout, ROLE = ", role);
    // reset();
  }

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={logout}
    >
      Logout
    </div>
  );
}


export default Logout;
