import { generateClient } from "aws-amplify/api";
import { getOrderNotificationsByUserId } from "./graphql/queries";

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
      console.log("Notifications",notificationsData.data.orderNotificationsByUserID.items);
      return notificationsData.data.orderNotificationsByUserID.items
    } catch (error) {
      console.error("error retrieving notifications data:", error);
      throw error;
    }
  };
  