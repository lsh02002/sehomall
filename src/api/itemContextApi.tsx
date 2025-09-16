import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { heartData } from "../components/data/heartData";
import { itemData } from "../components/data/itemData";
import { itemType, orderResponseType } from "../types/type";

export type ItemContextValue = {
  items: itemType[];
  setItems: Dispatch<SetStateAction<itemType[]>>;  
  myHearts: itemType[];
  setMyHearts: Dispatch<SetStateAction<itemType[]>>;
  myOrders: orderResponseType[];
  setMyOrders: Dispatch<SetStateAction<orderResponseType[]>>;
  isHeartUpdated: boolean;
  setIsHeartUpdated: Dispatch<SetStateAction<boolean>>;
};

const ItemContext = createContext<ItemContextValue | undefined>(undefined);

const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<itemType[]>(itemData?.content);
  const [myHearts, setMyHearts] = useState<itemType[]>(heartData?.content);
  const [myOrders, setMyOrders] = useState<orderResponseType[]>([]);
  const [isHeartUpdated, setIsHeartUpdated] = useState(false);

  const value: ItemContextValue = {
    items,
    setItems,
    myHearts,
    setMyHearts,
    myOrders,
    setMyOrders,
    isHeartUpdated,
    setIsHeartUpdated,
  };

  return (
    <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
  );
};

export { ItemContext, ItemProvider };

export function useItem() {
  const ctx = useContext(ItemContext);

  if (!ctx) throw new Error("useLogin must be used within <ItemProvider>");
  return ctx;
}
