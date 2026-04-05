import { useState, type FC } from "react";
import type { CartProps } from "../../types";
import PriceTag from "../common/priceTag/PriceTag";
import { FaCheck } from "react-icons/fa";

const CartCard: FC<CartProps> = ({ id, publisher, title, isbn, price, off, qnty, inStock, image, selected: initialSelected, onUpdateQuantity, onRemove, onToggleSelection }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleToggle = () => {
    const newState = !selected;
    setSelected(newState);
    if (onToggleSelection) onToggleSelection(id, newState);
  };

  const handleIncrement = () => onUpdateQuantity(id, qnty + 1);
  const handleDecrement = () => onUpdateQuantity(id, qnty - 1);

  return (
    <div className="flex items-center gap-4 w-full max-w-250 h-auto bg-transparent font-sans mb-6">
      {/* Checkbox */}
      <div className="flex items-center justify-center shrink-0">
        <button
          onClick={handleToggle}
          className={`h-8 w-8 border-2 border-black duration-200  flex items-center justify-center transition-all ${
            selected
              ? "bg-col-five shadow-[2px_2px_0px_#000]"
              : "bg-white shadow-[2px_2px_0px_#000] hover:translate-px hover:shadow-none hover:bg-expired"
          } active:translate-0.5 active:shadow-none`}
        >
          {selected && <FaCheck className="text-black" size={16} />}
        </button>
      </div>

      {/* Main Card */}
      <div className="flex flex-1 border-3 border-black rounded-lg bg-white duration-200 hover:-translate-1 hover:shadow-[6px_6px_0px_#000] overflow-hidden p-4 gap-6">
        {/* Image Container */}
        <div className="w-32 h-40 shrink-0 border-2 border-black rounded-md overflow-hidden bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Info Container */}
        <div className="flex flex-col flex-1 pt-1">
          <div>
            <h1 className="text-2xl font-black text-black uppercase leading-tight truncate" title={title}>{title}</h1>
            <h2 className="text-md font-bold text-gray-600 mt-1">ISBN: {isbn}</h2>
            <h2 className="text-md font-bold text-gray-600 mt-1">Publisher: {publisher}</h2>
            <h2 className={`text-lg font-bold mt-1 ${inStock ? "text-green-600" : "text-red-500"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </h2>
          </div>

          <div className="mt-2">
             <PriceTag price={price} off={off} />
          </div>
        </div>

        {/* Actions Container */}
        <div className="flex flex-col items-end justify-between py-1 w-45 shrink-0 border-l-2 border-black pl-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center border-2 border-black bg-col-one shadow-[2px_2px_0px_#000] hover:translate-0.5 hover:shadow-none transition-all font-black text-xl"
            >
              -
            </button>
            <span className="text-xl font-black w-6 text-center">{qnty}</span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center border-2 border-black bg-col-one shadow-[2px_2px_0px_#000] hover:translate-0.5 hover:shadow-none transition-all font-black text-xl"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full mt-auto">
            <button onClick={() => onRemove(id)} className="w-full py-2 bg-delete-btn border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-0.5 hover:shadow-none transition-all font-bold text-xs uppercase cursor-pointer">
              Remove From Cart
            </button>
            <button className="w-full py-2 bg-primary-btn border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-0.5 hover:shadow-none transition-all font-bold text-xs text-black uppercase cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
