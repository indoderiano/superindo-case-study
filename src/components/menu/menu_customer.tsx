import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout.tsx';


function MenuCustomer() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className='item'>Home</Link>
        <Link to="/products" className='item'>Products</Link>
        <div className="right menu">
          <Link to="/cart" className='item'>Cart</Link>
          <div className="ui item">
            <Logout/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCustomer;
