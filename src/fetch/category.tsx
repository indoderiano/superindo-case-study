import axios from 'axios';


export interface ProductCategory {
  id: number
  name: string
  active: boolean
  created_user: string
  created_date: string
  updated_user: string
  updated_date: string
}


export function getAllCategories (access_token) {

    // let API_URL = process.env.REACT_APP_API;
    // console.log("API ENV IS ", API_URL);

    // axios.get(`${API_URL}/product-category/data`)
    // .then((result) => {
    //   console.log(result.data);
    //   setProductCategories(result.data)
    // })
    // .catch((error) => {
    //   console.log(error.response.data.error_description)
    // })

    let fetch = axios.create({
      method: "GET",
      baseURL: `${process.env.REACT_APP_API}/product-category/data`,
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    return fetch



  }