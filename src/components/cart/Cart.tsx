import CartCard from "./CartCard";
import IMG from "/images/Product.webp";
import type { CartProps } from "../../types";


const Cart = () => {
  const cartItems: CartProps[] = [
    {
      title: "Product Title",
      des: "",
      inStock: true,
      price: 1500,
      off: 40,
      qnty: 2,
      image: IMG,
      selected: false,
    },
  ];

  return (
    <div>
      <CartCard {...cartItems[0]} />
    </div>
  );
};

export default Cart;
