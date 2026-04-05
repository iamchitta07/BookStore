import type { FC, ReactElement } from "react";

interface SquareIconCardProps {
  icon: ReactElement;
  title?: string;
  value?: string | number;
  bg?: string;
}

const SquareIconCard: FC<SquareIconCardProps> = ({ icon, title, value, bg = "" }) => {
  return (
    <div className={`w-90 h-90  border-4 shadow-[12px_12px_0px_#000] hover:translate-3 duration-200 hover:shadow-none ${bg}`}>
      <div className="flex flex-col h-full p-10 pl-12">
        <div className="mb-10">
          {icon}
        </div>
        <div className="font-black text-7xl mb-5 font-display">
          {value}
        </div>
        <div className="uppercase font-bold text-4xl">
          {title}
        </div>
      </div>
    </div>
  )
}

export default SquareIconCard;