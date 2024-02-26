import React from 'react'

import { useAppSelector } from "../../app/hooks.ts"
import { selectAccountRole } from '../../features/account/accountSlice.ts';

import MenuAdmin from "./menu_admin.tsx"
import MenuCustomer from './menu_customer.tsx';
import MenuGuest from './menu_guest.tsx';



function Menu() {
  let role = useAppSelector(selectAccountRole);

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
      <MenuGuest/>
    )
  };
}

export default Menu;