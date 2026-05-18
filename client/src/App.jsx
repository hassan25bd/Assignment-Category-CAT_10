import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import AllPets from "./pages/AllPets";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import MyRequests from "./pages/MyRequests";
import MyListings from "./pages/MyListings";
import DashboardHome from "./pages/DashboardHome";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pets", element: <AllPets /> },
      { path: "all-pets", element: <AllPets /> },
      { path: "wishlist", element: <Wishlist /> },
      {
        path: "pets/:id",
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "add-pet", element: <AddPet /> },
          { path: "my-requests", element: <MyRequests /> },
          { path: "my-listings", element: <MyListings /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
