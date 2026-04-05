import type { FC } from "react";
import type { NavigateBtnProps } from "../../types";

const NavigateBtn: FC<NavigateBtnProps> = ({ onClickFn, children, className, aralLabel }) => {
  return (
    <button
      onClick={onClickFn}
      className={`absolute top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-transform hover:scale-110 z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] + ${className}`}
      aria-label={aralLabel}
    >
      {children}
    </button>
  );
};

export default NavigateBtn;
