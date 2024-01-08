import { generateClient } from "aws-amplify/api";
import { orderById, ordersByUserId } from "./graphql/queries";

const client = generateClient();

export const fetchOrders = async (userId) => {
  try {
    const customerData = await client.graphql({
      query: ordersByUserId,
      variables: { userId },
      authMode: "userPool",
    });
    return customerData.data.ordersByUserId.items.map((item) => {
      console.log(item);
      return {
        id: item.id,
        comercialId: item.comercialId,
        orderDate: item.createdAt,
        deliveryDate: item.deliveryDate,
        customerName: item.customer.primaryInfo.firstName,
        customerLastname: item.customer.primaryInfo.lastName,
        retailAmount: item.retailAmount,
        status: item.status,
        url:item.url,
      };
    });
  } catch (error) {
    console.error("error having customers data:", error);
    throw error;
  }
};

export const fetchOrder = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is required for fetching the order.");
    }

    const orderData = await client.graphql({
      query: orderById,
      variables: { id },
      authMode: "userPool",
    });

    return orderData.data.getOrder; // Assuming getOrder returns a single item
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;}
}
