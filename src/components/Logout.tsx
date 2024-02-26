import React from 'react';
import { localstorage_clear } from '../helper/localstorage.ts';
import { reset, selectAccountRole } from '../features/account/accountSlice.ts';
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";




function Logout() {

  let role = useAppSelector(selectAccountRole);
  let dispatch = useAppDispatch();

  let logout = () => {
    localstorage_clear();
    dispatch(reset());
  }

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={logout}
    >
      Logout
    </div>
  );
}


export default Logout;
