import styles from './ProjectOverview.module.css';
export default function ProjectOverview(props) {

    const data = props.children;
    const materials = data?JSON.parse(data.materials):null;
    const beamHeaderSelections = ["Single Beam Headers","Double Beam Header"];
    const beamEndSelections = ["Beveled","Mitered","Corbel","Scallop"];
    const rafterHeadSelection = ["Single Rafter"];
    const rafterEndCapsSelection = ["Beveled","Mitered","Corbel","Scallop"];
    const mountSelections = ["Attached to the Wall","Attached to Fascia/Eave","Attached to Roof","Free Standing"];
    const postSizing = ['3x3',"4x4"];
    const mats = ['Smokey Gray', "Cedar Wood", "Gray Feather", "Musket Brown", "Bronze", "Sand Stone", "Brown Oak Wood", "Platinum Gray", "Black"];
    const latticeInsulated = [data?JSON.parse(data.leftAttrs):null,data?JSON.parse(data.rightAttrs):null];
    const mixed = [data?JSON.parse(data.leftAttrs):null,data?JSON.parse(data.rightAttrs):null,data?JSON.parse(data.middleAttrs):null];
    const generateTable = (data,specificData,index=0) => {
        console.log(data)
        if(data){
        return (
            <table className={styles.overviewTable}>
                            <thead>
                                <tr className={styles.overviewHeader}>
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
                                    <th>{data?.model=="mixed"?data?.isLatticeMiddle?index==1?"Lattice":"Insulated":index==1?"Insulated":"Lattice":data?.model=="latticeInsulated"?data?.mixedRight?index==0?"Insulated":"Lattice":index==0?"Lattice":"Insulated":label}</th>
                                    <th>{specificData['width']}x{specificData['projection']}x{specificData['height']}</th>
                                    <th>{specificData['rafterSize']}"</th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className={styles.secHeader}>
                                    <th>Structure</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Attachment</th>
                                    <th>{mountSelections[specificData?.mountMode]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className={styles.secHeader}>
                                    <th>Headers & Ends</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Headers</th>
                                    <th>{beamHeaderSelections[specificData?.selectedHead]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Ends</th>
                                    <th>{beamEndSelections[specificData?.selectedEnd]}</th>
                                    <th></th>
                                    <th>{specificData.selectedHead==1?specificData.mountMode!=3?"4":"8":specificData.mountMode!=3?"2":"4"}</th>
                                    
                                </tr>
                                <tr className={styles.secHeader}>
                                    <th>Posts</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Size</th>
                                    <th>{postSizing[specificData?.postType]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                        <th></th>
                                        <th>Aluminum Insert (PCS)</th>
                                        <th>{specificData?.optionalPostCore==0?"None":specificData?.optionalPostCore==1?"3x3":"4x4"}</th>
                                        <th></th>
                                        <th>1</th>
                                        
                                    </tr>
                                <tr className={styles.secHeader}>
                                    <th>Rafter</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Header</th>
                                    <th>{rafterHeadSelection[specificData?.selectedRafterHeaders]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter End Caps</th>
                                    <th>{rafterEndCapsSelection[specificData?.selectedRafterEndCaps]}</th>
                                    <th></th>
                                    <th>{data.model=="mixed"?data.isLatticeMiddle?index==1?Math.floor(specificData.width/(2.5))+1:Math.floor(specificData.width/(4))+1:index==1?Math.floor(specificData.width/(4))+1:Math.floor(specificData.width/(2.5))+1:data.model=="latticeInsulated"?data.mixedRight?index==0?Math.floor(specificData.width/(4))+1:Math.floor(specificData.width/(2.5))+1:index==0?Math.floor(specificData.width/(2.5))+1:Math.floor(specificData.width/(4))+1:Math.floor(specificData.width/(2.5))+1}</th>
                                    
                                </tr>
                                <tr className={styles.secHeader}>
                                    <th>Materials</th>
                                    <th>Property</th>
                                    <th>Selection</th>
                                    <th></th>
                                    <th>Count</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Option Material</th>
                                    <th>{mats[materials["option"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter Material</th>
                                    <th>{mats[materials["rafter"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Beam Material</th>
                                    <th>{mats[materials["beam"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Cover Material</th>
                                    <th>{mats[materials["cover"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                
                                <tr>
                                    <th></th>
                                    <th>Post Material</th>
                                    <th>{mats[materials["post"]]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr className={styles.secHeader}>
                                        <th>Additionals</th>
                                        <th>Product Name</th>
                                        <th>Count</th>
                                        <th></th>
                                        <th>Type</th>
                                        
                                    </tr>
                                        <>
                                        {
                                            (data?.model == 'insulated' ||
                                                (data?.model == 'mixed' &&
                                                data?.isLatticeMiddle &&
                                                index != 1) ||
                                                (data?.model == 'latticeInsulated' &&
                                                data?.mixedRight &&
                                                index == 0)) && (
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
                                            )
                                            }
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
                                            {(data?.model == 'lattice' ||
                                    (data?.model == 'mixed' &&
                                    data?.isLatticeMiddle &&
                                    index == 1) ||
                                    (data?.model == 'latticeInsulated' &&
                                    data?.mixedRight &&
                                    index != 0)) && (
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
                                
                            
                            </tbody>
                        </table>)
    }}

    if(data){

        if(data?.model=="latticeInsulated"){
            return (<>
                        {latticeInsulated.map((dict, index) => (
                            
                            <div className="mult-overview" key={index}>
                                {generateTable(data,dict,index)}
                            </div>            
                        ))}

                        
                    
            </>)
        }
        else if(data?.model=="mixed"){
            return (<>
                

                        {mixed.map((dict, index) => (
                            
                            <div className="mult-overview" key={index}>
                                {generateTable(data,dict,index)}
                            </div>
                            
                        ))}

                            
                    
            </>)
            
        }
        else{
            return (<>
                
                        {generateTable(data,data)}

                        
                    
                </>)
        }
    }
}