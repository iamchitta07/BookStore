import type { FC } from "react";
import { FaUser } from "react-icons/fa";
import { numFormatterUS } from "../../utils";

interface CustProps {
    userName: string;
    email: string;
    totalSpent: number;
}

const CustomerProf: FC<CustProps> = ({userName, email, totalSpent}) => {
  return (
    <div className="border-2 py-4 bg-white w-[90%] mb-2 flex items-center gap-5 px-4 shadow-[4px_4px_0px_#000] duration-200 hover:translate-0.5 hover:shadow-none">
        <div className="h-18 w-18 rounded-lg border-2 flex items-center justify-center bg-[#d5d5d5] shadow-[2px_2px_0px_#000]">
            <FaUser size={50} />
        </div>
        <div>
            <h1>User Name: {userName}</h1>
            <h1>Email: {email}</h1>
            <h1>Total Spent: <span className="text-col-five">{numFormatterUS(totalSpent)}</span></h1>
        </div>
    </div>
  )
}

export default CustomerProf