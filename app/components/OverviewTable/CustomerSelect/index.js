import { useState,useEffect } from "react";
import axios from 'axios';
import { createOrder } from "../../api/orders";
export default function CustomerSelect({attrs,prices,discount}){

    const [loading,setLoading] = useState(true)
    const [clients, setClients] = useState(null);
    const [orderCreated,setOrderCreated] = useState(false);
    const [isClientSelected, setClientSelected] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    
    const hidePhoneNumber = (phoneNumber) => {
        return `***-****-${phoneNumber.slice(-4)}`;
    };

    const handleSelectionChange = (event) => {
        setSelectedClient(event.target.value);
        setClientSelected(event.target.value!=""?true:false)
    }
    const handleOrderCreated = (event) => setOrderCreated(event);


    const fetchData = async () =>{    
        try {
            const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
            const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';
            const query = `
            query ListCustomersByUser {
                getUser(id:"${attrs.dealerId}"){
                    tier {
                        id
                        discountPercentage
                    }
                    customers {
                        items {
                            primaryInfo {
                                primaryPhone
                                firstName
                                lastName
                            }
                            id
                        }
                    }
                }
            }
            `;

            const response = await axios.post(
                apiUrl,
                {
                    query: query,
                    variables: {
                        userId: String(attrs.dealerId) // Replace with the actual user ID
                    }
                },
                {
                    headers: {
                        'x-api-key': apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
            const fetchedClients = response.data.data.getUser.customers.items;
            setClients(fetchedClients);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching customers:', error);
            setLoading(false);
        }    
    }

    useEffect(() => {
        fetchData();
    }, []);

        if (loading) {
            return <p>Loading...</p>;
        }
    
        const processedOptions = clients != null ? clients.map((option, index) => {
        const { firstName, lastName, primaryPhone } = option.primaryInfo;
        const displayText = `${firstName} ${lastName} ${hidePhoneNumber(primaryPhone)}`;
        return (
          <option key={index} value={index}>
            {displayText}
          </option>
        );
      }):null;
    
      return (
        <>
            {!orderCreated &&(
            <select className="customer-select" onChange={handleSelectionChange} value={selectedClient}>
            <option value="">Select a Customer</option>
            {processedOptions}
            </select>)}
            <div className='get-estimate-container'>
            {!orderCreated &&(<button className={isClientSelected?'get-estimate-button':''} onClick={()=>{if(isClientSelected){createOrder(attrs,clients[selectedClient],prices,handleOrderCreated)}}}>SEND QUOTE</button>)}
                {orderCreated && (<>
                    <p className="success-message">Order succesfully created</p>
                    <p className="success-message">Thank you!</p>
                </>)}
            </div>
        </>
      );
};