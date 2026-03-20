// React Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component Imports
import LandingPage from "./components/landingPage/LandingPage";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import CenterCarousel from "./components/carousel/CenterCarousel";





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
