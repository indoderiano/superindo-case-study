import React from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppDispatch } from "../app/hooks.ts"
import { updateUserData } from "../features/account/accountSlice.ts"





function Login() {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useAppDispatch();


  let requestLogin = () => {
    console.log("LOGIN...")
    console.log(username)
    console.log(password)

    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    let payload = {
      username,
      password
    };
    
    axios.post(`${API_URL}/users/login`, payload)
    // axios.get(`${API_URL}/users/users`)
    .then((result) => {
      console.log("login success");
      console.log(result.data);
      let user_data = result.data;
      dispatch(updateUserData(user_data))
    })
    .catch((error) => {
      console.log(error.response.data.error_description)
    })
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
