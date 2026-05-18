import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <section className="dashboard-layout container">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <NavLink to="/dashboard">Overview</NavLink>
        <NavLink to="/dashboard/my-requests">My Requests</NavLink>
        <NavLink to="/dashboard/add-pet">Add Pet</NavLink>
        <NavLink to="/dashboard/my-listings">My Listings</NavLink>
      </aside>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
