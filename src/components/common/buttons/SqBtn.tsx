import type { CSSProperties, FC, ReactNode } from "react";
import { useState } from "react";
import { hexToRgb } from "../../../utils";
import { Link } from "react-router-dom";

interface SqBtnProps {
  count?: number | undefined;
  children: ReactNode;
  color: string;
  href: string;
}

const SqBtn: FC<SqBtnProps> = ({ count = undefined, children, color, href }) => {
  const rgbCol = hexToRgb(color);
  console.log(color);
  const [handleHover, setHandleHover] = useState<boolean>(false);

  const mainStyle: CSSProperties[] = handleHover
    ? [
        {
          backgroundColor: color,
          boxShadow: `3px 3px 0px ${rgbCol}`,
        },
        { boxShadow: `2px 1px 0px ${rgbCol}` },
      ]
    : [
        {
          backgroundColor: color,
        },
        {},
      ];

  return (
    <Link
      to={href}
      className={`h-12 w-12 border-2 relative flex justify-center items-center duration-300`}
      onMouseEnter={() => setHandleHover(true)}
      onMouseLeave={() => setHandleHover(false)}
      style={mainStyle[0]}
    >
      {count !== undefined && (
        <div
          className="absolute -top-1 -right-1 duration-300 translate-x-1/5 -translate-y-1/5 rounded-full bg-col-six w-5 h-5 flex justify-center items-center"
          style={mainStyle[1]}
        >
          {count}
        </div>
      )}
      {children}
    </Link>
  );
};

export default SqBtn;
