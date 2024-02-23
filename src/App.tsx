import React from 'react'
import './App.css';
import Login from "./pages/login.tsx"
import Menu from './components/menu/index.tsx'
import { Account } from "./features/account/Account.tsx";
import { useEffect, useState } from 'react';
import { useAppDispatch } from "./app/hooks.ts"
import { updateUserData } from "./features/account/accountSlice.ts"
import { UserData } from './features/account/accountSlice.ts';
import { localstorage_get } from './helper/localstorage.ts';

function App() {

  let [isAuthenticating, setIsAuthenticating] = useState(true);
  let [userToken, setUserToken] = useState("");
  let dispatch = useAppDispatch();

  useEffect(() => {

    console.log("NODE ENV IS ", process.env.NODE_ENV);

    console.log("API ENV IS ", process.env.REACT_APP_API);

    
    console.log("cek localstorage");
    

    let localstorage_data = localstorage_get();

    console.log(localstorage_data);

    
    if ( localstorage_data ) {
      dispatch(updateUserData(localstorage_data))
    }


  },[])



  // CONDITIONAL RENDERING

  // if ( isAuthenticating ) {
  //   return (
  //     <div
  //       className="ui segment"
  //       style={{
  //         height: "100vh",
  //       }}
  //     >
  //       <div className="ui active inverted centered inline dimmer">
  //         <div className="ui large text loader">Authenticating</div>
  //       </div>
  //       <p></p>
  //       <p></p>
  //       <p></p>
  //     </div>
  //   );
  // } else if ( !userToken ) {
  //   return (
  //     <Login />
  //   )
  // } else {
  //   return (
  //     <div>
  //       Home
  //     </div>
  //   )
  // }

  return (
    <div>
      <Menu/>
      <Login/>
    </div>
  )


}

export default App;


