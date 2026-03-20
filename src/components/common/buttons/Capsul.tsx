import type { FC } from "react";
import { Link } from "react-router-dom";

import type { ButtonProps } from "../../../types";

const Capsul: FC<ButtonProps> = ({ text, href, icon, color, bgColor }) => {
  return (
    <Link
      to={href}
      className={`${bgColor} border-black border-2 px-4 py-1 rounded-full duration-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-center items-center gap-1`}
    >
      <h1 className={`${color}`}>{text}</h1>
      <>{icon}</>
    </Link>
  );
};

export default Capsul;
