import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { itemType } from "../types/type";

export type ItemContextValue = {
  items: itemType[];
  setItems: Dispatch<SetStateAction<itemType[]>>;
  isHeartUpdated: boolean;
  setIsHeartUpdated: Dispatch<SetStateAction<boolean>>;
};

const ItemContext = createContext<ItemContextValue | undefined>(undefined);

const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<itemType[]>([]);
  const [isHeartUpdated, setIsHeartUpdated] = useState(false);

  const value: ItemContextValue = {
    items,
    setItems,
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
