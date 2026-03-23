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



import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
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
