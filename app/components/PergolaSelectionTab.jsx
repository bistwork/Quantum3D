import React,{useEffect, useMemo, useState} from 'react';
import Popup from './Popup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

const PergolaSelectionTab = ({attrs})=>{
    const [showLink, setShowLink] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isNotified, setNotifiedPayment] = useState(false);
    const [isClientSelected, setClientSelected] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [clients, setClients] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderCreated,setOrderCreated] = useState(false);
    
    let label = " ";
    if(attrs){ 
        switch(attrs.model){
            case "lattice":
                label = "Lattice";
                break;
            case "insulated":
                label = "Insulated";
                break;
            case "mixed":
                label = "Mixed";
                break;
            case "lattice-insulated":
                label = "Lattice & Insulated";
                break;
            default:
                label = "Choice";
                break;
        }
}
const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);

// Handle checkbox changes
const handleCheckbox1Change = (event) => {
  setIsCheckbox1Checked(event.target.checked);
};

const handleCheckbox2Change = (event) => {
  setIsCheckbox2Checked(event.target.checked);
};
const createNotification = (orderId) => {
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
            setNotifiedPayment(true);
            console.log(isNotified)
        }

    })

    .catch((error) => {

        console.error("err",error);

    });

}
const updateOrder = () => {
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
// Handle submission logic
const handleSubmission = () => {
    if(attrs.orderId){
        if (isCheckbox1Checked && isCheckbox2Checked) {
          // Perform your submission logic here
          // For example, redirect to the link
          createNotification(attrs.orderId);
          updateOrder();
          window.location.href = "https://www.oasispatiosystems.com/";
        }
        else {
          // Display an error message or take appropriate action
          alert("Please check both checkboxes before submitting.");
        }
    }
    else{
        alert("There is not a related order to work with")
    }
  // Check if both checkboxes are checked before allowing submission
};
    const hidePhoneNumber = (phoneNumber) => {
        return `***-****-${phoneNumber.slice(-4)}`;
    };
    if(attrs!=undefined){const handleWidthChange =  (event) =>{
        const {value} = (event.target);
        if(attrs.model=="lattice-insulated"){
            attrs.activeModelRight?attrs.rightAttrs.setWidth(value):attrs.leftAttrs.setWidth(value)
        }
        else{
            attrs.setWidth(value);
        }
    };
    const handleDepthChange =  (event) =>{
        const {value} = (event.target);
        if(attrs.model=="lattice-insulated"){
            attrs.activeModelRight?attrs.rightAttrs.setProjection(value):attrs.leftAttrs.setProjection(value)
        }
        else{
            attrs.setProjection(value);
        }
    };
    const handleHeightChange =  (event) =>{
        const {value} = (event.target);
        if(attrs.model=="lattice-insulated"){
            attrs.activeModelRight?attrs.rightAttrs.setHeight(value):attrs.leftAttrs.setHeight(value)
        }
        else{
            attrs.setHeight(value);
        }
    };
    const handleMaterialConfig = (key,option)=>{
        attrs.setMaterials((prevState) => ({
          ...prevState,
          [key]: option,
        }));
      };

    const getQuote = () => {

        const lattice2x2Price = 1.69;
        const lattice3x3Price = 2.47;
        const post3x3Price = 2.47;
        const post4x4Price = 2.75;
        const rafterPrice = 3.87;
        const beamPrice = 4.27;
        const tailKitsPrice = 15.79;
        const rectBeamPrice = 15.02;
        const squareTubePrice = 6.17;

        let totalPrice = 0;

        if(attrs){
            let numberOfColumns = 2;
            if(attrs.width <= 22){
                numberOfColumns = 2;
              }
            else if(attrs.width <= 34){
                numberOfColumns = 3;
            }
            else if(attrs.width <= 45){
                numberOfColumns = 4;
            }
            else if(attrs.width <= 56){
                numberOfColumns = 5;
            }
            else if(attrs.width <= 68){
                numberOfColumns = 6;
            }
            else if(attrs.width <= 79){
                numberOfColumns = 7;
            }
            else if(attrs.width <= 90){
                numberOfColumns = 8;
            }
            else if(attrs.width > 90){
                numberOfColumns = 0.0883*attrs.width + 0.0291;
            }

            let latticePrice;
            let columnPrice;
            let raftersPrice;
            let beamsPrice;
            let beamAndRafterEnds;
            let rectBeamsPrice;
            let postPrice;

            if(attrs.mountMode!=3){

                latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
                columnPrice = attrs.postType == 0? post3x3Price*attrs.height*numberOfColumns:post4x4Price*attrs.height*numberOfColumns;
                raftersPrice = attrs.projection * rafterPrice * Math.floor(attrs.width/2.5);
                beamsPrice = attrs.selectedHead == 0? attrs.width*beamPrice: 2*attrs.width*beamPrice;
                beamAndRafterEnds =  attrs.selectedHead == 0? 2*tailKitsPrice* Math.floor(attrs.width/2.5): 4*tailKitsPrice* Math.floor(attrs.width/2.5);
                rectBeamsPrice = attrs.selectedHead == 0? attrs.width*rectBeamPrice: 2*attrs.width*rectBeamPrice;
                postPrice = squareTubePrice*attrs.height*numberOfColumns;
            }
            else{
                latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
                columnPrice = attrs.postType == 0? 2*post3x3Price*attrs.height*numberOfColumns:2*post4x4Price*attrs.height*numberOfColumns;
                raftersPrice = attrs.projection * rafterPrice * Math.floor(attrs.width/2.5);
                beamsPrice = attrs.selectedHead == 0? 2*attrs.width*beamPrice: 4*attrs.width*beamPrice;
                beamAndRafterEnds =  attrs.selectedHead == 0? 4*tailKitsPrice* Math.floor(attrs.width/2.5): 8*tailKitsPrice* Math.floor(attrs.width/2.5);
                rectBeamsPrice = attrs.selectedHead == 0? 2*attrs.width*rectBeamPrice: 4*attrs.width*rectBeamPrice;
                postPrice = 2*squareTubePrice*attrs.height*numberOfColumns;
            }

            totalPrice+= latticePrice+columnPrice+raftersPrice+beamsPrice+beamAndRafterEnds+rectBeamsPrice+postPrice

            let prices = {
                "LatticePrice": latticePrice,
                "ColumnsPrice": columnPrice,
                "RaftersPrice": raftersPrice,
                "BeamsPrice": beamsPrice,
                "BeamAndRafterEndsPrice": beamAndRafterEnds,
                "RectangularBeamsPrice": rectBeamsPrice,
                "SquaredPostPrice": postPrice,
                "TotalPrice": Math.round(totalPrice)
            }
            return prices;
        }         
    }
    const createOrder = () => {
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
                customerId: clients[selectedClient].id,
                comercialId: comId,
                deliveryDate: "Pending",
                retailAmount:String(prices.TotalPrice),
                model:attrs.model,    
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
                url:String(generateShareableLink(attrs.props,comId,orderId))
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
                setOrderCreated(true);
                createOrderNotification(orderId)
            }

        })

        .catch((error) => {

            console.error("err",error);

        });


    }
    const createOrderNotification = (orderId) => {
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
                setOrderCreated(true);
            }

        })

        .catch((error) => {

            console.error("err",error);

        });

    }

    const generateShareableLink = (attrs,comId,orderId) => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams();
            const baseUrl = window.location.origin; 
            
            if(attrs){
                Object.entries(attrs).forEach(([key, value]) => {
                    const paramValue = typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : value;
                    params.append(key, paramValue);
                });
            
                return `${baseUrl}/?orderId=${orderId}&comId=${comId}&${params.toString()}`;}
          }
        return '';
        
    };
    const MySelectComponent = ({onSelectChange }) => {

        if(!clients){

            useMemo(() => {
                const fetchData = async () => {
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
                
                const fetchedClients = response.data.data.getUser.customers.items;
                setClients(fetchedClients);
                setLoading(false);
                console.log(response.data.data.getUser);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        
        if (!clients) {
            fetchData();
        }
    }, []);
    }   
    
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
                <select className="customer-select" onChange={onSelectChange} value={selectedClient}>
                <option value="">Select a Customer</option>
                {processedOptions}
                </select>)}
                <div className='get-estimate-container'>
                {!orderCreated &&(<button className={isClientSelected?'get-estimate-button':''} onClick={()=>{if(isClientSelected){createOrder()}}}>SEND QUOTE</button>)}
                    {orderCreated && (<>
                        <p className="success-message">Order succesfully created</p>
                        <p className="success-message">Thank you!</p>
                    </>)}
                </div>
            </>
          );
        };
    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
    const handleSelectionChange = (event) => {
        setSelectedClient(event.target.value);
        setClientSelected(event.target.value!=""?true:false)
    }

    const beamHeaderSelections = ["Single Beam Headers","Double Beam Header"];
    const beamEndSelections = ["Beveled","Mitered","Corbel","Scallop"];
    const rafterHeadSelection = ["Single Rafter"];
    const rafterEndCapsSelection = ["Beveled","Mitered","Corbel","Scallop"];
    const mountSelections = ["Attached to the Wall","Attached to Fascia/Eave","Attached to Roof","Free Standing"];
    const postSizing = ['3x3',"4x4"];
    const mats = ['Smokey Gray', "Cedar Wood", "Gray Feather", "Musket Brown", "Bronze", "Sand Stone", "Brown Oak Wood", "Platinum Gray", "Black"];
    const prices = getQuote()

    switch(attrs.selectedBoard){
        case 0:

            return <><div className="PergolaSelectionTab">
                <h2>Dimensions</h2>

                <p className='disclaimer'>For information on larger dimensions, please contact engineering team.<br></br><br></br>Beams 2x8 ½</p>

                <div className = 'dimension-selector'>
                    <div className="reset-container">
                        <button className="reset-button" onClick={()=>{
                            attrs.setWidth(10);
                            attrs.setProjection(6);
                            attrs.setHeight(8);
                            attrs.setMountMode(2);
                            handleMaterialConfig("cover",0);
                            handleMaterialConfig("posts",0);
                            handleMaterialConfig("rafter",0);
                            handleMaterialConfig("beam",0);
                            attrs.setRafterAlign(true);
                            attrs.setRafterSize(1.5);
                        }}>

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1816 2L16.0908 4.90912L13.1816 7.81823" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 9.27285V7.8183C3 7.04675 3.3065 6.30681 3.85206 5.76124C4.39763 5.21567 5.13757 4.90918 5.90912 4.90918H16.091" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.90912 17.9999L3 15.0908L5.90912 12.1816" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.091 10.7275V12.1821C16.091 12.9536 15.7845 13.6936 15.239 14.2392C14.6934 14.7847 13.9535 15.0912 13.1819 15.0912H3" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span>Reset to default</span>
                        </button>

                        {attrs.model == "lattice-insulated" && ( 
                            <button className="reset-button" onClick={()=>{
                                attrs.setMixedRight(-attrs.mixedRight);
                            }}>

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1816 2L16.0908 4.90912L13.1816 7.81823" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 9.27285V7.8183C3 7.04675 3.3065 6.30681 3.85206 5.76124C4.39763 5.21567 5.13757 4.90918 5.90912 4.90918H16.091" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.90912 17.9999L3 15.0908L5.90912 12.1816" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.091 10.7275V12.1821C16.091 12.9536 15.7845 13.6936 15.239 14.2392C14.6934 14.7847 13.9535 15.0912 13.1819 15.0912H3" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                <span>Switch Model</span>
                            </button>
                        )}

                    </div>
                    <div className="rafter-selector">
                        <div className="rafter-sizing">
                            <button className={attrs.rafterSize == 2? "activeMountMode":"rafterButton"} onClick={() =>{attrs.model=='lattice-insulated'?(attrs.activeModelRight?attrs.rightAttrs.setRafterSize(2):attrs.leftAttrs.setRafterSize(2)):attrs.setRafterSize(2);}}>2"</button>
                            <button className={attrs.rafterSize == 3? "activeMountMode":"rafterButton"} onClick={() =>{attrs.model=='lattice-insulated'?(attrs.activeModelRight?attrs.rightAttrs.setRafterSize(3):attrs.leftAttrs.setRafterSize(3)):attrs.setRafterSize(3);}}>3"</button>
                        </div>
                        {attrs.model=="lattice-insulated" && (<div className="rafter-sizing">
                            <button className={!attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(false);}}>Insulated</button>
                            <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);}}>Lattice</button>
                        </div>)}
                    </div>

                    <div className="dimension-selector-block">
                        <p>Length</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{if(attrs.width<=150 && attrs.width>10){attrs.setWidth(parseInt(attrs.width)-1)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24"height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{attrs.width}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer"onClick={() =>{if(attrs.width<150 && attrs.width>=10){attrs.setWidth(parseInt(attrs.width)+1)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="150"
                            value={attrs.model=="lattice-insulated"?(attrs.activeModelRight?attrs.rightAttrs.width:attrs.leftAttrs.width):attrs.width}
                            onChange={handleWidthChange}
                            
                            />
                        <div className="dim-inspector"><span>{10}</span><span>{150}</span></div>
                    </div>
                    <div className="dimension-selector-block">
                        <p>Projection</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{if(attrs.projection<=39 && attrs.projection>6){attrs.setProjection(parseInt(attrs.projection)-1)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{attrs.projection}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer" onClick={() =>{if(attrs.projection<39 && attrs.projection>=6){attrs.setProjection(parseInt(attrs.projection)+1)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="39"
                            value={attrs.model=="lattice-insulated"?(attrs.activeModelRight?attrs.rightAttrs.projection:attrs.leftAttrs.projection):attrs.projection}
                            onChange={handleDepthChange}
                            />
                        <div className="dim-inspector"><span>{6}</span><span>{39}</span></div>
                    </div>
                    <div className="dimension-selector-block">
                        <p>Height</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{if(attrs.height<=12 && attrs.height>8){attrs.setHeight(parseInt(attrs.height)-2)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{attrs.height}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer" onClick={() =>{if(attrs.height<12 && attrs.height>=8){attrs.setHeight(parseInt(attrs.height)+2)}}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="12"
                            value={attrs.model=="lattice-insulated"?(attrs.activeModelRight?attrs.rightAttrs.height:attrs.leftAttrs.height):attrs.height}
                            onChange={handleHeightChange}
                            step="2"
                            />
                        <div className="dim-inspector"><span>{8}</span><span>{12}</span></div>
                    </div>
                </div>
                <div className="tab-changer">
                    <button className='prev-button-disabled' onClick={()=>{
                        if(attrs.selectedBoard>0){
                            attrs.setSelectedBoard(attrs.selectedBoard-1);
                        }
                    }}><span className="prev-disabled">PREVIOUS</span></button>
                    <button className='next-button' onClick={()=>{if(attrs.selectedBoard<3){attrs.setSelectedBoard(attrs.selectedBoard+1);}}}><span>NEXT</span></button>
                </div>
            </div></>;
        case 1:
            return <><div className="PergolaSelectionTab">
                <h2>Structure</h2>

                <div className="mounting-selection">
                    {mountSelections.map((button, index) => (
                        <button
                        key={index}
                        className={attrs.mountMode === index ? 'activeMountMode' : ''}
                        onClick={() => {attrs.setMountMode(index)}}>
                        {button}
                        </button>
                    ))}
                </div>
                <p className='mounting-disclaimer'>Free Standing covers require concrete footings and an upgrade to steel post and beam inserts.</p>
                <div className="tab-changer">
                    <button className='prev-button' onClick={()=>{
                        attrs.setSelectedBoard(attrs.selectedBoard-1);
                    }}><span>PREVIOUS</span></button>
                    <button className='next-button' onClick={()=>{if(attrs.selectedBoard<3){attrs.setSelectedBoard(attrs.selectedBoard+1);}}}><span>NEXT</span></button>
                </div>
                
            </div></>;
            case 2:
                return <><div className="PergolaSelectionTab">
                    <h2>Header and Ends</h2>
    
                    <div className="reset-container head-end-reset">
                        <button className="reset-button" onClick={()=>{attrs.setHead(0);attrs.setEnd(0);}}>
    
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1816 2L16.0908 4.90912L13.1816 7.81823" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 9.27285V7.8183C3 7.04675 3.3065 6.30681 3.85206 5.76124C4.39763 5.21567 5.13757 4.90918 5.90912 4.90918H16.091" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.90912 17.9999L3 15.0908L5.90912 12.1816" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.091 10.7275V12.1821C16.091 12.9536 15.7845 13.6936 15.239 14.2392C14.6934 14.7847 13.9535 15.0912 13.1819 15.0912H3" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span>Reset Headers/Ends</span>
                        </button>
    
                    </div>

                    <div className = 'header-selector'>
                        <div className="header-selector-block">
                            <h3>Headers</h3>
                            <div className="header-inspector">
                                <div className='header-selection'>
                                    <button className={attrs.selectedHead==0? 'selectedhead single-beam' :'single-beam'} onClick={()=>{attrs.setHead(0)}}></button>
                                    <span>Single Beam Header</span>
                                </div>
                                <div className='header-selection'>
                                    <button className={attrs.selectedHead==1? 'selectedhead double-beam' :'double-beam'} onClick={()=>{attrs.setHead(1)}}></button>
                                    <span>Double Beam Header</span>
                                </div>
                            </div>
                        </div>
                        <div className="ends-selector-block">
                            <h3>Ends</h3>
                            <div className="ends-inspector">
                                <div className='ends-selection'>
                                    <button className={attrs.selectedEnd==0? 'selectedend beveled' :'beveled'} onClick={()=>{attrs.setEnd(0)}}></button>
                                    <span>Beveled</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedEnd==1? 'selectedend mitered' :'mitered'} onClick={()=>{attrs.setEnd(1)}}></button>
                                    <span>Mitered</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedEnd==2? 'selectedend corbel' :'corbel'} onClick={()=>{attrs.setEnd(2)}}></button>
                                    <span>Corbel</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedEnd==3? 'selectedend scallop' :'scallop'} onClick={()=>{attrs.setEnd(3)}}></button>
                                    <span>Scallop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-changer">
                        <button className='prev-button' onClick={()=>{
                            attrs.setSelectedBoard(attrs.selectedBoard-1);
                        }}><span>PREVIOUS</span></button>
                        <button className='next-button' onClick={()=>{if(attrs.selectedBoard<3){attrs.setSelectedBoard(attrs.selectedBoard+1);}}}><span>NEXT</span></button>
                    </div>
                    
                </div></>;
        case 3:
            return <><div className="PergolaSelectionTab">
                <h2>Posts</h2>

                <div className="mounting-selection">
                    {postSizing.map((button, index) => (
                        <button
                        key={index}
                        className={attrs.postType === index ? 'activeMountMode' : ''}
                        onClick={() => {attrs.setPostType(index)}}>
                        {button}
                        </button>
                    ))}
                </div>
                <div className="tab-changer">
                    <button className='prev-button' onClick={()=>{
                        attrs.setSelectedBoard(attrs.selectedBoard-1);
                    }}><span>PREVIOUS</span></button>
                    <button className='next-button' onClick={()=>{attrs.setSelectedBoard(attrs.selectedBoard+1)}}><span>NEXT</span></button>
                </div>
                
            </div></>;
        case 4:
            return <><div className="PergolaSelectionTab">
                    <h2>Rafter</h2>
    
                    <div className="reset-container head-end-reset">
                        <button className="reset-button" onClick={()=>{attrs.setRafterHeader(0);attrs.setRafterEndCaps(0);}}>
    
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1816 2L16.0908 4.90912L13.1816 7.81823" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 9.27285V7.8183C3 7.04675 3.3065 6.30681 3.85206 5.76124C4.39763 5.21567 5.13757 4.90918 5.90912 4.90918H16.091" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.90912 17.9999L3 15.0908L5.90912 12.1816" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.091 10.7275V12.1821C16.091 12.9536 15.7845 13.6936 15.239 14.2392C14.6934 14.7847 13.9535 15.0912 13.1819 15.0912H3" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span>Reset Headers/Ends</span>
                        </button>
    
                    </div>

                    <div className = 'header-selector'>
                        <div className="header-selector-block">
                            <h3>Headers</h3>
                            <div className="header-inspector">
                                <div className='header-selection'>
                                    <button className={attrs.selectedRafterHeaders==0? 'selectedhead single-beam' :'single-beam'} onClick={()=>{attrs.setRafterHeader(0)}}></button>
                                    <span>Single Rafter</span>
                                </div>
                            </div>
                        </div>
                        <div className="ends-selector-block">
                            <h3>Rafter End Caps</h3>
                            <div className="ends-inspector">
                                <div className='ends-selection'>
                                    <button className={attrs.selectedRafterEndCaps==0? 'selectedend beveled' :'beveled'} onClick={()=>{attrs.setRafterEndCaps(0)}}></button>
                                    <span>Beveled</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedRafterEndCaps==1? 'selectedend mitered' :'mitered'} onClick={()=>{attrs.setRafterEndCaps(1)}}></button>
                                    <span>Mitered</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedRafterEndCaps==2? 'selectedend corbel' :'corbel'} onClick={()=>{attrs.setRafterEndCaps(2)}}></button>
                                    <span>Corbel</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.selectedRafterEndCaps==3? 'selectedend scallop' :'scallop'} onClick={()=>{attrs.setRafterEndCaps(3)}}></button>
                                    <span>Scallop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-changer">
                        <button className='prev-button' onClick={()=>{
                            attrs.setSelectedBoard(attrs.selectedBoard-1);
                        }}><span>PREVIOUS</span></button>
                        <button className='next-button' onClick={()=>{attrs.setSelectedBoard(attrs.selectedBoard+1)}}><span>NEXT</span></button>
                    </div>
                    
                </div></>;
        case 5:
            return <><div className="PergolaSelectionTab">
                <h2>Colors</h2>
                <div className = 'color-selector'>
                    <div className="color-selector-block">
                        <p>{label}</p>
                        <div className="color-inspector">
                            <button onClick={()=>{handleMaterialConfig("option",0);}} className='smokey-mat'><p>Smokey Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",1);}} className='cedar-mat'><p>Cedar Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",2);}} className='gray-mat'><p>Gray Feather</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",3);}} className='musket-mat'><p>Musket Brown</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",4);}} className='bronze-mat'><p>Bronze</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",5);}} className='sand-mat'><p>Sand Stone</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",6);}} className='brown-mat'><p>Brown Oak Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",7);}} className='platinum-mat'><p>Platinum Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("option",8);}} className='black-mat'><p>Black</p></button>
                        </div>
                    </div>
                    <div className="color-selector-block">
                        <p>Rafters</p>
                        <div className="color-inspector">
                            <button onClick={()=>{handleMaterialConfig("rafter",0);}} className='smokey-mat'><p>Smokey Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",1);}} className='cedar-mat'><p>Cedar Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",2);}} className='gray-mat'><p>Gray Feather</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",3);}} className='musket-mat'><p>Musket Brown</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",4);}} className='bronze-mat'><p>Bronze</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",5);}} className='sand-mat'><p>Sand Stone</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",6);}} className='brown-mat'><p>Brown Oak Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",7);}} className='platinum-mat'><p>Platinum Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("rafter",8);}} className='black-mat'><p>Black</p></button>
                        </div>
                    </div>
                    <div className="color-selector-block">
                        <p>Beam</p>
                        <div className="color-inspector">
                            <button onClick={()=>{handleMaterialConfig("beam",0);}} className='smokey-mat'><p>Smokey Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",1);}} className='cedar-mat'><p>Cedar Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",2);}} className='gray-mat'><p>Gray Feather</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",3);}} className='musket-mat'><p>Musket Brown</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",4);}} className='bronze-mat'><p>Bronze</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",5);}} className='sand-mat'><p>Sand Stone</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",6);}} className='brown-mat'><p>Brown Oak Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",7);}} className='platinum-mat'><p>Platinum Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("beam",8);}} className='black-mat'><p>Black</p></button>
                        </div>
                    </div>
                    <div className="color-selector-block">
                        <p>Cover</p>
                        <div className="color-inspector">
                            <button onClick={()=>{handleMaterialConfig("cover",0);}} className='smokey-mat'><p>Smokey Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",1);}} className='cedar-mat'><p>Cedar Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",2);}} className='gray-mat'><p>Gray Feather</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",3);}} className='musket-mat'><p>Musket Brown</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",4);}} className='bronze-mat'><p>Bronze</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",5);}} className='sand-mat'><p>Sand Stone</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",6);}} className='brown-mat'><p>Brown Oak Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",7);}} className='platinum-mat'><p>Platinum Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("cover",8);}} className='black-mat'><p>Black</p></button>
                        </div>
                    </div>
                    <div className="color-selector-block">
                        <p>Post</p>
                        <div className="color-inspector">
                            <button onClick={()=>{handleMaterialConfig("post",0);}} className='smokey-mat'><p>Smokey Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",1);}} className='cedar-mat'><p>Cedar Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",2);}} className='gray-mat'><p>Gray Feather</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",3);}} className='musket-mat'><p>Musket Brown</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",4);}} className='bronze-mat'><p>Bronze</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",5);}} className='sand-mat'><p>Sand Stone</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",6);}} className='brown-mat'><p>Brown Oak Wood</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",7);}} className='platinum-mat'><p>Platinum Gray</p></button>
                            <button onClick={()=>{handleMaterialConfig("post",8);}} className='black-mat'><p>Black</p></button>
                        </div>
                    </div>
                </div>
                
                <div className="tab-changer">
                    <button className='prev-button' onClick={()=>{
                        attrs.setSelectedBoard(attrs.selectedBoard-1);
                    }}><span>PREVIOUS</span></button>
                    <button className='next-button' onClick={()=>{attrs.setSelectedBoard(attrs.selectedBoard+1)}}><span>NEXT</span></button>
                </div>
                
            </div></>;
        case 6:
            if(attrs.dealerId!=null){return <><div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                    {/* <button className='share-config' onClick={()=>{setShowLink(true)}}>SHARE</button>
                    {showLink && (
                    <div className="share-link-container">
                        <input className="share-link" type="text" value={shareableLink} readOnly />
                    </div>
                    )} */}
                </div>
                <div className="overview-container">
                    <div className='overview-table'>
                        <table>
                            <thead>
                                <tr className='overview-header'>
                                    <th>Model & Dimensions</th>
                                    <th>Product Name</th>
                                    <th>Dimensions (ft)</th>
                                    <th>Slats</th>
                                    <th>Count</th>
                                    <th>Retail Price</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Lattice</th>
                                    <th>{attrs['width']}x{attrs['projection']}x{attrs['height']}</th>
                                    <th>{attrs['rafterSize']}"</th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Structure</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Attachment</th>
                                    <th>{mountSelections[attrs.mountMode]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Headers & Ends</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Headers</th>
                                    <th>{beamHeaderSelections[attrs.selectedHead]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Ends</th>
                                    <th>{beamEndSelections[attrs.selectedEnd]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Posts</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Size</th>
                                    <th>{postSizing[attrs.postType]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Rafter</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Header</th>
                                    <th>{rafterHeadSelection[attrs.selectedRafterHeaders]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter End Caps</th>
                                    <th>{rafterEndCapsSelection[attrs.selectedRafterEndCaps]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Materials</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>{label} Material</th>
                                    <th>{mats[attrs["materials"]["option"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter Material</th>
                                    <th>{mats[attrs["materials"]["rafter"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Beam Material</th>
                                    <th>{mats[attrs["materials"]["beam"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Cover Material</th>
                                    <th>{mats[attrs["materials"]["cover"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                
                                <tr>
                                    <th></th>
                                    <th>Post Material</th>
                                    <th>{mats[attrs["materials"]["post"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>${parseFloat(prices.TotalPrice).toFixed(2)}</th>
                                    
                                </tr>
                                
                            
                            </tbody>
                        </table>
                    </div>

                    <div className="customer-select-container">
                        <h3>Customer Select</h3>
                        <MySelectComponent onSelectChange={handleSelectionChange} />
                            {/* <Popup isOpen={isPopupOpen} onClose={closePopup} onSend={()=>{createOrder()}}>
                                <form className='popup-form'>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":aa:" id=":aa:-label">First Name<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":aa:" name="firstName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ab:" id=":ab:-label">Last Name<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ab:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ac:" id=":ac:-label">Email<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ac:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ad:" id=":ad:-label">Phone<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ad:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ae:" id=":ae:-label">Address<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ae:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":af:" id=":af:-label">Zip code<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":af:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ag:" id=":ag:-label">City<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ag:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ah:" id=":ah:-label">How did you hear about us?</label><div className="input-container"><input aria-invalid="false" id=":ah:" name="lastName" required type="text" className="form-input" /></div></div>
                                <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ah:" id=":ah:-label">Message</label><div className="input-container"><input aria-invalid="false" id=":ah:" name="lastName" required type="text" className="form-input" /></div></div>
                                </form>
                            </Popup> */}
                    </div>
                    
                </div>


                
            </div></>;}
            else{return <>
            <div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                    {/* <button className='share-config' onClick={()=>{setShowLink(true)}}>SHARE</button>
                    {showLink && (
                    <div className="share-link-container">
                        <input className="share-link" type="text" value={shareableLink} readOnly />
                    </div>
                    )} */}
                </div>
                <div className="overview-container">
                    <div className='overview-table'>
                        <table>
                            <thead>
                                <tr className='overview-header'>
                                    <th>Model & Dimensions</th>
                                    <th>Product Name</th>
                                    <th>Dimensions (ft)</th>
                                    <th>Slats</th>
                                    <th>Count</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>{label}</th>
                                    <th>{attrs['width']}x{attrs['projection']}x{attrs['height']}</th>
                                    <th>{attrs['rafterSize']}"</th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Structure</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Attachment</th>
                                    <th>{mountSelections[attrs.mountMode]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Headers & Ends</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Headers</th>
                                    <th>{beamHeaderSelections[attrs.selectedHead]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Ends</th>
                                    <th>{beamEndSelections[attrs.selectedEnd]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Posts</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Size</th>
                                    <th>{postSizing[attrs.postType]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Rafter</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Header</th>
                                    <th>{rafterHeadSelection[attrs.selectedRafterHeaders]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter End Caps</th>
                                    <th>{rafterEndCapsSelection[attrs.selectedRafterEndCaps]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className='sec-header'>
                                    <th>Materials</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Lattice Material</th>
                                    <th>{mats[attrs["materials"]["option"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter Material</th>
                                    <th>{mats[attrs["materials"]["rafter"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Beam Material</th>
                                    <th>{mats[attrs["materials"]["beam"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Cover Material</th>
                                    <th>{mats[attrs["materials"]["cover"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                
                                <tr>
                                    <th></th>
                                    <th>Post Material</th>
                                    <th>{mats[attrs["materials"]["post"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* <div className='get-estimate-container'>
                        <button className='get-estimate-button' onClick={()=>{openPopup()}}>GET ESTIMATE</button>
                        <Popup isOpen={isPopupOpen} onClose={closePopup} onSend={()=>{console.log(getQuote())}}>
                            <form className='popup-form'>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":aa:" id=":aa:-label">First Name<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":aa:" name="firstName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ab:" id=":ab:-label">Last Name<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ab:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ac:" id=":ac:-label">Email<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ac:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ad:" id=":ad:-label">Phone<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ad:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ae:" id=":ae:-label">Address<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ae:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":af:" id=":af:-label">Zip code<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":af:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ag:" id=":ag:-label">City<span aria-hidden="true" className="asterisk"> *</span></label><div className="input-container"><input aria-invalid="false" id=":ag:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ah:" id=":ah:-label">How did you hear about us?</label><div className="input-container"><input aria-invalid="false" id=":ah:" name="lastName" required type="text" className="form-input" /></div></div>
                            <div className="form-selection-block" errormessages="this field is required"><label className="form-label" data-shrink="false" htmlFor=":ah:" id=":ah:-label">Message</label><div className="input-container"><input aria-invalid="false" id=":ah:" name="lastName" required type="text" className="form-input" /></div></div>
                            </form>
                        </Popup>
                    </div> */}
                </div>
            </div>
            </>;}
        case 7:
            return <>
            <div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                    {/* <button className='share-config' onClick={()=>{setShowLink(true)}}>SHARE</button>
                    {showLink && (
                    <div className="share-link-container">
                        <input className="share-link" type="text" value={shareableLink} readOnly />
                    </div>
                    )} */}
                </div>
                <div className="overview-container">
                    <div className='disclaimer'>
                        <h3>Disclaimer</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit laudantium doloribus voluptatum omnis eius et optio eos! Recusandae at maxime sequi voluptatibus laudantium quae. Doloremque impedit nihil itaque quos dolorum!</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit laudantium doloribus voluptatum omnis eius et optio eos! Recusandae at maxime sequi voluptatibus laudantium quae. Doloremque impedit nihil itaque quos dolorum!</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit laudantium doloribus voluptatum omnis eius et optio eos! Recusandae at maxime sequi voluptatibus laudantium quae. Doloremque impedit nihil itaque quos dolorum!</p>
                        { !isNotified &&(<><div className="checkbox-container">
                        <div class="form-check mb-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="formCheck1"
                            onChange={handleCheckbox1Change}
                            checked={isCheckbox1Checked}
                        />
                        <label class="form-check-label" for="formCheck1">
                        By checking this box, I acknowledge that I have read and agree to the terms and conditions, and I confirm my acceptance of the project specifications and measures.
                        </label>
                        </div>

                        <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="formCheck2"
                            onChange={handleCheckbox2Change}
                            checked={isCheckbox2Checked}
                        />
                        <label class="form-check-label" for="formCheck2">
                        By checking this box, I acknowledge and confirm that I have completed the payment required to initiate the project. I authorize the commencement of the project based on the agreed terms and conditions.
                        </label>
                        </div>
                        
                        </div>
                        <div className="disclaimer-button-container">
                        <button className="disclaimer-button" onClick={()=>{attrs.setSelectedBoard(attrs.selectedBoard - 1)}}>PREVIOUS</button>
                        <button className={isCheckbox1Checked?(isCheckbox2Checked?"disclaimer-button":"disclaimer-button submit-disabled"):"disclaimer-button submit-disabled"} onClick={handleSubmission}>
                            SUBMIT
                        </button>
                        </div></>)}
                        {isNotified && (<><p className="success-message">Order succesfully updated</p>
                        <p className="success-message">Thank you!</p></>)}
                    </div>
                </div>
            </div>
        </>            
    }

    
}
};


export default PergolaSelectionTab;
