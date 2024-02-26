import axios from 'axios';


export interface Product {
  id: number
  product_id: number
  product_category_id: string
  code: string
  plu: string
  name: string
  product_name: string
  active: boolean
  qty: number
  price: number
  created_user: string
  created_date: string
  updated_user: string
  updated_date: string
}

export let initialProduct: Product = {
  id: 0,
  product_id: 0,
  product_category_id: "",
  code: "",
  plu: "",
  name: "",
  product_name: "",
  active: false,
  qty: 0,
  price: 0,
  created_user: "",
  created_date: "",
  updated_user: "",
  updated_date: "",
}

export function getProducts (category_id) {
    let fetch = axios.create({
      method: "GET",
      baseURL: `${process.env.REACT_APP_API}/product/data-category/${category_id}`
    })

    return fetch
}