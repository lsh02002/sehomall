import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { itemCartType } from "../types/type";

type CartContextValue = {
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  cartItems: itemCartType[];
  setCartItems: Dispatch<SetStateAction<itemCartType[]>>;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<itemCartType[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const value: CartContextValue = {
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };

export function useCart() {
  const cartCtx = useContext(CartContext);

  if (!cartCtx) throw new Error("useLogin must be used within <CartProvider>");
  return cartCtx;

}
