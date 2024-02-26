import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectAccessToken, updateUserData } from "../../features/account/accountSlice.ts"
import { localstorage_set } from '../../helper/localstorage.ts';
import { useSearchParams } from 'react-router-dom';

interface Product {
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

let initialProduct: Product = {
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



function PageProduct() {

  // let [username, setUsername] = useState("");
  // let [password, setPassword] = useState("");

  // let dispatch = useAppDispatch();
  // let role = useAppSelector(selectAccountRole);

  let access_token = useAppSelector(selectAccessToken);

  let [isRequestingData, setIsRequestingData] = useState(false);
  let [isAddingToCart, setIsAddingToCart] = useState(false);
  let [isProductAdded, setIsProductAdded] = useState(false);
  let [isRequestError, setIsRequestError] = useState(false);
  let [isAddingToCartError, setIsAddingToCartError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");


  let [productVariants, setProductVariants] = useState([]);
  let [selectedProductVariant, setSelectedProductVariant] = useState(initialProduct);
  let [inputQty, setInputQty] = useState(0);

  const [searchParams] = useSearchParams();
  const category_id = searchParams.get('category');

  useEffect(() => {
    console.log("THIS IS PRODUCT PAGE");

    console.log("category id = ", category_id);

    requestProductsByCategory();
  },[])

  useEffect(() => {
    requestProductsByCategory();
  }, [category_id])

  useEffect(() => {
    setInputQty(0);
    setIsAddingToCartError(false);
    setErrorMessage("");
  }, [selectedProductVariant])


  let requestProductsByCategory = () => {

    setIsRequestingData(true);
    setIsRequestError(false);
    setErrorMessage("");

    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    // http://localhost:4000/product/data-category/2
    
    axios.get(`${API_URL}/product/data-category/${category_id}`)
    .then((result) => {
      console.log(result.data);
      setProductVariants(result.data);
      setIsRequestingData(false)
      // setProductCategories(result.data)
    })
    .catch((error) => {
      // console.log(error.response.data.error_description)
      setIsRequestError(true);
      setErrorMessage("Request data failed");
      setIsRequestingData(false)
    })
  }

  let requestAddTransaction = () => {
    setIsAddingToCart(true);
    setIsAddingToCartError(false);

    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    let payload = {
      product_variant_id: selectedProductVariant.id,
      price: selectedProductVariant.price,
      qty: inputQty,
      subtotal: selectedProductVariant.price*inputQty,
    };

    let config = {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };

    axios.post(`${API_URL}/transaction/create`, payload, config)
    .then((result) => {
      console.log(result);
      console.log('add product to cart succeed');
      setIsAddingToCart(false);
      setIsProductAdded(true);
      setTimeout(()=>{
        setIsProductAdded(false)
      }, 2000)
    })
    .catch((error) => {
      // console.log(error.response.data.error_description)
      setIsAddingToCart(false)
      setIsAddingToCartError(true);
      setErrorMessage("adding to cart failed");
    })
  }

  let renderProductVariants = () => {
    return productVariants.map((product: Product) => {
      return (
        <div className="card" key={product.id}>
          <div className="content">
            <div className="header">{product.product_name}</div>
            <div className="description">
              {product.name}
            </div>
          </div>
          <div
            className="ui bottom attached button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setSelectedProductVariant(product);
            }}
          >
            <i className="add icon"></i>
            Add to Cart
          </div>
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
      <h1 className="ui header">Product</h1>

      {
        isRequestingData?
        <div className="d-flex justify-content-center w-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <></>
      }

      {
        isRequestError?
        <div className="alert alert-danger w-100" role="alert">
          {errorMessage}
        </div>
        :
        <></>
      }

      <div className="ui cards">
        {
          productVariants.length == 0 ?
          <>No Products to Display</>
          :
          <></>
        }
        { renderProductVariants() }
      </div>



      {/* MODAL BOOTSTRAP */}

      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{selectedProductVariant.product_name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedProductVariant.name}

              <div
                className='mt-2'
              >
                Price
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  IDR {selectedProductVariant.price}
                </span>
              </div>

              <div className="input-group mb-4 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Quantity"
                  aria-label="Recipient's username" aria-describedby="basic-addon2"
                  value={inputQty}
                  onChange={(e) => {
                    setInputQty(parseInt(e.target.value));
                  }}
                />
                <span className="input-group-text" id="basic-addon2">qty</span>
              </div>

              <div>
                Total Price
                <h3
                  className='modal-title fs-3'
                >
                  IDR {selectedProductVariant.price*inputQty}
                </h3>
              </div>

            </div>

            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              {
                isAddingToCart?
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
                :
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={requestAddTransaction}
                >
                  Add to Cart
                </button>
              }
            </div>
            {
              isProductAdded?
              <div className="modal-footer">
                <div className="alert alert-success w-100" role="alert">
                  Product is added to Cart
                </div>
              </div>
              :
              <></>
            }
            {
              isAddingToCartError?
              <div className="alert alert-danger w-100" role="alert">
                {errorMessage}
              </div>
              :
              <></>
            }
          </div>
        </div>
      </div>


    </div>
  );
}

export default PageProduct;
