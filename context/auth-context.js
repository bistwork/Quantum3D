import React, { createContext, useContext, useState } from "react";

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
      setUser(userData);
    },
    logout: async () => {
      setUser(null);
    },
    updateUser: (updatedData) => {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
    },
    updateAccounting: (updatedData) => {
      const newAccountingData = { ...user.accounting, ...updatedData };
      const newUser = { ...user, accounting: newAccountingData };
      setUser(newUser);
    },
    updateShipping: (updatedData) => {
      const newShippingData = { ...user.shipping, ...updatedData };
      const newUser = { ...user, shipping: newShippingData };
      setUser(newUser);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
