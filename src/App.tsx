// React Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component Imports
import LandingPage from "./components/landingPage/LandingPage";
import PageNotFound from "./components/common/pageNotFound/PageNotFound";





const router = createBrowserRouter([

  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />
    



  }




])





const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
