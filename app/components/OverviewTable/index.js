import CustomerSelect from "./CustomerSelect";

export default function OverviewTable({globalAttrs,prices,dealerDiscount,renderedLast=true}) {

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

    const generateTable = (globalAttrs,specificAttrs) => {
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
                                        <th>Retail Price</th>
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
                                        <th>{Math.floor(specificAttrs.width/(2.5))+1}</th>
                                        
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
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>${parseFloat(prices.TotalPrice).toFixed(2)} <span className="original-price">{dealerDiscount?`$${prices.TotalPrice*(1+dealerDiscount)}`:""}</span></th>
                                        
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
                        <div key={index}>
                            {generateTable(globalAttrs,dict)}
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
                        <div key={index}>
                            {generateTable(globalAttrs,dict)}
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