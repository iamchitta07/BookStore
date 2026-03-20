import { PiCurrencyInrLight } from "react-icons/pi";

import { numFormatterUS, offPrice } from "../../../utils";
import type { FC } from "react";

const PriceTag: FC<{ price: number; off: number }> = ({ price, off }) => {
  return (
    <div className="flex gap-px items-center">
      <PiCurrencyInrLight className="font-bold"  />
      <div className="flex gap-1 items-end">
        <div className="flex text-end text-[20px] font-bold">
          {numFormatterUS(offPrice(price, off))}
        </div>
        <h1 className="text-col-five text-md">{off}% Off</h1>
        <h1 className="text-sm text-expired line-through">{" "}{price}{" "}</h1>
      </div>
    </div>
  );
};

export default PriceTag;
