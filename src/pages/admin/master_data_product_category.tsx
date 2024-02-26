import React, { useEffect } from 'react'
import { useState } from "react";

import { useAppSelector } from "../../app/hooks.ts"
import { selectAccessToken } from "../../features/account/accountSlice.ts"
import { useNavigate } from 'react-router-dom';
import { getAllCategories, ProductCategory } from '../../fetch/category.tsx';



function MasterDataProductCategory() {

  // DATA
  let access_token = useAppSelector(selectAccessToken);
  let [productCategories, setProductCategories] = useState([]);

  // RENDER STATE
  let [isRequestingCategories, setIsRequestingCategories] = useState(false);
  let [isRequestingCategoriesError, setIsRequestingCategoriesError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  // SERVICE
  let navigate = useNavigate();

  useEffect(() => {
    console.log("THIS IS PRODUCT CATEGORY PAGE");
    requestProductCategories();
  },[])


  let requestProductCategories = () => {

    setIsRequestingCategories(true);
    setIsRequestingCategoriesError(false);
    setErrorMessage("");


    let fetch = getAllCategories(access_token);
    
    fetch("/")
    .then((result) => {
      console.log(result.data);
      setIsRequestingCategories(false);
      setProductCategories(result.data)
    })
    .catch((error) => {
      setIsRequestingCategories(false);
      setErrorMessage("Get Categories Failed");
      // console.log(error.response.data.error_description)
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

      {
        isRequestingCategories?
        <div className="d-flex justify-content-center w-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <></>
      }

      {
        isRequestingCategoriesError?
        <div className="alert alert-danger w-100" role="alert">
          {errorMessage}
        </div>
        :
        <></>
      }

      <div className="ui link cards">
        { renderProductCategories() }
      </div>
    </div>
  );
}

export default MasterDataProductCategory;
