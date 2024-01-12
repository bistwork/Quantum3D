import { generateClient } from "aws-amplify/api";
import { getNotificationsByUserId, getOrderNotificationsByUserId } from "./graphql/queries";
import { createOrderNotif } from "./graphql/mutations";
import { v4 as uuidv4 } from 'uuid';

const client = generateClient({
    aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT, // Replace with your GraphQL endpoint
    aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION, // Replace with your AWS region
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: process.env.NEXT_PUBLIC_API_KEY, // Replace with your API key
  });

export const fetchOrderNotifications = async (userID) => {
    try {
      const notificationsData = await client.graphql({
        query: getOrderNotificationsByUserId,
        variables: { userID },
      });
      console.log("Orders",notificationsData.data.orderNotificationsByUserID.items);
      return notificationsData.data.orderNotificationsByUserID.items
    } catch (error) {
      console.error("error retrieving notifications data:", error);
      throw error;
    }
  };
export const fetchNotifications = async (userID) => {
    try {
      const notificationsData = await client.graphql({
        query: getNotificationsByUserId,
        variables: { userID },
      });
      console.log("Notifications",notificationsData);
      return notificationsData.data.notificationsByUserID.items
    } catch (error) {
      console.error("error retrieving notifications data:", error);
      throw error;
    }
  };

  
  
export const createOrderNotification = async (comercialId) => {
    try {
        const currentDate = new Date();

        const isoDate = currentDate.toISOString();
        const variables = {
            input: {
                id: uuidv4(),
                userID: "edd91fc9-c86c-490e-9693-b2aaf28312c0",
                createdAt:isoDate,
                read:false,
                category:"Order",
                description: `The Project ${comercialId} has been created`,

            }
          };
      
      const notificationsData = await client.graphql({
        query: createOrderNotif,
        variables: variables,
      });
      console.log("Notifications",notificationsData);
      return notificationsData.data.createOrderNotification.items
    } catch (error) {
      console.error("error retrieving notifications data:", error);
      throw error;
    }
  };


  