// React Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component Imports
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import PageNotFound from "./components/common/pageNotFound/PageNotFound";
import WishList from "./components/wishlist/WishList";
import Cart from "./components/cart/Cart";
import Login from "./components/loginPage/Login";
import Signup from "./components/signup/Signup";
import UserPage from "./components/userPage/UserPage";
import ProductPage from "./components/productPage/ProductPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";
import Admin from "./components/admin/Admin";
import Sell from "./components/sell/Sell";
import AddProduct from "./components/addProductPage/AddProduct";
import CategoryBooks from "./components/categorywiseBooks/CategoryBooks";

const router = createBrowserRouter([
  {
    path: "/404",
    element: <PageNotFound />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {index: true, element: <LandingPage /> },
          {path: 'wishlist', element: <WishList />},
          {path: 'cart', element: <Cart />},
          {path: 'user', element: <UserPage />},
          {path: 'product/:id', element: <ProductPage />},
          {path: 'category/:category', element: <CategoryBooks />},
          {
            element: <AdminRoute />,
            children: [
              { path: 'admin', element: <Admin /> },
              { path: 'sell', element: <Sell /> },
              { path: 'add-product', element: <AddProduct /> }
            ]
          }
        ]
      }
    ]
  }
])





const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
