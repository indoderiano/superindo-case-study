import React, { useEffect } from 'react'
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectAccountRole } from '../../features/account/accountSlice.ts';

import MenuAdmin from "./menu_admin.tsx"
import MenuCustomer from './menu_customer.tsx';



function Menu() {


  let role = useAppSelector(selectAccountRole);

  // useEffect(() => {
  //   console.log("THIS IS MENU")
  //   console.log(role)
  // }, [])

  console.log("THIS IS MENU");
  console.log("ROLE IS ", role);

  if ( role == "customer" ) {
    return (
      <MenuCustomer/>
    )
  } else if ( role == "administrator" ) {
    return (
      <MenuAdmin/>
    )
  } else {
    return (
      <></>
    )
  };
}

export default Menu;
