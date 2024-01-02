import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const setAllCustomers = (customers) => {
    setData(customers);
  };

  const addCustomer = (newCustomer) => {
    setData((prevData) => [newCustomer, ...prevData]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setData((prevData) =>
      prevData.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );
  };

  return (
    <DataContext.Provider
      value={{ data, addCustomer, updateCustomer, setAllCustomers }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
