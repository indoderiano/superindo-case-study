import React from 'react'
import './App.css';
import Login from "./pages/login.tsx"
import Menu from './components/menu/index.tsx'
import { Account } from "./features/account/Account.tsx";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "./app/hooks.ts"
import { selectAccountRole, updateUserData } from "./features/account/accountSlice.ts"
import { UserData } from './features/account/accountSlice.ts';
import { localstorage_get } from './helper/localstorage.ts';
// import Router from './router/index.tsx';
import RouterGuest from './router/router_guest.tsx';
import RouterAdmin from './router/router_administrator.tsx';
import RouterCustomer from './router/router_customer.tsx';
import { connect } from 'react-redux';


function App() {

  let [isAuthenticating, setIsAuthenticating] = useState(true);
  let [userToken, setUserToken] = useState("");
  let dispatch = useAppDispatch();
  let role = useAppSelector(selectAccountRole);


  useEffect(() => {

    // console.log("NODE ENV IS ", process.env.NODE_ENV);

    // console.log("API ENV IS ", process.env.REACT_APP_API);

    
    // console.log("cek localstorage");
    

    let localstorage_data = localstorage_get();

    // console.log(localstorage_data);

    
    if ( localstorage_data ) {
      dispatch(updateUserData(localstorage_data))
    }


  },[])

  useEffect(() => {
    console.log("ROLE in app");

  },[role])

  console.log("IN APP RENDERING...")

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

// function mapStateToProps(state) {
//   return { role: state.role }
// }

// export default connect(mapStateToProps)(App);

export default App;
