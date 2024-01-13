import { createContext, useContext, useState } from "react";

const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
    const [dealerId,setDealerId] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(0);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(8);
    const [projection, setProjection] = useState(6);
    const [rafterSize,setRafterSize] = useState(2);
    const [rafterAlign,setRafterAlign] = useState(false);
    const [mountMode, setMountMode] = useState(2);
    const [selectedHead, setHead] = useState(0);
    const [selectedRafterHeaders, setRafterHeader] = useState(0);
    const [selectedRafterEndCaps, setRafterEndCaps] = useState(0);
    const [postType, setPostType] = useState(0);
    const [selectedEnd, setEnd] = useState(0);
    const [materials,setMaterials] = useState({"cover":0,"rafter":0,"beam":0,"post":0,"option":0});
    const [model,setModel] = useState(null);
    const [orderId,setOrderId] = useState(null);
    const [comId,setComId] = useState(null);


    const [mixedRight,setMixedRight] = useState(1);
    const [activeModelRight,setActiveModelRight] = useState(false);
    const [isLatticeMiddle,setIsLatticeMiddle] = useState(true);
    const [activeModelLeft,setActiveModelLeft] = useState(true);
    const [activeModelMiddle,setActiveModelMiddle] = useState(false);
    

    // ----------LEFT PERGOLA PART PROPERTIES----------------


    const [lwidth, setLWidth] = useState(10);
    const [lheight, setLHeight] = useState(8);
    const [lprojection, setLProjection] = useState(6);
    const [lrafterSize,setLRafterSize] = useState(2);
    const [lrafterAlign,setLRafterAlign] = useState(false);
    const [lmountMode, setLMountMode] = useState(2);
    const [lselectedHead, setLHead] = useState(0);
    const [lselectedRafterHeaders, setLRafterHeader] = useState(0);
    const [lselectedRafterEndCaps, setLRafterEndCaps] = useState(0);
    const [lpostType, setLPostType] = useState(0);
    const [lselectedEnd, setLEnd] = useState(0);
    const [lmaterials,setLMaterials] = useState({"cover":0,"rafter":0,"beam":0,"post":0,"option":0});


    // ----------RIGHT PERGOLA PART PROPERTIES----------------


    const [rwidth, setRWidth] = useState(10);
    const [rheight, setRHeight] = useState(8);
    const [rprojection, setRProjection] = useState(6);
    const [rrafterSize,setRRafterSize] = useState(2);
    const [rrafterAlign,setRRafterAlign] = useState(false);
    const [rmountMode, setRMountMode] = useState(2);
    const [rselectedHead, setRHead] = useState(0);
    const [rselectedRafterHeaders, setRRafterHeader] = useState(0);
    const [rselectedRafterEndCaps, setRRafterEndCaps] = useState(0);
    const [rpostType, setRPostType] = useState(0);
    const [rselectedEnd, setREnd] = useState(0);
    const [rmaterials,setRMaterials] = useState({"cover":0,"rafter":0,"beam":0,"post":0,"option":0});
    
    
    // ----------MIDDLE PERGOLA PART PROPERTIES----------------


    const [mwidth, setMWidth] = useState(10);
    const [mheight, setMHeight] = useState(8);
    const [mprojection, setMProjection] = useState(6);
    const [mrafterSize,setMRafterSize] = useState(2);
    const [mrafterAlign,setMRafterAlign] = useState(false);
    const [mmountMode, setMMountMode] = useState(2);
    const [mselectedHead, setMHead] = useState(0);
    const [mselectedRafterHeaders, setMRafterHeader] = useState(0);
    const [mselectedRafterEndCaps, setMRafterEndCaps] = useState(0);
    const [mpostType, setMPostType] = useState(0);
    const [mselectedEnd, setMEnd] = useState(0);
    const [mmaterials,setMMaterials] = useState({"cover":0,"rafter":0,"beam":0,"post":0,"option":0});

    const attrs = {
        "isLatticeMiddle":isLatticeMiddle,
        "setIsLatticeMiddle":setIsLatticeMiddle,
        "activeModelRight":activeModelRight,
        "activeModelLeft":activeModelLeft,
        "activeModelMiddle":activeModelMiddle,
        "setActiveModelRight":setActiveModelRight,
        "setActiveModelLeft":setActiveModelLeft,
        "setActiveModelMiddle":setActiveModelMiddle,
        "mixedRight":mixedRight,
        "setMixedRight":setMixedRight,
        "orderId":orderId,
        "setOrderId":setOrderId,
        "comId":comId,
        "setComId":setComId,
        "model":model,
        "setModel":setModel,
        "dealerId":dealerId,
        "setDealerId":setDealerId,
        "selectedBoard":selectedBoard,
        "setSelectedBoard":setSelectedBoard,
        "width":width,
        "setWidth":setWidth, 
        "height":height, 
        "setHeight":setHeight,  
        "projection":projection, 
        "setProjection":setProjection, 
        "rafterSize":rafterSize,
        "setRafterSize":setRafterSize, 
        "rafterAlign":rafterAlign,
        "setRafterAlign":setRafterAlign, 
        "mountMode":mountMode,
        "setMountMode":setMountMode, 
        "postType":postType,
        "setPostType":setPostType, 
        "selectedEnd":selectedEnd,
        "setEnd":setEnd, 
        "selectedHead":selectedHead,
        "setHead":setHead, 
        "selectedRafterHeaders":selectedRafterHeaders,
        "setRafterHeader":setRafterHeader, 
        "selectedRafterEndCaps":selectedRafterEndCaps,
        "setRafterEndCaps":setRafterEndCaps, 
        "materials":materials,
        "setMaterials":setMaterials,
        "props":{
          "model":model,
          "width":width,
          "height":height, 
          "projection":projection, 
          "rafterSize":rafterSize,
          "rafterAlign":rafterAlign,
          "mountMode":mountMode,
          "postType":postType,
          "selectedEnd":selectedEnd,
          "selectedHead":selectedHead,
          "selectedRafterHeaders":selectedRafterHeaders,
          "selectedRafterEndCaps":selectedRafterEndCaps,
          "materials":materials,
          "dealerId":dealerId,
          "comId":comId,
        },
        "leftAttrs":{
          "width":lwidth,
          "setWidth":setLWidth, 
          "height":lheight, 
          "setHeight":setLHeight,  
          "projection":lprojection, 
          "setProjection":setLProjection, 
          "rafterSize":lrafterSize,
          "setRafterSize":setLRafterSize, 
          "rafterAlign":lrafterAlign,
          "setRafterAlign":setLRafterAlign, 
          "mountMode":lmountMode,
          "setMountMode":setLMountMode, 
          "postType":lpostType,
          "setPostType":setLPostType, 
          "selectedEnd":lselectedEnd,
          "setEnd":setLEnd, 
          "selectedHead":lselectedHead,
          "setHead":setLHead, 
          "selectedRafterHeaders":lselectedRafterHeaders,
          "setRafterHeader":setLRafterHeader, 
          "selectedRafterEndCaps":lselectedRafterEndCaps,
          "setRafterEndCaps":setLRafterEndCaps, 
          "materials":lmaterials,
          "setMaterials":setLMaterials,
        },
        "rightAttrs":{
          "width":rwidth,
          "setWidth":setRWidth, 
          "height":rheight, 
          "setHeight":setRHeight,  
          "projection":rprojection, 
          "setProjection":setRProjection, 
          "rafterSize":rrafterSize,
          "setRafterSize":setRRafterSize, 
          "rafterAlign":rrafterAlign,
          "setRafterAlign":setRRafterAlign, 
          "mountMode":rmountMode,
          "setMountMode":setRMountMode, 
          "postType":rpostType,
          "setPostType":setRPostType, 
          "selectedEnd":rselectedEnd,
          "setEnd":setREnd, 
          "selectedHead":rselectedHead,
          "setHead":setRHead, 
          "selectedRafterHeaders":rselectedRafterHeaders,
          "setRafterHeader":setRRafterHeader, 
          "selectedRafterEndCaps":rselectedRafterEndCaps,
          "setRafterEndCaps":setRRafterEndCaps, 
          "materials":rmaterials,
          "setMaterials":setRMaterials,
        },
        "middleAttrs":{
          "width":mwidth,
          "setWidth":setMWidth, 
          "height":mheight, 
          "setHeight":setMHeight,  
          "projection":mprojection, 
          "setProjection":setMProjection, 
          "rafterSize":mrafterSize,
          "setRafterSize":setMRafterSize, 
          "rafterAlign":mrafterAlign,
          "setRafterAlign":setMRafterAlign, 
          "mountMode":mmountMode,
          "setMountMode":setMMountMode, 
          "postType":mpostType,
          "setPostType":setMPostType, 
          "selectedEnd":mselectedEnd,
          "setEnd":setMEnd, 
          "selectedHead":mselectedHead,
          "setHead":setMHead, 
          "selectedRafterHeaders":mselectedRafterHeaders,
          "setRafterHeader":setMRafterHeader, 
          "selectedRafterEndCaps":mselectedRafterEndCaps,
          "setRafterEndCaps":setMRafterEndCaps, 
          "materials":mmaterials,
          "setMaterials":setMMaterials,
        }
  } 
  return (
    <ConfiguratorContext.Provider
      value={attrs}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};
export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};

