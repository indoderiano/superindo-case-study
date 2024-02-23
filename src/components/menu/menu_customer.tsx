import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout.tsx';


function MenuCustomer() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className='item'>Home</Link>
        <Link to="/transaction" className='item'>Transactions</Link>
        {/* <a className="active item">
          Home
        </a>
        <a className="item">
          Transaction
        </a>
        <a className="item">
          Cart
        </a> */}
        <div className="right menu">
          <div className="ui item">
            <Logout/>
          </div>
        </div>
      </div>
      {/* <div className="ui segment">
        <p></p>
      </div> */}
    </div>
  );
}

export default MenuCustomer;
