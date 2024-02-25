import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';

import { useAppDispatch } from "../app/hooks.ts"
import { updateUserData } from "../features/account/accountSlice.ts"
import { localstorage_set } from '../helper/localstorage.ts';
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



function MasterDataProduct() {

  // let [username, setUsername] = useState("");
  // let [password, setPassword] = useState("");

  // let dispatch = useAppDispatch();

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
  }, [selectedProductVariant])


  let requestProductsByCategory = () => {

    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    // http://localhost:4000/product/data-category/2
    
    axios.get(`${API_URL}/product/data-category/${category_id}`)
    .then((result) => {
      console.log(result.data);
      setProductVariants(result.data);
      // setProductCategories(result.data)
    })
    .catch((error) => {
      console.log(error.response.data.error_description)
    })
  }

  let requestAddTransaction = () => {
    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    let payload = {
      product_variant_id: selectedProductVariant.id,
      price: selectedProductVariant.price,
      qty: inputQty,
      subtotal: selectedProductVariant.price*inputQty,
    };

    axios.post(`${API_URL}/transaction/create`, payload)
    .then((result) => {
      console.log(result.data);
      setProductVariants(result.data);
      // setProductCategories(result.data)
    })
    .catch((error) => {
      console.log(error.response.data.error_description)
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

      <div className="ui cards">
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={requestAddTransaction}
              >Add to Cart</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default MasterDataProduct;
