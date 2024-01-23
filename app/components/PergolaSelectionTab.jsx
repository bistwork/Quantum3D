import React,{useEffect, useMemo, useState} from 'react';
import OverviewTable from './OverviewTable';
import { calculateDiscount, getQuote } from '../utils/quoting';
import {createNotification } from './api/notifications'
import { updateOrder } from './api/orders';
import CustomerSelect from './OverviewTable/CustomerSelect';

const PergolaSelectionTab = ({attrs})=>{
    const [isNotified, setNotifiedPayment] = useState(false);
    const [dealerDiscount,setDealerDiscount] = useState(null);
    const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
    const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
    
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
    
    const handleDealerDiscountChange=(discount)=>setDealerDiscount(discount);
    calculateDiscount(attrs,handleDealerDiscountChange);


    const handleCheckbox1Change = (event) => {
        setIsCheckbox1Checked(event.target.checked);
    };

    const handleCheckbox2Change = (event) => {
        setIsCheckbox2Checked(event.target.checked);
    };

    const handleNotificationCreation = (event) => setNotifiedPayment(event);

    const handleSubmission = () => {
        if(attrs.orderId){
            if (isCheckbox1Checked && isCheckbox2Checked) {
            
                createNotification(attrs,attrs.comId,handleNotificationCreation);
                updateOrder(attrs);
                window.location.href = "https://www.oasispatiosystems.com/";
            }
            else {
                alert("Please check both checkboxes before submitting.");
            }
        }
        else{
            alert("There is not a related order to work with")
        }
    };

    const handleWidthChange =  (event) =>{
        const {value} = (event.target);
        if(attrs.model=="lattice-insulated"){
            attrs.activeModelRight?attrs.rightAttrs.setWidth(value):attrs.leftAttrs.setWidth(value)
        }
        else if(attrs.model=="mixed"){
            if(attrs.activeModelRight){
                attrs.rightAttrs.setWidth(value)
            }
            else if(attrs.activeModelLeft){

                attrs.leftAttrs.setWidth(value)
            }
            else{
                attrs.middleAttrs.setWidth(value)
            }
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
        else if(attrs.model=="mixed"){
            if(attrs.activeModelRight){
                attrs.rightAttrs.setProjection(value)
            }
            else if(attrs.activeModelLeft){

                attrs.leftAttrs.setProjection(value)
            }
            else{
                attrs.middleAttrs.setProjection(value)
            }
        }
        else{
            attrs.setProjection(value);
        }
    };
    const handleHeightChange =  (event) =>{
        const {value} = (event.target);
        if(attrs.model=="lattice-insulated"){
            if(attrs.activeModelRight){
                attrs.rightAttrs.setHeight(value)
            }
            else{
                attrs.leftAttrs.setHeight(value)
            }
        }
        else if(attrs.model=="mixed"){
            if(attrs.activeModelRight){
                attrs.rightAttrs.setHeight(value)
            }
            else if(attrs.activeModelLeft){

                attrs.leftAttrs.setHeight(value)
            }
            else{
                attrs.middleAttrs.setHeight(value)
            }
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

    

    const handleOptional3x3 = (event) => {
        if(attrs.model=="lattice-insulated"){

        }
        else if(attrs.model=="mixed"){

        }
        else{
            if(event.target.checked){
                attrs.setOptionalPostCore(1);
            }
            else{
                if(attrs.optionalPostCore!=2){
                    attrs.setOptionalPostCore(0);
                }
            }
        }
    }
    const handleOptional4x4 = (event) => {
        if(attrs.model=="lattice-insulated"){

        }
        else if(attrs.model=="mixed"){

        }
        else{
            if(event.target.checked){
                attrs.setOptionalPostCore(2);
            }
            else{
                if(attrs.optionalPostCore!=1){
                    attrs.setOptionalPostCore(0);
                }
            }
        }
    }


    if(attrs){
    
    const mountSelections = ["Attached to the Wall","Attached to Fascia/Eave","Attached to Roof","Free Standing"];
    const postSizing = ['3x3',"4x4"];

    const prices = getQuote(attrs,dealerDiscount);

    switch(attrs.selectedBoard){
        case 0:
            return <><div className="PergolaSelectionTab">
                <h2>Dimensions</h2>

                <p className='disclaimer'>For information on larger dimensions, please contact engineering team.<br></br><br></br>Beams 2x8 ½</p>

                <div className = 'dimension-selector'>
                    <div className="reset-container">
                        <button className="reset-button" onClick={()=>{
                            if(attrs.model=="mixed"){

                                attrs.leftAttrs.setWidth(10);
                                attrs.leftAttrs.setProjection(6);
                                attrs.leftAttrs.setHeight(8);
                                attrs.leftAttrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.leftAttrs.setRafterAlign(true);
                                attrs.leftAttrs.setRafterSize(2);

                                attrs.middleAttrs.setWidth(10);
                                attrs.middleAttrs.setProjection(6);
                                attrs.middleAttrs.setHeight(8);
                                attrs.middleAttrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.middleAttrs.setRafterAlign(true);
                                attrs.middleAttrs.setRafterSize(2);

                                attrs.rightAttrs.setWidth(10);
                                attrs.rightAttrs.setProjection(6);
                                attrs.rightAttrs.setHeight(8);
                                attrs.rightAttrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.rightAttrs.setRafterAlign(true);
                                attrs.rightAttrs.setRafterSize(2);

                            }
                            else if(attrs.model=="lattice-insulated"){

                                attrs.leftAttrs.setWidth(10);
                                attrs.leftAttrs.setProjection(6);
                                attrs.leftAttrs.setHeight(8);
                                attrs.leftAttrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.leftAttrs.setRafterAlign(true);
                                attrs.leftAttrs.setRafterSize(2);

                                attrs.rightAttrs.setWidth(10);
                                attrs.rightAttrs.setProjection(6);
                                attrs.rightAttrs.setHeight(8);
                                attrs.rightAttrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.rightAttrs.setRafterAlign(true);
                                attrs.rightAttrs.setRafterSize(2);
                            }
                            else{

                                attrs.setWidth(10);
                                attrs.setProjection(6);
                                attrs.setHeight(8);
                                attrs.setMountMode(2);
                                handleMaterialConfig("cover",0);
                                handleMaterialConfig("posts",0);
                                handleMaterialConfig("rafter",0);
                                handleMaterialConfig("beam",0);
                                attrs.setRafterAlign(true);
                                attrs.setRafterSize(2);
                            }
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
                        {attrs.model == "mixed" && ( 
                            <button className="reset-button" onClick={()=>{
                                attrs.setIsLatticeMiddle(!attrs.isLatticeMiddle);
                            }}>

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1816 2L16.0908 4.90912L13.1816 7.81823" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 9.27285V7.8183C3 7.04675 3.3065 6.30681 3.85206 5.76124C4.39763 5.21567 5.13757 4.90918 5.90912 4.90918H16.091" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.90912 17.9999L3 15.0908L5.90912 12.1816" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.091 10.7275V12.1821C16.091 12.9536 15.7845 13.6936 15.239 14.2392C14.6934 14.7847 13.9535 15.0912 13.1819 15.0912H3" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                <span>Swap Sides</span>
                            </button>
                        )}

                    </div>
                    <div className="rafter-selector">
                        <div className="rafter-sizing">

                            <button className={(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.rafterSize==2?"activeMountMode":"rafterButton":attrs.leftAttrs.rafterSize==2?"activeMountMode":"rafterButton"):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.rafterSize==2?"activeMountMode":"rafterButton":attrs.activeModelMiddle?attrs.middleAttrs.rafterSize==2?"activeMountMode":"rafterButton":attrs.rightAttrs.rafterSize==2?"activeMountMode":"rafterButton"):attrs.rafterSize==2?"activeMountMode":"rafterButton")} onClick={() =>{attrs.model=='lattice-insulated'?(attrs.activeModelRight?attrs.rightAttrs.setRafterSize(2):attrs.leftAttrs.setRafterSize(2)):attrs.model=="mixed"?attrs.activeModelLeft?attrs.leftAttrs.setRafterSize(2):attrs.activeModelMiddle?attrs.middleAttrs.setRafterSize(2):attrs.rightAttrs.setRafterSize(2):attrs.setRafterSize(2);}}>2"</button>

                            <button className={(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.rafterSize==3?"activeMountMode":"rafterButton":attrs.leftAttrs.rafterSize==3?"activeMountMode":"rafterButton"):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.rafterSize==3?"activeMountMode":"rafterButton":attrs.activeModelMiddle?attrs.middleAttrs.rafterSize==3?"activeMountMode":"rafterButton":attrs.rightAttrs.rafterSize==3?"activeMountMode":"rafterButton"):attrs.rafterSize==3?"activeMountMode":"rafterButton")} onClick={() =>{attrs.model=='lattice-insulated'?(attrs.activeModelRight?attrs.rightAttrs.setRafterSize(3):attrs.leftAttrs.setRafterSize(3)):attrs.model=="mixed"?attrs.activeModelLeft?attrs.leftAttrs.setRafterSize(3):attrs.activeModelMiddle?attrs.middleAttrs.setRafterSize(3):attrs.rightAttrs.setRafterSize(3):attrs.setRafterSize(3);}}>3"</button>
                        </div>
                        {attrs.model=="lattice-insulated" && (<div className="rafter-sizing">
                            <button className={!attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(false);}}>Insulated</button>
                            <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);}}>Lattice</button>
                        </div>)}
                        {attrs.model=="mixed" && (<div className="rafter-sizing">
                            <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelRight(false)}}>Left</button>
                            <button className={attrs.activeModelMiddle? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelMiddle(true);attrs.setActiveModelLeft(false);attrs.setActiveModelRight(false)}}>Center</button>
                            <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelLeft(false)}}>Right</button>
                        </div>)}
                    </div>

                    <div className="dimension-selector-block">
                        <p>Length</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{
                                if(attrs.model=="lattice-insulated"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.width<=150 && attrs.rightAttrs.width >10){
                                            attrs.rightAttrs.setWidth(parseInt(attrs.rightAttrs.width)-1)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.width<=150 && attrs.leftAttrs.width >10){
                                            attrs.leftAttrs.setWidth(parseInt(attrs.leftAttrs.width)-1)
                                        }
                                    }
                                }
                                else if(attrs.model=="mixed"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.width<=150 && attrs.rightAttrs.width >10){
                                            attrs.rightAttrs.setWidth(parseInt(attrs.rightAttrs.width)-1)
                                        }
                                    }
                                    else if(attrs.activeModelMiddle){
                                        if(attrs.middleAttrs.width<=150 && attrs.middleAttrs.width >10){
                                            attrs.middleAttrs.setWidth(parseInt(attrs.middleAttrs.width)-1)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.width<=150 && attrs.leftAttrs.width >10){
                                            attrs.leftAttrs.setWidth(parseInt(attrs.leftAttrs.width)-1)
                                        }
                                    }
                                }
                                else{
                                    if(attrs.width<=150 && attrs.width>10){
                                        attrs.setWidth(parseInt(attrs.width)-1)
                                        }
                                    }
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="24"height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{
                                (attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.width:attrs.leftAttrs.width):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.width:attrs.activeModelMiddle?attrs.middleAttrs.width:attrs.rightAttrs.width):attrs.width)}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer"onClick={() =>{
                                    if(attrs.model=="lattice-insulated"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.width<150 && attrs.rightAttrs.width >=10){
                                                attrs.rightAttrs.setWidth(parseInt(attrs.rightAttrs.width)+1)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.width<150 && attrs.leftAttrs.width >=10){
                                                attrs.leftAttrs.setWidth(parseInt(attrs.leftAttrs.width)+1)
                                            }
                                        }
                                    }
                                    else if(attrs.model=="mixed"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.width<150 && attrs.rightAttrs.width >=10){
                                                attrs.rightAttrs.setWidth(parseInt(attrs.rightAttrs.width)+1)
                                            }
                                        }
                                        else if(attrs.activeModelMiddle){
                                            if(attrs.middleAttrs.width<150 && attrs.middleAttrs.width >=10){
                                                attrs.middleAttrs.setWidth(parseInt(attrs.middleAttrs.width)+1)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.width<150 && attrs.leftAttrs.width >=10){
                                                attrs.leftAttrs.setWidth(parseInt(attrs.leftAttrs.width)+1)
                                            }
                                        }
                                    }
                                    else{
                                        if(attrs.width<150 && attrs.width>=10){
                                            attrs.setWidth(parseInt(attrs.width)+1)
                                            }
                                        }
                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="150"
                            value={(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.width:attrs.leftAttrs.width):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.width:attrs.activeModelMiddle?attrs.middleAttrs.width:attrs.rightAttrs.width):attrs.width)}
                            onChange={handleWidthChange}
                            
                            />
                        <div className="dim-inspector"><span>{10}</span><span>{150}</span></div>
                    </div>
                    <div className="dimension-selector-block">
                        <p>Projection</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{
                                if(attrs.model=="lattice-insulated"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.projection<=39 && attrs.rightAttrs.projection >6){
                                            attrs.rightAttrs.setProjection(parseInt(attrs.rightAttrs.projection)-1)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.projection<=39 && attrs.leftAttrs.projection >6){
                                            attrs.leftAttrs.setProjection(parseInt(attrs.leftAttrs.projection)-1)
                                        }
                                    }
                                }
                                else if(attrs.model=="mixed"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.projection<=39 && attrs.rightAttrs.projection >6){
                                            attrs.rightAttrs.setProjection(parseInt(attrs.rightAttrs.projection)-1)
                                        }
                                    }
                                    else if(attrs.activeModelMiddle){
                                        if(attrs.middleAttrs.projection<=39 && attrs.middleAttrs.projection >6){
                                            attrs.middleAttrs.setProjection(parseInt(attrs.middleAttrs.projection)-1)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.projection<=39 && attrs.leftAttrs.projection >6){
                                            attrs.leftAttrs.setProjection(parseInt(attrs.leftAttrs.projection)-1)
                                        }
                                    }
                                }
                                else{
                                    if(attrs.projection<=39 && attrs.projection>6){
                                        attrs.setProjection(parseInt(attrs.projection)-1)
                                        }
                                    }
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.projection:attrs.leftAttrs.projection):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.projection:attrs.activeModelMiddle?attrs.middleAttrs.projection:attrs.rightAttrs.projection):attrs.projection)}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer" onClick={() =>{
                                    if(attrs.model=="lattice-insulated"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.projection<39 && attrs.rightAttrs.projection >=6){
                                                attrs.rightAttrs.setProjection(parseInt(attrs.rightAttrs.projection)+1)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.projection<39 && attrs.leftAttrs.projection >=6){
                                                attrs.leftAttrs.setProjection(parseInt(attrs.leftAttrs.projection)+1)
                                            }
                                        }
                                    }
                                    else if(attrs.model=="mixed"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.projection<39 && attrs.rightAttrs.projection >=6){
                                                attrs.rightAttrs.setProjection(parseInt(attrs.rightAttrs.projection)+1)
                                            }
                                        }
                                        else if(attrs.activeModelMiddle){
                                            if(attrs.middleAttrs.projection<39 && attrs.middleAttrs.projection >=6){
                                                attrs.middleAttrs.setProjection(parseInt(attrs.middleAttrs.projection)+1)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.projection<39 && attrs.leftAttrs.projection >=6){
                                                attrs.leftAttrs.setProjection(parseInt(attrs.leftAttrs.projection)+1)
                                            }
                                        }
                                    }
                                    else{
                                        if(attrs.projection<39 && attrs.projection>=6){
                                            attrs.setProjection(parseInt(attrs.projection)+1)
                                            }
                                        }
                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="39"
                            value={(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.projection:attrs.leftAttrs.projection):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.projection:attrs.activeModelMiddle?attrs.middleAttrs.projection:attrs.rightAttrs.projection):attrs.projection)}
                            onChange={handleDepthChange}
                            />
                        <div className="dim-inspector"><span>{6}</span><span>{39}</span></div>
                    </div>
                    <div className="dimension-selector-block">
                        <p>Height</p>
                        <div className="dim-inspector">
                            <button className='dim-button-changer' onClick={() =>{
                                if(attrs.model=="lattice-insulated"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.height<=12 && attrs.rightAttrs.height >8){
                                            attrs.rightAttrs.setHeight(parseInt(attrs.rightAttrs.height)-2)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.height<=12 && attrs.leftAttrs.height >8){
                                            attrs.leftAttrs.setHeight(parseInt(attrs.leftAttrs.height)-2)
                                        }
                                    }
                                }
                                else if(attrs.model=="mixed"){
                                    if(attrs.activeModelRight){
                                        if(attrs.rightAttrs.height<=12 && attrs.rightAttrs.height >8){
                                            attrs.rightAttrs.setHeight(parseInt(attrs.rightAttrs.height)-2)
                                        }
                                    }
                                    else if(attrs.activeModelMiddle){
                                        if(attrs.middleAttrs.height<=12 && attrs.middleAttrs.height >8){
                                            attrs.middleAttrs.setHeight(parseInt(attrs.middleAttrs.height)-2)
                                        }
                                    }
                                    else{
                                        if(attrs.leftAttrs.height<=12 && attrs.leftAttrs.height >8){
                                            attrs.leftAttrs.setHeight(parseInt(attrs.leftAttrs.height)-2)
                                        }
                                    }
                                }
                                else{
                                    if(attrs.height<=12 && attrs.height>8){
                                        attrs.setHeight(parseInt(attrs.height)-2)
                                        }
                                    }
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button><label><span className="dim-label">{(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.height:attrs.leftAttrs.height):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.height:attrs.activeModelMiddle?attrs.middleAttrs.height:attrs.rightAttrs.height):attrs.height)}</span><span className="dim-label-scale"> ft</span></label><button className="dim-button-changer" onClick={() =>{
                                    if(attrs.model=="lattice-insulated"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.height<12 && attrs.rightAttrs.height >=8){
                                                attrs.rightAttrs.setHeight(parseInt(attrs.rightAttrs.height)+2)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.height<12 && attrs.leftAttrs.height >=8){
                                                attrs.leftAttrs.setHeight(parseInt(attrs.leftAttrs.height)+2)
                                            }
                                        }
                                    }
                                    else if(attrs.model=="mixed"){
                                        if(attrs.activeModelRight){
                                            if(attrs.rightAttrs.height<12 && attrs.rightAttrs.height >=8){
                                                attrs.rightAttrs.setHeight(parseInt(attrs.rightAttrs.height)+2)
                                            }
                                        }
                                        else if(attrs.activeModelMiddle){
                                            if(attrs.middleAttrs.height<12 && attrs.middleAttrs.height >=8){
                                                attrs.middleAttrs.setHeight(parseInt(attrs.middleAttrs.height)+2)
                                            }
                                        }
                                        else{
                                            if(attrs.leftAttrs.height<12 && attrs.leftAttrs.height >=8){
                                                attrs.leftAttrs.setHeight(parseInt(attrs.leftAttrs.height)+2)
                                            }
                                        }
                                    }
                                    else{
                                        if(attrs.height<12 && attrs.height>=8){
                                            attrs.setHeight(parseInt(attrs.height)+2)
                                            }
                                        }
                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></button>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="12"
                            value={(attrs.model=="lattice-insulated")?(attrs.activeModelRight?attrs.rightAttrs.height:attrs.leftAttrs.height):(attrs.model=='mixed'?(attrs.activeModelLeft?attrs.leftAttrs.height:attrs.activeModelMiddle?attrs.middleAttrs.height:attrs.rightAttrs.height):attrs.height)}
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

                <div className="rafter-selector">
                {attrs.model=="lattice-insulated" && (<div className="rafter-sizing" style={{'padding':"0.5em"}}>
                            <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);}}>Insulated</button>
                            <button className={!attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(false);}}>Lattice</button>
                        </div>)}
                        {attrs.model=="mixed" && (<div className="rafter-sizing" style={{'padding':"0.5em"}}>
                            <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelRight(false)}}>Left</button>
                            <button className={attrs.activeModelMiddle? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelMiddle(true);attrs.setActiveModelLeft(false);attrs.setActiveModelRight(false)}}>Center</button>
                            <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelLeft(false)}}>Right</button>
                        </div>)}
                </div>

                <div className="mounting-selection">
                    {mountSelections.map((button, index) => (
                        <button
                        key={index}
                        className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.mountMode===index?'activeMountMode':'':attrs.rightAttrs.mountMode===index?'activeMountMode':'':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.mountMode===index?'activeMountMode':'':attrs.activeModelMiddle?attrs.middleAttrs.mountMode===index?'activeMountMode':'':attrs.rightAttrs.mountMode===index?"activeMountMode":"":attrs.mountMode === index ? 'activeMountMode' : ''}
                        onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setMountMode(index)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setMountMode(index)
                                }
                                else{
                                    attrs.rightAttrs.setMountMode(index)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setMountMode(index)
                                }
                                else if(!attrs.activeModelLeft){
                                    attrs.rightAttrs.setMountMode(index)
                                }
                            }
                            attrs.setMountMode(index)
                            }}>
                        
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

                    <div className="rafter-selector">
                    {attrs.model=="lattice-insulated" && (<div className="rafter-sizing" style={{'padding':"0.0em"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);}}>Insulated</button>
                                <button className={!attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(false);}}>Lattice</button>
                            </div>)}
                            {attrs.model=="mixed" && (<div className="rafter-sizing" style={{'padding':"0.0em"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelRight(false)}}>Left</button>
                                <button className={attrs.activeModelMiddle? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelMiddle(true);attrs.setActiveModelLeft(false);attrs.setActiveModelRight(false)}}>Center</button>
                                <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelLeft(false)}}>Right</button>
                            </div>)}
                    </div>

                    <div className = 'header-selector'>
                        <div className="header-selector-block">
                            <h3>Headers</h3>
                            <div className="header-inspector">
                                <div className='header-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedHead == 0?'selectedhead single-beam':'single-beam':attrs.rightAttrs.selectedHead == 0?'selectedhead single-beam':'single-beam':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedHead == 0?'selectedhead single-beam':'single-beam':attrs.activeModelMiddle?attrs.middleAttrs.selectedHead == 0?'selectedhead single-beam':'single-beam':attrs.rightAttrs.selectedHead == 0?"selectedhead single-beam":"single-beam":attrs.selectedHead == 0 ? 'selectedhead single-beam' : 'single-beam'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setHead(0)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setHead(0)
                                }
                                else{
                                    attrs.rightAttrs.setHead(0)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setHead(0)
                                }
                                else{
                                    attrs.rightAttrs.setHead(0)
                                }
                            }
                            attrs.setHead(0)}}></button>
                                    <span>Single Beam Header</span>
                                </div>
                                <div className='header-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedHead == 1?'selectedhead double-beam':'double-beam':attrs.rightAttrs.selectedHead == 1?'selectedhead double-beam':'double-beam':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedHead == 1?'selectedhead double-beam':'double-beam':attrs.activeModelMiddle?attrs.middleAttrs.selectedHead == 1?'selectedhead double-beam':'double-beam':attrs.rightAttrs.selectedHead == 1?"selectedhead double-beam":"double-beam":attrs.selectedHead == 1 ? 'selectedhead double-beam' : 'double-beam'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setHead(1)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setHead(1)
                                }
                                else{
                                    attrs.rightAttrs.setHead(1)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setHead(1)
                                }
                                else{
                                    attrs.rightAttrs.setHead(1)
                                }
                            }
                            attrs.setHead(1)}}></button>
                                    <span>Double Beam Header</span>
                                </div>
                            </div>
                        </div>
                        <div className="ends-selector-block">
                            <h3>Ends</h3>
                            <div className="ends-inspector">
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 0?'selectedhead beveled':'beveled':attrs.rightAttrs.selectedEnd == 0?'selectedend beveled':'beveled':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 0?'selectedend beveled':'beveled':attrs.activeModelMiddle?attrs.middleAttrs.selectedEnd == 0?'selectedend beveled':'beveled':attrs.rightAttrs.selectedEnd == 0?"selectedend beveled":"beveled":attrs.selectedEnd == 0 ? 'selectedend beveled' : 'beveled'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(0)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setEnd(0)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(0)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(0)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(0)
                                }
                            }
                            attrs.setEnd(0)}}></button>
                                    <span>Beveled</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 1?'selectedhead mitered':'mitered':attrs.rightAttrs.selectedEnd == 1?'selectedend mitered':'mitered':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 1?'selectedend mitered':'mitered':attrs.activeModelMiddle?attrs.middleAttrs.selectedEnd == 1?'selectedend mitered':'mitered':attrs.rightAttrs.selectedEnd == 1?"selectedend mitered":"mitered":attrs.selectedEnd == 1 ? 'selectedend mitered' : 'mitered'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(1)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setEnd(1)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(1)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(1)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(1)
                                }
                            }
                            attrs.setEnd(1)}}></button>
                                    <span>Mitered</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 2?'selectedhead corbel':'corbel':attrs.rightAttrs.selectedEnd == 2?'selectedend corbel':'corbel':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 2?'selectedend corbel':'corbel':attrs.activeModelMiddle?attrs.middleAttrs.selectedEnd == 2?'selectedend corbel':'corbel':attrs.rightAttrs.selectedEnd == 2?"selectedend corbel":"corbel":attrs.selectedEnd == 2 ? 'selectedend corbel' : 'corbel'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(2)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setEnd(2)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(2)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(2)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(2)
                                }
                            }
                            attrs.setEnd(2)}}></button>
                                    <span>Corbel</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 3?'selectedhead scallop':'scallop':attrs.rightAttrs.selectedEnd == 3?'selectedend scallop':'scallop':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedEnd == 3?'selectedend scallop':'scallop':attrs.activeModelMiddle?attrs.middleAttrs.selectedEnd == 3?'selectedend scallop':'scallop':attrs.rightAttrs.selectedEnd == 3?"selectedend scallop":"scallop":attrs.selectedEnd == 3 ? 'selectedend scallop' : 'scallop'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(3)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setEnd(3)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(3)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setEnd(3)
                                }
                                else{
                                    attrs.rightAttrs.setEnd(3)
                                }
                            }
                            attrs.setEnd(3)}}></button>
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

                <div className="rafter-selector">
                    {attrs.model=="lattice-insulated" && (<div className="rafter-sizing" style={{'padding':"0.0em"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);}}>Insulated</button>
                                <button className={!attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(false);}}>Lattice</button>
                            </div>)}
                            {attrs.model=="mixed" && (<div className="rafter-sizing" style={{'padding':"0.0em"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelRight(false)}}>Left</button>
                                <button className={attrs.activeModelMiddle? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelMiddle(true);attrs.setActiveModelLeft(false);attrs.setActiveModelRight(false)}}>Center</button>
                                <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelLeft(false)}}>Right</button>
                            </div>)}
                </div>


                <div className="mounting-selection">
                    {postSizing.map((button, index) => (
                        <button
                        key={index}
                        className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.postType===index?'activeMountMode':'':attrs.rightAttrs.postType===index?'activeMountMode':'':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.postType===index?'activeMountMode':'':attrs.activeModelMiddle?attrs.middleAttrs.postType===index?'activeMountMode':'':attrs.rightAttrs.postType===index?"activeMountMode":"":attrs.postType === index ? 'activeMountMode' : ''}
                        onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setPostType(index)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setPostType(index)
                                }
                                else{
                                    attrs.rightAttrs.setPostType(index)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setPostType(index)
                                }
                                else{
                                    attrs.rightAttrs.setPostType(index)
                                }
                            }
                            attrs.setPostType(index)
                        }}>
                        {button}
                        </button>
                    ))}
                </div>
                <h3>Aluminum Inserts (PCS)</h3>

                <div className="post-form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="3x3optional"
                        onChange={handleOptional3x3}
                        checked={attrs.model=="lattice-insulated"?false:attrs.model=="mixed"?false:attrs.optionalPostCore==1}
                    />
                    <label className="form-check-label" htmlFor="3x3optional">
                        3x3 (PCS) Price: $5.20
                    </label>
                </div>

                <div className="post-form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="4x4optional"
                        onChange={handleOptional4x4}
                        checked={attrs.model=="lattice-insulated"?false:attrs.model=="mixed"?false:attrs.optionalPostCore==2}
                    />
                    <label className="form-check-label" htmlFor="4x4optional">
                        4x4 (PCS) Price: $15.33
                    </label>
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

                    <div className="rafter-selector">
                    {attrs.model=="lattice-insulated" && (<div className="rafter-sizing" style={{'padding':"0"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);}}>Insulated</button>
                                <button className={!attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(false);}}>Lattice</button>
                            </div>)}
                            {attrs.model=="mixed" && (<div className="rafter-sizing" style={{'padding':"0.0"}}>
                                <button className={attrs.activeModelLeft? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelLeft(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelRight(false)}}>Left</button>
                                <button className={attrs.activeModelMiddle? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelMiddle(true);attrs.setActiveModelLeft(false);attrs.setActiveModelRight(false)}}>Center</button>
                                <button className={attrs.activeModelRight? "activeMountMode":"rafterButton"} onClick={() =>{attrs.setActiveModelRight(true);attrs.setActiveModelMiddle(false);attrs.setActiveModelLeft(false)}}>Right</button>
                            </div>)}
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
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 0?'selectedhead beveled':'beveled':attrs.rightAttrs.selectedRafterEndCaps == 0?'selectedend beveled':'beveled':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 0?'selectedend beveled':'beveled':attrs.activeModelMiddle?attrs.middleAttrs.selectedRafterEndCaps == 0?'selectedend beveled':'beveled':attrs.rightAttrs.selectedRafterEndCaps == 0?"selectedend beveled":"beveled":attrs.selectedRafterEndCaps == 0 ? 'selectedend beveled' : 'beveled'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(0)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setRafterEndCaps(0)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(0)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(0)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(0)
                                }
                            }
                            attrs.setRafterEndCaps(0)

                            }}></button>
                                    <span>Beveled</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 1?'selectedhead mitered':'mitered':attrs.rightAttrs.selectedRafterEndCaps == 1?'selectedend mitered':'mitered':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 1?'selectedend mitered':'mitered':attrs.activeModelMiddle?attrs.middleAttrs.selectedRafterEndCaps == 1?'selectedend mitered':'mitered':attrs.rightAttrs.selectedRafterEndCaps == 1?"selectedend mitered":"mitered":attrs.selectedRafterEndCaps == 1 ? 'selectedend mitered' : 'mitered'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(1)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setRafterEndCaps(1)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(1)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(1)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(1)
                                }
                            }
                            attrs.setRafterEndCaps(1)

                            }}></button>
                                    <span>Mitered</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 2?'selectedhead corbel':'corbel':attrs.rightAttrs.selectedRafterEndCaps == 2?'selectedend corbel':'corbel':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 2?'selectedend corbel':'corbel':attrs.activeModelMiddle?attrs.middleAttrs.selectedRafterEndCaps == 2?'selectedend corbel':'corbel':attrs.rightAttrs.selectedRafterEndCaps == 2?"selectedend corbel":"corbel":attrs.selectedRafterEndCaps == 2 ? 'selectedend corbel' : 'corbel'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(2)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setRafterEndCaps(2)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(2)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(2)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(2)
                                }
                            }
                            attrs.setRafterEndCaps(2)

                            }}></button>
                                    <span>Corbel</span>
                                </div>
                                <div className='ends-selection'>
                                    <button className={attrs.model=="lattice-insulated"?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 3?'selectedhead scallop':'scallop':attrs.rightAttrs.selectedRafterEndCaps == 3?'selectedend scallop':'scallop':attrs.model=='mixed'?attrs.activeModelLeft?attrs.leftAttrs.selectedRafterEndCaps == 3?'selectedend scallop':'scallop':attrs.activeModelMiddle?attrs.middleAttrs.selectedRafterEndCaps == 3?'selectedend scallop':'scallop':attrs.rightAttrs.selectedRafterEndCaps == 3?"selectedend scallop":"scallop":attrs.selectedRafterEndCaps == 3 ? 'selectedend scallop' : 'scallop'} onClick={() => {
                            if(attrs.model=="mixed"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(3)
                                }
                                else if(attrs.activeModelMiddle){
                                    attrs.middleAttrs.setRafterEndCaps(3)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(3)
                                }
                            }
                            else if(attrs.model=="lattice-insulated"){
                                if(attrs.activeModelLeft){
                                    attrs.leftAttrs.setRafterEndCaps(3)
                                }
                                else{
                                    attrs.rightAttrs.setRafterEndCaps(3)
                                }
                            }
                            attrs.setRafterEndCaps(3)

                            }}></button>
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
                            <button onClick={()=>{handleMaterialConfig("option",11);}} className='white-mat'><p>White</p></button>
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
                            <button onClick={()=>{handleMaterialConfig("rafter",11);}} className='white-mat'><p>White</p></button>
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
                            <button onClick={()=>{handleMaterialConfig("beam",11);}} className='white-mat'><p>White</p></button>
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
                            <button onClick={()=>{handleMaterialConfig("cover",11);}} className='white-mat'><p>White</p></button>
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
                            <button onClick={()=>{handleMaterialConfig("post",11);}} className='white-mat'><p>White</p></button>
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
    
            return( attrs &&
                    (
                    <OverviewTable
                        globalAttrs = {attrs} 
                        prices = {prices} 
                        dealerDiscount = {dealerDiscount}
                    />
                    )
                    
                )
        

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
                        <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="formCheck1"
                            onChange={handleCheckbox1Change}
                            checked={isCheckbox1Checked}
                        />
                        <label className="form-check-label" htmlFor="formCheck1">
                        By checking this box, I acknowledge that I have read and agree to the terms and conditions, and I confirm my acceptance of the project specifications and measures.
                        </label>
                        </div>

                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="formCheck2"
                            onChange={handleCheckbox2Change}
                            checked={isCheckbox2Checked}
                        />
                        <label className="form-check-label" htmlFor="formCheck2">
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
