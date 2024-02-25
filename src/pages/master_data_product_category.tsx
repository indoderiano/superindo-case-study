import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppDispatch } from "../app/hooks.ts"
import { updateUserData } from "../features/account/accountSlice.ts"
import { localstorage_set } from '../helper/localstorage.ts';
import { Link, redirect, useNavigate } from 'react-router-dom';

interface ProductCategory {
  id: number
  name: string
  active: boolean
  created_user: string
  create_date: string
  update_user: string
  created_date: string
}



function MasterDataProductCategory() {

  // let [username, setUsername] = useState("");
  // let [password, setPassword] = useState("");

  // let dispatch = useAppDispatch();

  let [productCategories, setProductCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    console.log("THIS IS PRODUCT CATEGORY PAGE");
    requestProductCategories();
  },[])


  let requestProductCategories = () => {

    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    
    axios.get(`${API_URL}/product-category/data`)
    .then((result) => {
      console.log(result.data);
      setProductCategories(result.data)
    })
    .catch((error) => {
      console.log(error.response.data.error_description)
    })
  }


  let renderProductCategories = () => {
    return productCategories.map((category: ProductCategory) => {
      return (
        <div className="card" key={category.id}
          onClick={()=>{
            navigate(`/products?category=${category.id}`);
            // redirect(`/products?category=${category.id}`);
          }}
        >
          {/* <NavLink to={`/products?category=${category.id}`}> */}
            <div className="content">
              <div className="header">{category.name}</div>
              <div className="meta">
                <a>{category.created_user}</a>
              </div>
              {/* <div className="description">
                Matthew is an interior designer living in New York.
              </div> */}
            </div>
            <div className="extra content">
              <span className="right floated">
                Created in {category.created_date}
              </span>
              {/* <span>
                <i className="user icon"></i>
                75 Friends
              </span> */}
            </div>
          {/* </NavLink> */}
          {/* <Link to={`/products?category=${category.id}`} className='item'> */}
          {/* </Link> */}
        </div>
      )
    })
  }


  return (
    <div
      style={{
        padding: "2rem"
      }}
    >
      <h1 className="ui header">Product Categories</h1>

      <div className="ui link cards">
        { renderProductCategories() }
      </div>
    </div>
  );
}

export default MasterDataProductCategory;
