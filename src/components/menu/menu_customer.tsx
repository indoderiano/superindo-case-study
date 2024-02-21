import React, { useEffect } from 'react'
import { useState } from "react";


function MenuCustomer() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <a className="active item">
          Home
        </a>
        <a className="item">
          Transaction
        </a>
        <a className="item">
          Cart
        </a>
        <div className="right menu">
          <a className="ui item">
            Logout
          </a>
        </div>
      </div>
      {/* <div className="ui segment">
        <p></p>
      </div> */}
    </div>
  );
}

export default MenuCustomer;
