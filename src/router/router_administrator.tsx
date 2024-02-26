import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomeAdmin from '../pages/admin/home_admin.tsx';
import ManageTransaction from '../pages/admin/manage_transaction.tsx';
import MasterDataProductCategory from '../pages/admin/master_data_product_category.tsx';
import MasterDataProduct from '../pages/admin/master_data_product.tsx';


function RouterAdmin() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomeAdmin />} />
        <Route path="product-category" element={<MasterDataProductCategory />} />
        <Route path="products" element={<MasterDataProduct />} />
        <Route path="manage-transaction" element={<ManageTransaction />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )

}

export default RouterAdmin;


