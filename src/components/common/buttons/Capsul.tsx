import type { FC } from "react";
import { Link } from "react-router-dom";

import type { ButtonProps } from "../../../types";

const Capsul: FC<ButtonProps> = ({ text, href, icon, color, bgColor }) => {
  return (
    <Link
      to={href}
      className={`${bgColor} border-black border-2 px-5 py-1 rounded-full duration-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-1 active:translate-1.5 flex justify-center items-center gap-1`}
    >
      <h1 className={`${color} text-xl`}>{text}</h1>
      <>{icon}</>
    </Link>
  );
};

export default Capsul;
