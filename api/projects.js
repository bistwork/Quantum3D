import { generateClient } from "aws-amplify/api";
import { ordersByUserId } from "./graphql/queries";

const client = generateClient();

export const fetchOrders = async (userId) => {
  try {
    const customerData = await client.graphql({
      query: ordersByUserId,
      variables: { userId },
      authMode: "userPool",
    });
    return customerData.data.ordersByUserId.items.map((item) => {
      return {
        id: item.id,
        comercialId: item.comercialId,
        orderDate: item.createdAt,
        deliveryDate: item.deliveryDate,
        customerName: item.customer.primaryInfo.firstName,
        customerLastname: item.customer.primaryInfo.lastName,
        retailAmount: item.retailAmount,
      };
    });
  } catch (error) {
    console.error("error having customers data:", error);
    throw error;
  }
};
