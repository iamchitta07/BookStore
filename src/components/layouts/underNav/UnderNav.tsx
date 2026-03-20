import { IoLocationSharp, IoHelpCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { underNavEle } from "../../../constants";




const userLoc = "Durgapur, West Bengal, 713 209"

const UnderNav = () => {
  return (
    <div className="px-20 bg-background h-14 w-full flex justify-between items-center relative">
        {/* Location Element */} 
        <div className="loc flex gap-2 items-center">
            <IoLocationSharp size={22} />
            <Link to="#" className="text-xl">{userLoc}</Link>
        </div>

        {/* Center Elements */}
        <div className="centEle flex justify-between gap-16 absolute left-1/2 -translate-x-1/2">
            {underNavEle.map((ele, idx)=>
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
