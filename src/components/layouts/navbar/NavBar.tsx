import { Link } from "react-router-dom";

import LOGO from "/icons/LOGO_BLACK.svg";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";

const NavBar = () => {
  return (
    <div className="h-20 w-full bg-col-one flex items-center justify-between px-20">
      <Link to="/" className="flex gap-2">
        <img src={LOGO} alt="Bookstore Logo" className="h-10" />
        <span className="font-bold text-3xl">BookStore</span>
      </Link>

      <SearchBar />
      <Buttons />
    </div>
  );
};

export default NavBar;
