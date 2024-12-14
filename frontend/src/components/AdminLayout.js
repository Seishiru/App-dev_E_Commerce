import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        {/* <h1>Admin Dashboard</h1> */}
      </header>
      <aside className="admin-sidebar">
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/create-product">Create Product</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/categories">Categories</Link></li>
        </ul>
      </aside>
      <main className="admin-content">
        {children} {/* Render the specific page content */}
      </main>
    </div>
  );
};

export default AdminLayout;
