import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppSelector } from "../../app/hooks.ts"
import { selectAccessToken } from "../../features/account/accountSlice.ts"
import { getProducts } from '../../fetch/product.tsx';
import { createTransaction } from '../../fetch/transaction.tsx';

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

  // RENDER STATE
  let [isRequestingData, setIsRequestingData] = useState(false);
  let [isAddingToCart, setIsAddingToCart] = useState(false);
  let [isProductAdded, setIsProductAdded] = useState(false);
  let [isRequestError, setIsRequestError] = useState(false);
  let [isAddingToCartError, setIsAddingToCartError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  
  // DATA
  let access_token = useAppSelector(selectAccessToken);
  let [productVariants, setProductVariants] = useState([]);
  let [selectedProductVariant, setSelectedProductVariant] = useState(initialProduct);
  let [inputQty, setInputQty] = useState(0);


  useEffect(() => {
    requestProducts();
  },[])

  useEffect(() => {
    setInputQty(0);
    setIsAddingToCartError(false);
    setErrorMessage("");
  }, [selectedProductVariant])


  let requestProducts = () => {

    setIsRequestingData(true);
    setIsRequestError(false);
    setErrorMessage("");


    let fetch = getProducts(null);
    
    fetch("/")
    .then((result) => {
      setProductVariants(result.data);
      setIsRequestingData(false)
    })
    .catch((error) => {
      setIsRequestError(true);
      setErrorMessage("Request data failed");
      setIsRequestingData(false)
    })
  }

  let requestAddTransaction = () => {
    setIsAddingToCart(true);
    setIsAddingToCartError(false);

    let payload = {
      product_variant_id: selectedProductVariant.id,
      price: selectedProductVariant.price,
      qty: inputQty,
      subtotal: selectedProductVariant.price*inputQty,
    };

    let fetch = createTransaction(access_token)

    fetch({
      data: payload
    })
    .then((result) => {
      setIsAddingToCart(false);
      setIsProductAdded(true);
      setTimeout(()=>{
        setIsProductAdded(false)
      }, 2000)
    })
    .catch((error) => {
      setIsAddingToCart(false)
      setIsAddingToCartError(true);
      setErrorMessage(error.response.data.error_description);
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
