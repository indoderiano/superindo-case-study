import React, { useEffect } from 'react'
import { useState } from "react";

import { useAppSelector } from "../../app/hooks.ts"
import { selectAccessToken } from "../../features/account/accountSlice.ts"
import { getCartTransaction, checkout } from '../../fetch/transaction.tsx';


interface TransactionCartData {
  id: number
  transaction_id: number
  product_variant_id: number
  price: number
  qty: number
  subtotal: number
  active: boolean
  created_user: string
  created_date: string
  updated_user: string
  updated_date: string

  product_variant_name: string
  total_amount: number
}


function Cart() {

  // RENDER STATE
  let [isRequestingCartTransaction, setIsRequestingCartTransaction] = useState(false);
  let [isRequestingCartTransactionError, setIsRequestingCartTransactionError] = useState(false);
  let [isPaying, setIsPaying] = useState(false);
  let [isPayingError, setIsPayingError] = useState(false);
  let [isPaid, setIsPaid] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");


  // DATA
  let access_token = useAppSelector(selectAccessToken);
  let [totalAmount,setTotalAmount] = useState(0);
  let [transactionId, setTransactionId] = useState(0);
  let [transactionCart, setTransactionCart] = useState([]);
  

  useEffect(() => {
    requestCartTransaction();
  },[])


  let requestCartTransaction = () => {
    setIsRequestingCartTransaction(true);
    setIsRequestingCartTransactionError(false);
    setErrorMessage("");
    
    
    let fetch = getCartTransaction(access_token);

    fetch("/")
    .then((result) => {
      setTransactionCart(result.data);
      setIsRequestingCartTransaction(false);
      if ( result.data.length > 0 ) {
        setTotalAmount(result.data[0].total_amount);
        setTransactionId(result.data[0].transaction_id);
      }
    })
    .catch((error) => {
      setErrorMessage("failed to get transaction data")
      setIsRequestingCartTransaction(false);
      setIsRequestingCartTransactionError(true);
    })
  }

  let requestPaying = () => {

    setIsPaying(true);
    setIsPayingError(false);
    setErrorMessage("");

    setTimeout(() => {
      let fetch = checkout(access_token);

      fetch(`/${transactionId}`)
      .then((result) => {
        setIsPaying(false);
        setIsPaid(true);
        requestCartTransaction();
      })
      .catch((error) => {
        setIsPaying(false);
        setErrorMessage("payment failed")
        setIsPayingError(true)
      })
    }, 2000)

  }


  let renderCartTransaction = () => {
    return transactionCart.map((transaction_data: TransactionCartData) => {
      return (
        <div
          className="ui raised card w-100"
          key={transaction_data.id}
        >
          <div className="content">
            <div className="header">{transaction_data.product_variant_name}</div>
            <div className="meta">
            </div>
            <div className="description">

              <div
                className='mt-2'
              >
                Price
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  IDR {transaction_data.price}
                </span>
              </div>

              <div
                className='mt-2'
              >
                Qty
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  {transaction_data.qty}
                </span>
              </div>

              <div
                className='mt-4'
              >
                Subtotal Price
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  IDR {transaction_data.subtotal}
                </span>
              </div>
              
              
            </div>
          </div>
          <div className="extra content">
            <div className="right floated author">
              Updated at {transaction_data.updated_date}
            </div>
          </div>
        </div>
      )
    })
  }

  let renderCheckout = () => {

    if ( isPaid ) {
      return (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{
            minHeight: "200px"
          }}
        >
          <div>
            <div className="ui blue message mb-4">Payment Successful</div>
            Your Items Will Be Sent Your Way.
            <div
              className='mt-2 text-center'
            >Thankyou</div>
            {/* Please Return to Home */}
          </div>
        </div>
      )
    } else if ( isPaying ) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            minHeight: "200px"
          }}
        >
          {/* <img
            style={{
              height: "100px",
              maxWidth: "600px",
            }}
            src='https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif'/> */}

            <div className="ui icon message">
              <i className="notched circle loading icon"></i>
              <div className="content">
                <div className="header">
                  Just one second
                </div>
                <p>Authenticating..</p>
              </div>
            </div>
  
  
        </div>
        
      )
    } else if ( isPayingError ) {
      return (
        <div className="alert alert-danger w-100" role="alert">
          { errorMessage }
        </div>
      )
    } else {
      return (
        <div
          className='mt-2 d-flex align-items-center'
          style={{
            minHeight: "200px"
          }}
        >
          Price
          <span
            className='modal-title fw-bolder ms-2'
          >
            IDR {totalAmount}
          </span>
        </div>
      )
    }

  }


  return (
    <div
      style={{
        padding: "2rem"
      }}
    >
      <h1 className="ui header">Cart</h1>

      {
        isRequestingCartTransaction?
        <div className="d-flex justify-content-center w-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <></>
      }

      {
        isRequestingCartTransactionError?
        <div className="alert alert-danger w-100" role="alert">
          {errorMessage}
        </div>
        :
        <></>
      }

      <div className="ui cards">
        { 
          transactionCart.length == 0 ?
          <>There is no item in the cart</>
          :
          renderCartTransaction()
        }
      </div>


      {
        transactionCart.length == 0 ?
        <></>
        :
        <div
          className='d-flex align-items-end flex-column mt-5'
        >
          <button
            type="button"
            className="ui primary button"
            data-bs-toggle="modal"
            data-bs-target="#modaltransaction"
          >
            Checkout
          </button>
        </div>

      }


      {/* MODAL TRANSACTION DETAILS */}
      <div className="modal fade" id="modaltransaction"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Checkout</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                { renderCheckout() }
              </div>

            </div>

            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              <button
                type="button"
                className="btn btn-primary"
                disabled={isPaying || isPaid}
                onClick={requestPaying}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
