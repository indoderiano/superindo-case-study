import axios from 'axios';

export interface Transaction {
  id: number
  transaction_no: string
  total_amount: number
  active: boolean
  created_user: string
  created_date: string
  updated_user: string
  updated_date: string
}

export let initialTransaction: Transaction = {
  id: 0,
  transaction_no: "",
  total_amount: 0,
  active: false,
  created_user: "",
  created_date: "",
  updated_user: "",
  updated_date: "",
} 


export function createTransaction (access_token) {
  let fetch = axios.create({
    method: "POST",
    baseURL: `${process.env.REACT_APP_API}/transaction/create`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  return fetch
}

export function getAllTransactions (access_token) {
  let fetch = axios.create({
    method: "GET",
    baseURL: `${process.env.REACT_APP_API}/transaction/data`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  return fetch
}

export function getCartTransaction (access_token) {
  let fetch = axios.create({
    method: "GET",
    baseURL: `${process.env.REACT_APP_API}/transaction/cart`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  return fetch
}

export function checkout (access_token) {
  let fetch = axios.create({
    method: "POST",
    baseURL: `${process.env.REACT_APP_API}/transaction/checkout`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  return fetch
}