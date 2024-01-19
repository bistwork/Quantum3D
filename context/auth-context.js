import React, { createContext, useContext, useState } from "react";
import { setUserData } from "@/utils/auth";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  updateUser: (updatedData) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user,
    login: async (userData) => {
      // console.log(userData);
      setUser(userData);
      setUserData(userData);
    },
    logout: async () => {
      setUser(null);
    },
    updateUser: (updatedData) => {
      const newUser = { ...user, ...updatedData };
      setUserData(newUser);
      setUser(newUser);
    },
    updateAccounting: (updatedData) => {
      const newAccountingData = { ...user.accounting, ...updatedData };
      const newUser = { ...user, accounting: newAccountingData };
      setUserData(newUser);
      setUser(newUser);
    },
    updateShipping: (updatedData) => {
      const newShippingData = { ...user.shipping, ...updatedData };
      const newUser = { ...user, shipping: newShippingData };
      setUserData(newUser);
      setUser(newUser);
    },
    updateZipcodes: (updatedData) => {
      const newUser = { ...user, zipCodes: updatedData};
      setUser(newUser);
      setUserData(newUser);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}