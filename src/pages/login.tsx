import React from 'react'
import { useState } from "react";

import { useAppDispatch } from "../app/hooks.ts"
import { updateUserData } from "../features/account/accountSlice.ts"
import { localstorage_set } from '../helper/localstorage.ts';
import { login } from '../fetch/auth.tsx' 




function Login() {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useAppDispatch();


  let requestLogin = async () => {

    let fetch = login();

    fetch({
      data: {
        username, password
      }
    })
    .then((result) => {
      let user_data = result.data;
      dispatch(updateUserData(user_data));
      localstorage_set(user_data);
    })
    .catch((error) => {
      console.log(error)
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    requestLogin();
                  }
                }}
              />
            </div>
            <button
              className="ui button mt-5"
              // type="submit"
              onClick={requestLogin}
            >Submit</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
