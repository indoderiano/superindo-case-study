import axios from 'axios';


export function login () {

    // let API_URL = process.env.REACT_APP_API;
    // console.log("API ENV IS ", API_URL);

    let fetch = axios.create({
      method: "POST",
      baseURL: `${process.env.REACT_APP_API}/users/login`,
      // headers: { 'Content-Type': 'application/json' },
      // url: "/users/login", // must have a starting backslash: /foo
      // params: props.params,
      // data: payload,
      // withCredentials: true,
    })

    return fetch



    // try {
    //   let result = await axios.post(`${API_URL}/users/login`, payload);

    //   console.log("login success in fetch");
    //   return result
    // } catch(error) {
    //   throw error
    // }



  }