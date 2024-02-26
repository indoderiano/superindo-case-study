import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppDispatch } from "../app/hooks.ts"
import { updateUserData, UserData } from "../features/account/accountSlice.ts"
import { localstorage_set } from '../helper/localstorage.ts';
import { login } from '../fetch/auth.tsx' 




function Login() {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useAppDispatch();

  useEffect(() => {
    console.log("THIS IS LOGIN PAGE");
  })


  let requestLogin = async () => {
    console.log("LOGIN...")
    // console.log(username)
    // console.log(password)


    let fetch = login();

    fetch({
      data: {
        username, password
      }
    })
    .then((result) => {
      console.log("login success");
      console.log(result);
      let user_data = result.data;
      console.log(user_data)
      dispatch(updateUserData(user_data));
      localstorage_set(user_data);
    })
    .catch((error) => {
      console.log(error)
    })


    // try {
    //   let result = await login(username, password);

    //   console.log("login success");
    //   console.log(result.data);
    //   let user_data = result.data;
    //   console.log(user_data)
    //   dispatch(updateUserData(user_data));
    //   localstorage_set(user_data);
    // } catch (e) {
    //   console.log(e)
    // }


    // let payload = {
    //   username,
    //   password
    // };
    
    // axios.post(`${API_URL}/users/login`, payload)
    // // axios.get(`${API_URL}/users/users`)
    // .then((result) => {
    //   console.log("login success");
    //   console.log(result.data);
    //   let user_data = result.data;
    //   dispatch(updateUserData(user_data));
    //   localstorage_set(user_data);
    // })
    // .catch((error) => {
    //   console.log(error.response.data.error_description)
    // })

  }


  return (
    <div>
      <div 
        className="ui grid centered container"
        style={{
          paddingTop: "8rem"
        }}
      >
          <div
            className="ui form card column eight wide"
            style={{
              padding: "2rem"
            }}
          >
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                name="first-name"
                placeholder="Username"
                value={username}
                onInput={(event: React.ChangeEvent<HTMLInputElement>)=>{
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Last Name"
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" className="hidden"/>
                <label>I agree to the Terms and Conditions</label>
              </div>
            </div>
            <button
              className="ui button"
              // type="submit"
              onClick={requestLogin}
              // onClick={() => dispatch(updateRole("customer"))}
            >Submit</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
