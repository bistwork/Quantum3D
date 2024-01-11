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

  
    const attrs = {
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

