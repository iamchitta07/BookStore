import { useEffect } from "react";
import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

import SqBtn from "../../common/buttons/SqBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { fetchShopCounts, setCartCount, setWishlistCount } from "../../../features/shop/shopSlice";
import type { AppDispatch, RootState } from "../../../app/store";

const cols: string[] = ["#A6FAFF", "#FB7DA8", "#A5B4FB", "#FD5A46"];

const Buttons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { cartCount, wishlistCount } = useSelector((state: RootState) => state.shop);
  
  useEffect(() => {
    if (!token) {
      dispatch(setCartCount(0));
      dispatch(setWishlistCount(0));
      return;
    }

    dispatch(fetchShopCounts());
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex gap-5">
      <SqBtn count={cartCount} color={cols[0]} href="cart">
        <IoMdCart size={30} />
      </SqBtn>
      <SqBtn count={wishlistCount} color={cols[1]} href="wishlist">
        <FaHeart size={30} />
      </SqBtn>
      <SqBtn color={cols[2]} href="user">
        <FaUser size={30} />
      </SqBtn>
      <SqBtn color={cols[3]} href="/login" onClick={handleLogout}>
        <FaPowerOff size={30} />
      </SqBtn>
    </div>
  );
}

export default Buttons;
