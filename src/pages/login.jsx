import { useState } from "react";




function Login() {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");


  let requestLogin = () => {
    console.log("LOGIN...")
    console.log(username)
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
                onInput={(e)=>{
                  setUsername(e.target.value);
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
                <input type="checkbox" tabindex="0" className="hidden"/>
                <label>I agree to the Terms and Conditions</label>
              </div>
            </div>
            <button
              className="ui button"
              // type="submit"
              onClick={requestLogin}
            >Submit</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
