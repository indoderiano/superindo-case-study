import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout.tsx';

function MenuAdmin() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className='item'>Home</Link>
        <Link to="/product-category" className='item'>Product Category</Link>
        <Link to="/products" className='item'>Products</Link>
        <Link to="/manage-transaction" className='item'>Manage Transactions</Link>
        <div className="right menu">
          <div className="ui item">
            <Logout/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
