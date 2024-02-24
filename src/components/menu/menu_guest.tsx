import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function MenuGuest() {

  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className='item'>Home</Link>
        <div className="right menu">
          <Link to="/login" className='item'>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default MenuGuest;
