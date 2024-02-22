import React from 'react'
import './App.css';
import Login from "./pages/login.tsx"
import Menu from './components/menu/index.tsx'
import { Account } from "./features/account/Account.tsx";
import { useEffect, useState } from 'react';

function App() {

  let [isAuthenticating, setIsAuthenticating] = useState(true);
  let [userToken, setUserToken] = useState("");

  useEffect(() => {

    console.log("NODE ENV IS ", process.env.NODE_ENV);

    console.log("API ENV IS ", process.env.REACT_APP_API);


    // let API_URL = process.env.REACT_APP_API;

    // console.log(API_URL);
    
    console.log("cek localstorage");

    let data_localstorage = JSON.parse( localStorage.getItem("superindo") || "''" );

    console.log(data_localstorage);

    if ( data_localstorage ) {
      setUserToken(data_localstorage.username);
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


