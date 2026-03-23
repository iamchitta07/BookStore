import { Outlet } from "react-router-dom";

import NavBar from "../layouts/navbar/NavBar";
import Footer from "../layouts/footer/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
