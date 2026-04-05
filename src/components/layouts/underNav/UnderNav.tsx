import { useEffect, useState } from "react";
import { IoLocationSharp, IoHelpCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { underNavEle } from "../../../constants";
import api from "../../../services/axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const UnderNav = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [userLoc, setUserLoc] = useState<string>("Fetching Location...");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setUserLoc("Please login to see location");
      setIsAdmin(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await api.get("/users/me");
        setUserLoc(res.data.address || "Location not set");
        setIsAdmin(res.data.role === "admin");
      } catch (error) {
        console.error("Failed to fetch user data for nav", error);
        setUserLoc("Location unavailable");
        setIsAdmin(false);
      }
    };
    fetchUserData();
  }, [token]);

  const filteredNavElements = underNavEle.filter((ele) => {
    if ((ele.title === "Admin" || ele.title === "Sell Book") && !isAdmin) {
      return false;
    }
    return true;
  });

  return (
    <div className="px-20 bg-background h-14 w-full flex justify-between items-center relative">
        {/* Location Element */} 
        <div className="loc flex gap-2 items-center hover:text-col-six duration-200">
            <IoLocationSharp size={22} />
            <Link to="/user" className="text-xl ">{userLoc}</Link>
        </div>

        {/* Center Elements */}
        <div className="centEle flex justify-between gap-16 absolute left-1/2 -translate-x-1/2">
            {filteredNavElements.map((ele, idx)=>
                <Link key={idx} to={ele.href} className="text-xl hover:text-expired transition-transform">
                    {ele.title}
                </Link>
            )}
        </div>

        {/* Help Element */}
        <div className="help flex gap-1 items-center">
            <IoHelpCircle size={22} />
            <Link to="#" className="text-xl">Help</Link>
        </div>
    </div>
  );
}

export default UnderNav;
