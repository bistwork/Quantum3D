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
                                    <th>{String(data.model).toUpperCase()}</th>
                                    <th>{data['width']}x{data['projection']}x{data['height']}</th>
                                    <th>{data['rafterSize']}"</th>
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
                                    <th>{mountSelections[data.mountMode]}</th>
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
                                    <th>{beamHeaderSelections[data.selectedHead]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Ends</th>
                                    <th>{beamEndSelections[data.selectedEnd]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
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
                                    <th>{postSizing[data.postType]}</th>
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
                                    <th>{rafterHeadSelection[data.selectedRafterHeaders]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rafter End Caps</th>
                                    <th>{rafterEndCapsSelection[data.selectedRafterEndCaps]}</th>
                                    <th></th>
                                    <th>1</th>
                                    
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
                                    <th>{String(data.model).toLocaleUpperCase()} Material</th>
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
                                
                            
                            </tbody>
                        </table>)
}

}