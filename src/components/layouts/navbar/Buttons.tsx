import { useEffect, useState } from "react";
import api from "../../../services/axios";
import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

import SqBtn from "../../common/buttons/SqBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import type { AppDispatch, RootState } from "../../../app/store";

const cols: string[] = ["#A6FAFF", "#FB7DA8", "#A5B4FB", "#FD5A46"];

const Buttons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!token) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    const fetchCounts = async () => {
      try {
        const [cartRes, wishRes] = await Promise.all([
          api.get("/sales/cart"),
          api.get("/favourites/")
        ]);
        
        if (cartRes.data && Array.isArray(cartRes.data.items)) {
          setCartCount(cartRes.data.items.length);
        }
        
        if (Array.isArray(wishRes.data)) {
          setWishlistCount(wishRes.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch notification counts", error);
      }
    };
    
    fetchCounts();
  }, [token]);

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
