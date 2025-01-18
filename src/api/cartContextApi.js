import { createContext, useState } from "react";

const cartDefault = { totalPrice: 0, setTotalPrice: () => {} };
const CartContext = createContext(cartDefault);

const CartProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CartContext.Provider
      value={{
        totalPrice,
        setTotalPrice,
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        isDeleting,
        setIsDeleting,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
