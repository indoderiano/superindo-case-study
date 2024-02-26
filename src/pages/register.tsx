import React, { useEffect } from 'react'
import { useState } from "react";
import { register } from '../fetch/auth.tsx' 




function Register() {

  // DATA
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // RENDER STATE
  let [isRegistering, setIsRegistering] = useState(false);
  let [isRegisterError, setIsRegisterError] = useState(false);
  let [isRegisterSucceed, setIsRegisterSucceed] = useState(false);
  let [errorMessage, setErrorMessage] = useState("")


  let requestRegister = async () => {

    setIsRegistering(true);
    setIsRegisterError(false);
    setErrorMessage("");

    let fetch = register();

    fetch({
      data: {
        username, email, password
      }
    })
    .then((result) => {
      setIsRegistering(false);
      setIsRegisterSucceed(true);
    })
    .catch((error) => {
      setIsRegisterError(true);
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
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e)=>{
                  setEmail(e.target.value)
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
                    requestRegister();
                  }
                }}
              />
            </div>
            <button
              className="ui button mt-5"
              // type="submit"
              onClick={requestRegister}
              disabled={isRegistering || isRegisterSucceed}
              // onClick={() => dispatch(updateRole("customer"))}
            >Submit</button>

            {
              isRegisterError ?
              <div className="alert alert-danger w-100" role="alert">
                {errorMessage}
              </div>
              :
              <></>
            }
            {
              isRegisterSucceed ?
              <div className="ui blue message mb-4">Register Successful</div>
              :
              <></>
            }
          </div>
      </div>
    </div>
  );
}

export default Register;
