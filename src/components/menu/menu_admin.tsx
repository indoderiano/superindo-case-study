import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function MenuAdmin() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className='item'>Home</Link>
        <Link to="/manage-transaction" className='item'>Manage Transactions</Link>
        {/* <a className="active item">
          Home
        </a> */}
        {/* <a className="item">
          Master Data Product Category
        </a>
        <a className="item">
          Master Data Product
        </a>
        <a className="item">
          Manage Transactions
        </a> */}
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
