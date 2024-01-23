import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { generateShareableLink } from '@/app/utils/link';
import { createOrderNotification } from './notifications';

export const updateOrder = (attrs) => {
    const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
    const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';
    const variables = {
        input: {
          id: attrs.orderId,
          comercialId: attrs.comId,
          status: 1,
        }
      };
      
      const mutation = `
        mutation MyMutation($input: UpdateOrderInput!) {
          updateOrder(input: $input) {
            id
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
        variables:variables,

    }

    })
    .then((response) => {

        console.log(response.data);
        if(response.data.errors==null) {
            console.log("changed status");
        }

    })

    .catch((error) => {

        console.error("err",error);

    });

}

export const createOrder = (attrs,client,prices,handleOrderCreated) => {
    const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
    const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';

    const comId = `PER${(nanoid(8)).toUpperCase()}`;
    const orderId = uuidv4();      
    const variables = {
        input: {
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString,
            id: orderId,
            userID: attrs.dealerId, 
            customerId: client.id,
            comercialId: comId,
            deliveryDate: "Pending",
            retailAmount:String(prices.TotalPrice),
            model:attrs.model=="lattice-insulated"?"latticeInsulated":attrs.model,    
            height: attrs.props.height,
            materials: JSON.stringify(attrs.props.materials),
            width: attrs.props.width,
            selectedRafterHeaders: attrs.props.selectedRafterHeaders,
            selectedRafterEndCaps: attrs.props.selectedRafterEndCaps,
            selectedHead: attrs.props.selectedHead,
            selectedEnd: attrs.props.selectedEnd,
            rafterSize: attrs.props.rafterSize,
            rafterAlign: attrs.props.rafterAlign,
            projection: attrs.props.projection,
            postType: attrs.props.postType,
            mountMode: attrs.props.mountMode,
            status:0,
            url:String(generateShareableLink(attrs.props,comId,orderId)),
            leftAttrs: JSON.stringify(attrs.leftAttrs),
            middleAttrs: JSON.stringify(attrs.middleAttrs),
            rightAttrs: JSON.stringify(attrs.rightAttrs),
            mixedRight: attrs.mixedRight,
            isLatticeMiddle: attrs.isLatticeMiddle,
            optionalPostCore: attrs.optionalPostCore,
        }
      };

      const mutation = `
      mutation MyMutation($input: CreateOrderInput!) {
        createOrder(input: $input) {
          id
          # Otros campos que quieras retornar
        }
      }
    `;
    console.log(variables);

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
            handleOrderCreated(true);
            createOrderNotification(attrs,comId)
        }

    })

    .catch((error) => {

        console.error("err",error);

    });


}