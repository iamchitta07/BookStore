import type { FC } from "react";
import SquareIconCard from "./SquareIconCard";
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { GiCash } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatUsNumber } from "../../utils";

interface AdminSaleStsProps {
  totalCustomer: number;
  totalBooks: number;
  totalRevenue: number;
  totalOrders: number;
}

const AdminSaleSts: FC<AdminSaleStsProps> = ({
  totalCustomer,
  totalBooks,
  totalRevenue,
  totalOrders,
}) => {
  return (
    <div className="w-full flex justify-between my-10">
      <SquareIconCard
        bg="bg-col-seven"
        icon={<FaUsers color="black" size={65} />}
        value={totalCustomer}
        title="Total Customer"
      />
      <SquareIconCard
        bg="bg-col-four"
        icon={<ImBooks color="black" size={65} />}
        value={totalBooks}
        title="Total Books"
      />
      <SquareIconCard
        bg="bg-primary-btn"
        icon={<GiCash color="black" size={65} />}
        value={formatUsNumber(totalRevenue)}
        title="Total Revenue"
      />
      <SquareIconCard
        bg="bg-col-one"
        icon={<BsFillCartCheckFill color="black" size={65} />}
        value={totalOrders}
        title="Total Orders"
      />
    </div>
  );
};

export default AdminSaleSts;
