import { generateClient } from "aws-amplify/api";
import { getUser } from "./graphql/queries";
import { updateUser } from "./graphql/mutations";

const client = generateClient();

export const fetchUserData = async (userId) => {
  try {
    const userData = await client.graphql({
      query: getUser,
      variables: { id: userId },
      authMode: "userPool",
    });
    return userData.data.getUser;
  } catch (error) {
    console.error("error having user data:", error);
    throw error;
  }
};

export const updateUserData = async (updateInput) => {
  try {
    const updatedUserData = await client.graphql({
      query: updateUser,
      variables: { input: updateInput },
      authMode: "userPool",
    });
    return updatedUserData.data.updateUser;
  } catch (error) {
    console.error("error updating user data:", error);
    throw error;
  }
};
