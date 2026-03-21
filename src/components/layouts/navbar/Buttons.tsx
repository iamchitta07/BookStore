import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import SqBtn from "../../common/buttons/SqBtn";

const cols: string[] = ["#A6FAFF", "#FB7DA8", "#A5B4FB"];

function Buttons() {
  return (
    <div className="flex gap-5">
      <SqBtn count={10} color={cols[0]} href="cart">
        <IoMdCart size={30} />
      </SqBtn>
      <SqBtn count={99} color={cols[1]} href="wishlist">
        <FaHeart size={30} />
      </SqBtn>
      <SqBtn color={cols[2]} href="user">
        <FaUser size={30} />
      </SqBtn>
    </div>
  );
}

export default Buttons;
