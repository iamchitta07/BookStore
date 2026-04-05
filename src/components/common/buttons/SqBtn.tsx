import type { CSSProperties, FC, ReactNode } from "react";
import { useState } from "react";
import { hexToRgb } from "../../../utils";
import { Link } from "react-router-dom";

interface SqBtnProps {
  count?: number | undefined;
  children: ReactNode;
  color: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const SqBtn: FC<SqBtnProps> = ({ count = undefined, children, color, href, onClick }) => {
  const rgbCol = hexToRgb(color);
  const [handleHover, setHandleHover] = useState<boolean>(false);

  const mainStyle: CSSProperties[] = handleHover
    ? [
        {
          backgroundColor: color,
          boxShadow: `0px 0px 0px ${rgbCol}`,
        },
        {},
      ]
    : [
        {
          backgroundColor: color,
          boxShadow: `3px 3px 0px ${rgbCol}`,
        },
        { boxShadow: `2px 2px 0px ${rgbCol}` },
      ];

  return (
    <Link
      to={href}
      className={`h-12 w-12 border-2 relative flex justify-center items-center duration-200 hover:translate-0.75`}
      onMouseEnter={() => setHandleHover(true)}
      onMouseLeave={() => setHandleHover(false)}
      style={mainStyle[0]}
      onClick={onClick}
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
