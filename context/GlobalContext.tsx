"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
interface GlobalContext {
  unreadCount: number;
  setCount: (count: number) => void;
}

const AppContext = createContext<GlobalContext>({
  unreadCount: 0,
  setCount: () => {},
});
export function useGlobalContext() {
  return useContext(AppContext);
}
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const setCount = (number: number) => {
    setUnreadCount(number);
  };
  return (
    <AppContext.Provider value={{ unreadCount, setCount }}>
      {children}
    </AppContext.Provider>
  );
}
