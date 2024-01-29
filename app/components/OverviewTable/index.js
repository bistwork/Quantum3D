import CustomerSelect from "./CustomerSelect";
import { useState } from "react";

export default function OverviewTable({globalAttrs,prices,dealerDiscount}) {

    const beamHeaderSelections = ["Single Beam Headers","Double Beam Header"];
    const beamEndSelections = ["Beveled","Mitered","Corbel","Scallop"];
    const rafterHeadSelection = ["Single Rafter"];
    const rafterEndCapsSelection = ["Beveled","Mitered","Corbel","Scallop"];
    const mountSelections = ["Attached to the Wall","Attached to Fascia/Eave","Attached to Roof","Free Standing"];
    const postSizing = ['3x3',"4x4"];
    const mats = ['Smokey Gray', "Cedar Wood", "Gray Feather", "Musket Brown", "Bronze", "Sand Stone", "Brown Oak Wood", "Platinum Gray", "Black"];
    let label = " ";
    const latticeInsulated = [globalAttrs.leftAttrs,globalAttrs.rightAttrs];
    const mixed = [globalAttrs.leftAttrs,globalAttrs.rightAttrs,globalAttrs.middleAttrs];


    const generateTable = (globalAttrs,specificAttrs,index=3) => {
        if(!globalAttrs?.orderId && globalAttrs?.dealerId){
            console.log("DealerView")
            switch(globalAttrs.model){
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
            return <>
                        <div className='overview-table'>
                            <table>
                                <thead>
                                    <tr className='overview-header'>
                                        <th>Model & Dimensions</th>
                                        <th>Product Name</th>
                                        <th>Dimensions (ft)</th>
                                        <th>Slats</th>
                                        <th>Count</th>
                                        <th className={globalAttrs.model=="mixed"?index==0?"":"not-visible-at-all":globalAttrs.model=="lattice-insulated"?index==0?"":"not-visible-at-all":""}>Retail Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th>{globalAttrs.model=="mixed"?globalAttrs.isLatticeMiddle?index==1?"Lattice":"Insulated":index==1?"Insulated":"Lattice":globalAttrs.model=="lattice-insulated"?globalAttrs.mixedRight?index==0?"Insulated":"Lattice":index==0?"Lattice":"Insulated":label}</th>
                                        <th>{specificAttrs['width']}x{specificAttrs['projection']}x{specificAttrs['height']}</th>
                                        <th>{specificAttrs['rafterSize']}"</th>
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
                                        <th>{mountSelections[specificAttrs.mountMode]}</th>
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
                                        <th>{beamHeaderSelections[specificAttrs.selectedHead]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Ends</th>
                                        <th>{beamEndSelections[specificAttrs.selectedEnd]}</th>
                                        <th></th>
                                        <th>{specificAttrs.selectedHead==1?specificAttrs.mountMode!=3?"4":"8":specificAttrs.mountMode!=3?"2":"4"}</th>
                                        
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
                                        <th>{postSizing[specificAttrs.postType]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Aluminum Insert (PCS)</th>
                                        <th>{specificAttrs.optionalPostCore==0?"None":specificAttrs.optionalPostCore==1?"3x3":"4x4"}</th>
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
                                        <th>{rafterHeadSelection[specificAttrs.selectedRafterHeaders]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Rafter End Caps</th>
                                        <th>{rafterEndCapsSelection[specificAttrs.selectedRafterEndCaps]}</th>
                                        <th></th>
                                        <th>{globalAttrs.model=="mixed"?globalAttrs.isLatticeMiddle?index==1?Math.floor(specificAttrs.width/(2.5))+1:Math.floor(specificAttrs.width/(4))+1:index==1?Math.floor(specificAttrs.width/(4))+1:Math.floor(specificAttrs.width/(2.5))+1:globalAttrs.model=="lattice-insulated"?globalAttrs.mixedRight?index==0?Math.floor(specificAttrs.width/(4))+1:Math.floor(specificAttrs.width/(2.5))+1:index==0?Math.floor(specificAttrs.width/(2.5))+1:Math.floor(specificAttrs.width/(4))+1:Math.floor(specificAttrs.width/(2.5))+1}</th>
                                        
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
                                        <th>{mats[specificAttrs["materials"]["option"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Rafter Material</th>
                                        <th>{mats[specificAttrs["materials"]["rafter"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Beam Material</th>
                                        <th>{mats[specificAttrs["materials"]["beam"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Cover Material</th>
                                        <th>{mats[specificAttrs["materials"]["cover"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    
                                    <tr>
                                        <th></th>
                                        <th>Post Material</th>
                                        <th>{mats[specificAttrs["materials"]["post"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr className='sec-header'>
                                        <th>Additionals</th>
                                        <th>Product Name</th>
                                        <th>Count</th>
                                        <th></th>
                                        <th>Type</th>
                                        
                                    </tr>
                                        <>
                                    {(globalAttrs.model === 'insulated' ||
                                    (globalAttrs.model === 'mixed' &&
                                    globalAttrs.isLatticeMiddle &&
                                    index !== 1) ||
                                    (globalAttrs.model === 'lattice-insulated' &&
                                    globalAttrs.mixedRight &&
                                    index === 0)) && (
                                        <>
                                            <tr>
                                                <th></th>
                                                <th>#14 X 4 SDS ZINC AVG</th>
                                                <th>50</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>1/4 X 1-1/2 NEOP. BONDED WASHERS AVG</th>
                                                <th>50</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            </>
                                            )}
                                            <tr>
                                                <th></th>
                                                <th>#10X3/4 SDS WHITE CTN-500 AVG</th>
                                                <th>1</th>
                                                <th></th>
                                                <th>Box</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>1/4 X 4 1/2 HEX BOLT ZINC AVG</th>
                                                <th>12</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>1/4-20 HEX NUTS ZINC PLATED (EA)</th>
                                                <th>12</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>1/4 FLAT WASHER ZINC PLATED</th>
                                                <th>24</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>1/4 X 3 1/4 QUICKSET (TAPCON) WHITE CT-100</th>
                                                <th>1</th>
                                                <th></th>
                                                <th>Box</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>#14X2 SDS WHITE CTN-100 AVG</th>
                                                <th>1</th>
                                                <th></th>
                                                <th>Box</th>
                                            </tr>
                                            {(globalAttrs.model === 'lattice' ||
                                    (globalAttrs.model === 'mixed' &&
                                    globalAttrs.isLatticeMiddle &&
                                    index == 1) ||
                                    (globalAttrs.model === 'lattice-insulated' &&
                                    globalAttrs.mixedRight &&
                                    index !== 0)) && (
                                        <>
                                            <tr>
                                                <th></th>
                                                <th>14X3 HX SDS WITH BONDED WASHER (5/8)</th>
                                                <th>500</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            </>
                                            )}
                                            <tr>
                                                <th></th>
                                                <th>PAINT WHITE HIGH GLOSS (PIECES) BASE</th>
                                                <th>1</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>4" PEEL & SEAL ROLL 33' WHITE </th>
                                                <th>2</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>915 CAULKING WHITE (24 PC PER BOX)</th>
                                                <th>4</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>5/8" PERGALUM PLASTIC PLUG WHITE COLOR</th>
                                                <th>100</th>
                                                <th></th>
                                                <th>ca</th>
                                            </tr>
                        
                                        </>

                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className={globalAttrs.model=="mixed"?index==2?"":"not-visible":globalAttrs.model=="lattice-insulated"?index==1?"":"not-visible":""}>${parseFloat(prices.TotalPrice).toFixed(2)} <span className={globalAttrs.model=="mixed"?index==2?"original-price":"not-visible":globalAttrs.model=="lattice-insulated"?index==1?"original-price":"not-visible":"original-price"}>{dealerDiscount?`$${prices.TotalPrice*(1+dealerDiscount)}`:""}</span></th>
                                        
                                    </tr>
                                    
                                
                                </tbody>
                            </table>
                        </div>

                </>
                }else{
                    console.log("ClientView")

                    return (<>
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
                                        <th>{specificAttrs['width']}x{specificAttrs['projection']}x{specificAttrs['height']}</th>
                                        <th>{specificAttrs['rafterSize']}"</th>
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
                                        <th>{mountSelections[specificAttrs.mountMode]}</th>
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
                                        <th>{beamHeaderSelections[specificAttrs.selectedHead]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Ends</th>
                                        <th>{beamEndSelections[specificAttrs.selectedEnd]}</th>
                                        <th></th>
                                        <th>{specificAttrs.selectedHead==1?specificAttrs.mountMode!=3?"4":"8":specificAttrs.mountMode!=3?"2":"4"}</th>
                                        
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
                                        <th>{postSizing[specificAttrs.postType]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Aluminum Insert (PCS)</th>
                                        <th>{specificAttrs.optionalPostCore==0?"None":specificAttrs.optionalPostCore==1?"3x3":"4x4"}</th>
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
                                        <th>{rafterHeadSelection[specificAttrs.selectedRafterHeaders]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Rafter End Caps</th>
                                        <th>{rafterEndCapsSelection[specificAttrs.selectedRafterEndCaps]}</th>
                                        <th></th>
                                        <th>{(Math.floor(specificAttrs.width/(2.5))+1)}</th>
                                        
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
                                        <th>{mats[specificAttrs["materials"]["option"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Rafter Material</th>
                                        <th>{mats[specificAttrs["materials"]["rafter"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Beam Material</th>
                                        <th>{mats[specificAttrs["materials"]["beam"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Cover Material</th>
                                        <th>{mats[specificAttrs["materials"]["cover"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                    
                                    <tr>
                                        <th></th>
                                        <th>Post Material</th>
                                        <th>{mats[specificAttrs["materials"]["post"]]}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </>)
            }
        
    }

    if(globalAttrs.model=="lattice-insulated"){
        return (<>
            <div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                </div>
                <div className="overview-container">

                    {latticeInsulated.map((dict, index) => (
                        
                        <div className="mult-overview" key={index}>
                            {generateTable(globalAttrs,dict,index)}
                        </div>            
                    ))}

                    {globalAttrs.dealerId && !globalAttrs.orderId &&
                        <div className="customer-select-container">
                            <h3>Customer Select</h3>
                            <CustomerSelect attrs={globalAttrs} prices={prices} discount={dealerDiscount}/>
                        </div>}        
                </div>
            </div>
        </>)
    }
    else if(globalAttrs.model=="mixed"){
        return (<>
            <div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                </div>
                <div className="overview-container">

                    {mixed.map((dict, index) => (
                        
                        <div className="mult-overview" key={index}>
                            {generateTable(globalAttrs,dict,index)}
                        </div>
                        
                    ))}

                    {globalAttrs.dealerId && !globalAttrs.orderId &&
                        <div className="customer-select-container">
                            <h3>Customer Select</h3>
                            <CustomerSelect attrs={globalAttrs} prices={prices} discount={dealerDiscount}/>
                        </div>}             
                </div>
            </div>
        </>)
        
    }
    else{
        return (<>
            <div className="PergolaSelectionTab overview">
                <div className="share-config-container">
                    <img src="/textures/logo.webp" className='logo'/>
                </div>
                <div className="overview-container">
                    {generateTable(globalAttrs,globalAttrs)}

                    {globalAttrs.dealerId && !globalAttrs.orderId &&
                        <div className="customer-select-container">
                            <h3>Customer Select</h3>
                            <CustomerSelect attrs={globalAttrs} prices={prices} discount={dealerDiscount}/>
                        </div>}        
                </div>
            </div>
            </>)
    }

         
}