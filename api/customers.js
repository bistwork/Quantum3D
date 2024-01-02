import { generateClient } from "aws-amplify/api";
import { customersByUserId } from "./graphql/queries";
import { createCustomer, updateCustomer } from "./graphql/mutations";

const client = generateClient();

export const fetchCustomers = async (userId) => {
  try {
    const customerData = await client.graphql({
      query: customersByUserId,
      variables: { userId },
      authMode: "userPool",
    });
    return customerData.data.customersByUserId.items;
  } catch (error) {
    console.error("error having customers data:", error);
    throw error;
  }
};

export const createCustomerFunc = async (createInput) => {
  try {
    const createCustomerData = await client.graphql({
      query: createCustomer,
      variables: { input: createInput },
      authMode: "userPool",
    });
    return createCustomerData.data.createCustomer;
  } catch (error) {
    console.error("error creating customer data:", error);
    throw error;
  }
};

export const updateCustomerFunc = async (updateInput) => {
  try {
    const updateCustomerData = await client.graphql({
      query: updateCustomer,
      variables: { input: updateInput },
      authMode: "userPool",
    });
    return updateCustomerData.data.updateCustomer;
  } catch (error) {
    console.error("error updating customer data:", error);
    throw error;
  }
};
