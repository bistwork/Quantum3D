export const generateShareableLink=(attrs,comId,orderId)=>{
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