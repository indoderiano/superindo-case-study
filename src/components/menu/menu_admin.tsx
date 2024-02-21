import React, { useEffect } from 'react'
import { useState } from "react";



function MenuAdmin() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <a className="active item">
          Home
        </a>
        <a className="item">
          Master Data Product Category
        </a>
        <a className="item">
          Master Data Product
        </a>
        <a className="item">
          Manage Transactions
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

export default MenuAdmin;
