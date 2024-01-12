import { generateClient } from "aws-amplify/api";
import { orderById, ordersByUserId,updateOrderStatus, createAdmnOrder } from "./graphql/queries";

const client = generateClient();

export const fetchOrders = async (userID) => {
  console.log("UserId prompting query:",userID);
  try {
    const ordersData = await client.graphql({
      query: ordersByUserId,
      variables: { userID },
      authMode: "userPool",
    });
    console.log(ordersData);
    return ordersData.data.ordersByUserID.items.map((item) => {
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
        data:item,
      };
    });
  } catch (error) {
    console.error("error having orders data:", error);
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

export const updateOrderState = async (_id, _status) => {
  try{
    if (!_id) {
      throw new Error("ID is required for fetching the order.");
    }

    const orderData = await client.graphql({
      query: updateOrderStatus,
      variables: {
        input: {
          id: _id,
          status: _status,
        }
      },
    });

    return orderData.data.getOrder; // Assuming getOrder returns a single item
  } catch (error) {
      console.error("Error fetching order data:", error);
      throw error;
    }
}

export const createAdminOrder = async (data) => {
  try{
    if (!data) {
      throw new Error("Data is required for fetching the order.");
    }
    data["assignedDealerID"] = "edd91fc9-c86c-490e-9693-b2aaf28312c0";
    const orderData = await client.graphql({
      query: createAdmnOrder,
      variables: data
    });

    return orderData.data.getOrder; // Assuming getOrder returns a single item
  } catch (error) {
      console.error("Error fetching order data:", error);
      throw error;
    }
}

