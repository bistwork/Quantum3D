import Pergola from './Pergola';
import { useConfigurator } from "../contexts/Configurator";
import PergolaSelectionTab from './PergolaSelectionTab';
import PergolaOptionTab from './PergolaOptionTab';
import React,{useEffect,useState} from "react";
function App() {
  let attrs = null;
  attrs = useConfigurator();
  const [loadingAttrs,setLoadingAttrs] = useState(true);

  useEffect(() => {
    // Load configuration from URL params on component mount
    const params = new URLSearchParams(window.location.search);
    const width = params.get('width');
    if (width) {
      attrs.setWidth(width);
    }
    const height = params.get('height');
    if (height) {
      attrs.setHeight(height);
    }
    const projection = params.get('projection');
    if (projection) {
      attrs.setProjection(projection);
    }
    const rafterSize = params.get('rafterSize');
    if (rafterSize) {
      attrs.setRafterSize(rafterSize);
    }
    const rafterAlign = params.get('rafterAlign');
    if (rafterAlign) {
      attrs.setRafterAlign(rafterAlign);
    }
    const mountMode = params.get('mountMode');
    if (mountMode) {
      attrs.setMountMode(mountMode);
    }
    const selectedHead = params.get('selectedHead');
    if (selectedHead) {
      attrs.setHead(selectedHead);
    }
    const selectedRafterHeaders = params.get('selectedRafterHeaders');
    if (selectedRafterHeaders) {
      attrs.setRafterHeader(selectedRafterHeaders);
    }
    const selectedRafterEndCaps = params.get('selectedRafterEndCaps');
    if (selectedRafterEndCaps) {
      attrs.setRafterEndCaps(selectedRafterEndCaps);
    }
    const postType = params.get('postType');
    if (postType) {
      attrs.setPostType(postType);
    }
    const selectedEnd = params.get('selectedEnd');
    if (selectedEnd) {
      attrs.setEnd(selectedEnd);
    }
    const materials = params.get('materials');
    if (materials) {
      attrs.setMaterials(JSON.parse(decodeURIComponent(materials)))
    }
    const dealerId = params.get('dealerId');
    if(dealerId){
      attrs.setDealerId(dealerId);
    }
    const model = params.get('model');
    if (model) {
      attrs.setModel(model);
    }
    const orderId = params.get('orderId');
    if (orderId) {
      attrs.setOrderId(orderId);
    }
    const comId = params.get('comId');
    if (comId) {
      attrs.setComId(comId);
    }
    setLoadingAttrs(false)
  }, [attrs]);

  const board = attrs!=null ? attrs.selectedBoard : 0;
  
  if(attrs && !loadingAttrs){if(!attrs.orderId){
      return (
        <>
          <link href='https://fonts.googleapis.com/css?family=Barlow Condensed' rel='stylesheet'/>    
          <div className="PergolaSelectionContainer">
            <div className="canvas-and-inspector">
              <PergolaSelectionTab attrs = {attrs}/>
              {board !=undefined && board !=6 &&
              <div className='canvas'>
                  <Pergola/>
              </div>}
            </div>
            <div className="selector-container">
              <PergolaOptionTab attrs={attrs} />
            </div>
          </div>
        </>
      )
    }
    else{
      return (
        <>
          <link href='https://fonts.googleapis.com/css?family=Barlow Condensed' rel='stylesheet'/>
          <div className="PergolaSelectionContainer">
            <div className="canvas-and-inspector">
              {board !=undefined && board !=0 &&<PergolaSelectionTab attrs = {attrs}/>}
              {board !=undefined && board !=6 && board!=7 && 
              <div className='canvas'>              
                  <Pergola/>
              </div>}
            </div>
            <div className="selector-container">
              <PergolaOptionTab attrs={attrs} />
            </div>
          </div>
        </>
      )
    }}
  
}

export default App
