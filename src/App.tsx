import React from 'react'
import './App.css';
import Menu from './components/menu/index.tsx'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "./app/hooks.ts"
import { selectAccountRole, updateUserData } from "./features/account/accountSlice.ts"
import { localstorage_get } from './helper/localstorage.ts';
import RouterGuest from './router/router_guest.tsx';
import RouterAdmin from './router/router_administrator.tsx';
import RouterCustomer from './router/router_customer.tsx';


function App() {

  let [isAuthenticating, setIsAuthenticating] = useState(true);
  let [userToken, setUserToken] = useState("");
  let dispatch = useAppDispatch();
  let role = useAppSelector(selectAccountRole);


  useEffect(() => {
    let localstorage_data = localstorage_get();
    
    if ( localstorage_data ) {
      dispatch(updateUserData(localstorage_data))
    }
  },[])


  if ( role == "administrator" ) {
    return (
      <div>
        <Menu/>
        <RouterAdmin/>
      </div>
    )
  } else if ( role == "customer" ) {
    return (
      <div>
        <Menu/>
        <RouterCustomer/>
      </div>
    )
  } else {
    return (
      <div>
        <Menu/>
        <RouterGuest/>
      </div>
    )
  }

}


export default App;
