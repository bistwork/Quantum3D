import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
export const createNotification = (attrs,orderId,handleNotificationCreation) => {
    const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
    const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';
    const currentDate = new Date();

// Format the date in ISO 8601 format
    const isoDate = currentDate.toISOString();
    const variables = {
        input: {
            id: uuidv4(),
            userID: attrs.dealerId,
            createdAt:isoDate,
            read:false,
            category:"Update",
            description: `The Project ${orderId} has been paid`,

        }
      };

      const mutation = `
      mutation MyMutation($input: CreateNotificationInput!) {
        createNotification(input: $input) {
          id
          # Otros campos que quieras retornar
        }
      }
    `;

    axios({

    url: apiUrl,

    method: 'post',

    headers: {

        'x-api-key': apiKey,

        'Content-Type': 'application/json'

    },

    data: {

        query: mutation,

        variables: variables

    }

    })

    .then((response) => {

        if(response.data.errors==null) {
            console.log(response.data);
            handleNotificationCreation(true);
            console.log(isNotified)
        }

    })

    .catch((error) => {

        console.error("err",error);

    });

}

export const createOrderNotification = (attrs,orderId) => {
    const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
    const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';
    const currentDate = new Date();
    const orderNotificationId = uuidv4()

// Format the date in ISO 8601 format
    const isoDate = currentDate.toISOString();
    const variables = {
        input: {
            id: uuidv4(),
            userID: attrs.dealerId,
            createdAt:isoDate,
            read:false,
            category:"Order",
            description: `The Project ${orderId} has been created`,

            
        }
      };

      const mutation = `
      mutation MyMutation($input: CreateOrderNotificationInput!) {
        createOrderNotification(input: $input) {
          id
          # Otros campos que quieras retornar
        }
      }
    `;

    axios({

    url: apiUrl,

    method: 'post',

    headers: {

        'x-api-key': apiKey,

        'Content-Type': 'application/json'

    },

    data: {

        query: mutation,

        variables: variables

    }

    })

    .then((response) => {

        console.log(response.data);
        if(response.data.errors==null) {
            console.log("Notified")
        }

    })

    .catch((error) => {

        console.error("err",error);

    });

}