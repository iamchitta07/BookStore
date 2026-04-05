import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import CartCard from "./CartCard";
import IMG from "/images/Product.webp";
import { numFormatterUS } from "../../utils";
import type { BackendCartItemProps } from "../../types";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<BackendCartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/sales/cart");
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id: number, newQnty: number) => {
    if (newQnty < 0) return;
    if (newQnty > 5) {
      alert("Maximum quantity allowed is 5.");
      return;
    }

    try {
      if (newQnty === 0) {
        await api.delete(`/sales/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
        setSelectedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } else {
        const res = await api.put(`/sales/cart/${id}`, { quantity: newQnty });
        setCartItems(prev =>
          prev.map(item => (item.id === id ? { ...item, quantity: res.data.quantity } : item))
        );
      }
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await api.delete(`/sales/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error("Failed to remove cart item", error);
    }
  };

  const handleToggleSelection = (id: number, isSelected: boolean) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleCheckout = async () => {
    try {
      if (selectedIds.size === 0) {
        alert("Please select at least one book to checkout!");
        return;
      }
      
      await api.post("/sales/sale", { item_ids: Array.from(selectedIds) });
      navigate("/checkout");
    } catch (error: any) {
      console.error("Checkout failed:", error);
      const msg = error.response?.data?.detail || "Checkout failed. Please try again.";
      alert(msg);
    }
  };

  const calculatedTotal = useMemo(() => {
    const itemsToSum = cartItems.filter(item => selectedIds.has(item.id));
    return itemsToSum.reduce((acc, item) => {
      const discountedPrice = item.book.price * (1 - (item.book.discount_percentage || 0) / 100);
      return acc + (discountedPrice * item.quantity);
    }, 0);
  }, [cartItems, selectedIds]);

  const formattedTotal = numFormatterUS(Number(calculatedTotal.toFixed(2)));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <h2 className="text-3xl font-black italic">LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="px-20">
      {/* Total Price */}
      <div className="flex justify-end mt-5">
        <h1 className="text-3xl font-bold">
          TOTAL PRICE: <span className="px-4 py-2 border-2 shadow-[2px_2px_0px_#000] bg-col-one">₹ {formattedTotal}</span>
        </h1>
      </div>
      <div className="w-full flex flex-col items-center mt-10">
        {cartItems.map((item) => (
          <CartCard
            key={item.id}
            id={item.id}
            title={item.book.title}
            publisher={item.book.publisher || "Unknown"}
            isbn={item.book.isbn}
            price={item.book.price}
            off={item.book.discount_percentage || 0}
            qnty={item.quantity}
            inStock={item.book.stock_quantity > 0}
            image={item.book.cover_image_url || IMG}
            selected={selectedIds.has(item.id)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
            onToggleSelection={handleToggleSelection}
          />
        ))}
        {cartItems.length === 0 && (
          <div className="text-2xl font-bold mt-10">Your cart is empty.</div>
        )}
      </div>
      <div className="w-full flex justify-center mt-10 mb-20">
        <button 
          onClick={handleCheckout} 
          disabled={selectedIds.size === 0}
          className="px-10 py-4 text-3xl font-bold bg-col-five border-3 hover:translate-1 active:translate-1.5 hover:shadow-none duration-200 shadow-[6px_6px_0px_#00995E] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Out with Selected Books
        </button>
      </div>
    </div>
  );
};

export default Cart;
