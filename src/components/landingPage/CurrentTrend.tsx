import { useEffect, useState } from "react";
import { getCountdownToMonday } from "../../utils";
import DealsOfTheWk from "./DealsOfTheWk";
import TopVendors from "./TopVendors";

const CurrentTrend = () => {
  const [timeLeft, setTimeLeft] = useState<string>(getCountdownToMonday());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdownToMonday());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-[74%_26%] px-20 py-10">
      <div>
        <div className="flex gap-5 items-end mb-5">
          <h1 className="text-4xl font-bold uppercase">Deals of The Week:</h1>
          <div className="text-2xl font-bold text-col-three bg-col-one border-2 border-black px-6 py-1 flex justify-center items-center rounded-xl">
            {timeLeft}
          </div>
        </div>
        <DealsOfTheWk />
      </div>
      <TopVendors />
    </div>
  );
};

export default CurrentTrend;
