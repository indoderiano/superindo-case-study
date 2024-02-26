import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';




function HomeCustomer() {

  let navigate = useNavigate();

  // .flex-container {
  //   display: flex;
  //   height: 300px;
  //   justify-content: center;
  //   align-items: center;
  // }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "2rem",
          // height: ""
        }}
      >
        <h1 className="ui header">Ecommerce Store</h1>
        <img
          style={{
            width: "70%",
            maxWidth: "600px",
          }}
          src='https://cdnl.iconscout.com/lottie/premium/thumb/ecommerce-5681338-4730286.gif'/>


        <button
          className="ui primary button mt-3"
          onClick={() => {
            navigate(`/products`);
          }}
        >
          Explore Products
        </button>
      </div>
    </div>
  );
}

export default HomeCustomer;
