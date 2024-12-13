import React from "react";
import AdminLayout from "../components/AdminLayout";
import CreateProd from './CreateProd'; 
import Orders from './Orders'; 
import Categories from './Categories';
import '../css/AdminPage.css';

const AdminPage = () => {
  return (
    <AdminLayout>
      <h2>Admin Dashboard</h2>
      {/* Admin dashboard content */}
    </AdminLayout>
  );
};

const AdminCreateProduct = () => {
  return (
    <AdminLayout>
      <CreateProd />
    </AdminLayout>
  );
};

const AdminOrders = () => {
  return (
    <AdminLayout>
      <Orders />
    </AdminLayout>
  );
};

const AdminCategories = () => {
  return (
    <AdminLayout>
      <Categories />
    </AdminLayout>
  );
};

export default AdminPage;  // Exporting AdminPage as default
export { AdminCreateProduct, AdminOrders, AdminCategories };  // Named exports for others
