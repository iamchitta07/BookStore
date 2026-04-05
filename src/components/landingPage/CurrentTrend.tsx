import { useEffect, useState } from "react";
import { getCountdownToMonday } from "../../utils";
import DealsOfTheWk from "./DealsOfTheWk";

const CurrentTrend = () => {
  const timeLeft = getCountdownToMonday();

  return (
    <div className="grid grid-cols-3 min-h-screen px-20 py-10">
      <div className="col-span-2">
        <div className="flex gap-5 items-end mb-5">
          <h1 className="text-4xl font-bold uppercase">Deals of The Week:</h1>
          <div className="text-2xl font-bold text-col-three bg-col-one border-2 border-black px-6 py-1 flex justify-center items-center rounded-xl">{timeLeft}</div>
        </div>
        <DealsOfTheWk />
      </div>
      <div className="col-span-1">
        
      </div>
    </div>
  );
};

export default CurrentTrend;
