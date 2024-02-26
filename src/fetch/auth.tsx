import axios from 'axios';

export function login () {
    let fetch = axios.create({
      method: "POST",
      baseURL: `${process.env.REACT_APP_API}/users/login`,
    })

    return fetch
}

export function register () {
  let fetch = axios.create({
    method: "POST",
    baseURL: `${process.env.REACT_APP_API}/users/register`,
  })

  return fetch
}