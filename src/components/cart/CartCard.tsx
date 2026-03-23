import type { FC } from "react";
import type { CartProps } from "../../types";

const CartCard: FC<CartProps> = ({ title, des, price, off, qnty, inStock, image, selected }) => {
  return (
    <div className="grid grid-cols-18 w-400 h-80 bg-red-400">
      <div className="col-span-1 h-full bg-black">
        <button className=""></button>
      </div>
      <div className="col-span-17 grid grid-cols-5 h-full border-4 rounded-2xl bg-white">
        <div className="col-span-1">

        </div>
        <div className="col-span-4">

        </div>
      </div>
    </div>
  );
};

export default CartCard;
