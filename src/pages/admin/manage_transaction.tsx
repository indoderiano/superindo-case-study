import React, { useEffect } from 'react'
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectAccessToken, updateUserData } from "../../features/account/accountSlice.ts"
import { localstorage_set } from '../../helper/localstorage.ts';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { getAllTransactions, Transaction, initialTransaction } from '../../fetch/transaction.tsx';
import { getTransactionDetailsByTransactionId } from '../../fetch/transaction_details.tsx';


interface TransactionData {
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
}

// let initialTransactionData:TransactionData = {
//   id: 0,
//   transaction_id: 0,
//   product_variant_id: 0,
//   price: 0,
//   qty: 0,
//   subtotal: 0,
//   active: false,
//   created_user: "",
//   created_date: "",
//   updated_user: "",
//   updated_date: "",

//   product_variant_name: "",
// } 


function ManageTransaction() {

  // RENDER STATE
  let [isRequestingTransactions, setIsRequestingTransactions] = useState(false);
  let [isRequestingTransactionsError, setIsRequestingTransactionsError] = useState(false);
  let [isRequestingTransactionDetails, setIsRequestingTransactionDetails] = useState(false);
  let [isRequestingTransactionDetailsError, setIsRequestingTransactionDetailsError] = useState(false);

  let [errorMessage, setErrorMessage] = useState("");


  // DATA
  let access_token = useAppSelector(selectAccessToken);
  let [transactions, setTransactions] = useState([]);
  let [selectedTransaction, setSelectedTransaction] = useState<Transaction>(initialTransaction);
  let [transactionDetails, setTransactionDetails] = useState<Array<TransactionData>>([]);
  

  useEffect(() => {
    console.log("THIS IS Manage transaction page");
    requestTransactions();
  },[])

  useEffect(() => {
    setTransactionDetails([]);
    requestSelectedTransactionDetails(selectedTransaction.id);
  }, [selectedTransaction.id])


  let requestTransactions = () => {
    setIsRequestingTransactions(true);
    setIsRequestingTransactionsError(false);
    setErrorMessage("");
    let API_URL = process.env.REACT_APP_API;
    console.log("API ENV IS ", API_URL);

    let config = {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };
    
    let fetch = getAllTransactions(access_token);

    // axios.get(`${API_URL}/transaction/data`, config)
    fetch("/")
    .then((result) => {
      console.log(result.data);
      setTransactions(result.data);
      setIsRequestingTransactions(false);
    })
    .catch((error) => {
      // console.log(error.response.data.error_description)
      setErrorMessage("failed to get transaction data")
      setIsRequestingTransactions(false);
      setIsRequestingTransactionsError(true);
    })
  }

  let requestSelectedTransactionDetails = (transaction_id) => {

    setIsRequestingTransactionDetails(true);
    setIsRequestingTransactionDetailsError(false);
    setErrorMessage("");
    setTransactionDetails([]);

    if ( transaction_id > 0 ) {

      console.log('requesting transaction details');

      let API_URL = process.env.REACT_APP_API;
      console.log("API ENV IS ", API_URL);

      let fetch = getTransactionDetailsByTransactionId(access_token, transaction_id);
      
      // axios.get(`${API_URL}/transaction-detail/transaction-id/${transaction_id}`)
      fetch("/")
      .then((result) => {
        console.log(result.data);
        setTransactionDetails(result.data)
        setIsRequestingTransactionDetails(false);
      })
      .catch((error) => {
        setIsRequestingTransactionDetails(false);
        setIsRequestingTransactionDetailsError(true);
        setErrorMessage("failed to get transaction details");
        // console.log(error.response.data.error_description)
      })
    }

  }


  let renderTransactions = () => {
    return transactions.map((transaction: Transaction) => {
      return (
        <div
          className="card"
          key={transaction.id}
          data-bs-toggle="modal"
          data-bs-target="#modaltransaction"
          onClick={() => {
            setSelectedTransaction(transaction);
          }}
        >
            <div className="content">
              <div className="header">{transaction.transaction_no}</div>
              <div className="meta">
                <a>{transaction.created_user}</a>
              </div>
            </div>
            <div className="extra content">
              <span className="right floated">
                Created in {transaction.created_date}
              </span>
            </div>
        </div>
      )
    })
  }

  let renderTransactionDetails = () => {
    return transactionDetails.map((transaction_detail: TransactionData) => {
      return (
        <div
          className="ui raised card"
          key={transaction_detail.id}
        >
          <div className="content">
            <div className="header">{transaction_detail.product_variant_name}</div>
            <div className="meta">
              {/* <span className="category">Animals</span> */}
            </div>
            <div className="description">

              <div
                className='mt-2'
              >
                Price
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  IDR {transaction_detail.price}
                </span>
              </div>

              <div
                className='mt-2'
              >
                Qty
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  {transaction_detail.qty}
                </span>
              </div>

              <div
                className='mt-4'
              >
                Subtotal Price
                <span
                  className='modal-title fw-bolder ms-2'
                >
                  IDR {transaction_detail.subtotal}
                </span>
              </div>
              
              
            </div>
          </div>
          <div className="extra content">
            <div className="right floated author">
              Updated at {transaction_detail.updated_date}
            </div>
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
      <h1 className="ui header">Transactions</h1>

      {
        isRequestingTransactions?
        <div className="d-flex justify-content-center w-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <></>
      }

      {
        isRequestingTransactionsError?
        <div className="alert alert-danger w-100" role="alert">
          {errorMessage}
        </div>
        :
        <></>
      }

      <div className="ui link cards">
        { renderTransactions() }
      </div>



      {/* MODAL TRANSACTION DETAILS */}
      <div className="modal fade" id="modaltransaction"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Transaction No {selectedTransaction.transaction_no}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {
                isRequestingTransactionDetails?
                <div className="d-flex justify-content-center w-100">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                :
                <></>
              }

              {
                isRequestingTransactionDetailsError?
                <div className="alert alert-danger w-100" role="alert">
                  {errorMessage}
                </div>
                :
                <></>
              }
              
              {
                transactionDetails.length == 0 ?
                <>No Transaction Details to Display</>
                :
                <></>
              }

              { renderTransactionDetails() }

            </div>

            <div className="modal-footer">
              By User {selectedTransaction.updated_user}
            </div>

            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTransaction;
