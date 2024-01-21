import { generateClient } from "aws-amplify/api";
import { orderById, ordersByUserId} from "./graphql/queries";
import { createAdminOrder,updateOrderStatus } from "./graphql/mutations";
import { v4 as uuidv4 } from 'uuid';

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
        dealerName:item.dealerName
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

export const createAdmnOrder = async (data,user) => {
  try{
    if (!data) {
      throw new Error("ID is required for fetching the order.");
    }
    const orderId = uuidv4();      
    const variables = {
        input: {
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString,
            id: orderId,
            userID: "edd91fc9-c86c-490e-9693-b2aaf28312c0", 
            customerId: data.customerId,
            comercialId: data.comercialId,
            deliveryDate: data.deliveryDate,
            retailAmount:data.retailAmount,
            model:data.model,    
            height: data.height,
            materials: data.materials,
            width: data.width,
            selectedRafterHeaders: data.selectedRafterHeaders,
            selectedRafterEndCaps: data.selectedRafterEndCaps,
            selectedHead: data.selectedHead,
            selectedEnd: data.selectedEnd,
            rafterSize: data.rafterSize,
            rafterAlign: data.rafterAlign,
            projection: data.projection,
            postType: data.postType,
            mountMode: data.mountMode,
            status:0,
            url:data.url,
            dealerName:user.fullName,
        }
      };

    const orderData = await client.graphql({
      query: createAdminOrder,
      variables: variables
    });
    return orderData.data.getOrder; // Assuming getOrder returns a single item
  } catch (error) {
      console.error("Error fetching order data:", error);
      throw error;
    }
}

