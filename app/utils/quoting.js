import {useEffect, useMemo} from 'react';
import axios from 'axios';

export const calculateLatticeQuote = (attrs,dealerDiscount)=>{
          
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
        numberOfColumns = Math.floor(0.0883*attrs.width + 0.0291);
    }

    let latticePrice = 0;
    let columnPrice = 0;
    let raftersPrice = 0;
    let beamsPrice = 0;
    let beamAndRafterEnds = 0;
    let rectBeamsPrice = 0;
    let postPrice = 0;
    let optionalPostCorePrice = 0;
    

    if(attrs.mountMode!=3){

        latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
        columnPrice = attrs.postType == 0? post3x3Price*attrs.height*numberOfColumns:post4x4Price*attrs.height*numberOfColumns;
        raftersPrice = attrs.projection * rafterPrice * (Math.floor(attrs.width/2.5)+1);
        beamsPrice = attrs.selectedHead == 0? attrs.width*beamPrice: 2*attrs.width*beamPrice;
        beamAndRafterEnds =  attrs.selectedHead == 0? 2*tailKitsPrice* (Math.floor(attrs.width/2.5)+1): 4*tailKitsPrice* (Math.floor(attrs.width/2.5)+1);
        rectBeamsPrice = attrs.selectedHead == 0? attrs.width*rectBeamPrice: 2*attrs.width*rectBeamPrice;
        postPrice = squareTubePrice*attrs.height*numberOfColumns;
        optionalPostCorePrice = attrs.optionalPostCore==0?0:attrs.optionalPostCore==1?5.20*numberOfColumns:15.33*numberOfColumns;

    }
    else{
        latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
        columnPrice = attrs.postType == 0? 2*post3x3Price*attrs.height*numberOfColumns:2*post4x4Price*attrs.height*numberOfColumns;
        raftersPrice = attrs.projection * rafterPrice * Math.floor(attrs.width/2.5);
        beamsPrice = attrs.selectedHead == 0? 2*attrs.width*beamPrice: 4*attrs.width*beamPrice;
        beamAndRafterEnds =  attrs.selectedHead == 0? 4*tailKitsPrice* (Math.floor(attrs.width/2.5)+1): 8*tailKitsPrice* (Math.floor(attrs.width/2.5)+1);
        rectBeamsPrice = attrs.selectedHead == 0? 2*attrs.width*rectBeamPrice: 4*attrs.width*rectBeamPrice;
        postPrice = 2*squareTubePrice*attrs.height*numberOfColumns;
        optionalPostCorePrice = attrs.optionalPostCore==0?0:attrs.optionalPostCore==1?5.20*numberOfColumns*2:15.33*numberOfColumns*2;
    }


    totalPrice+= latticePrice+columnPrice+raftersPrice+beamsPrice+beamAndRafterEnds+rectBeamsPrice+postPrice+optionalPostCorePrice;
    totalPrice *= 1.07
    return dealerDiscount?totalPrice*(1-dealerDiscount):totalPrice;
    

}

export const calculateInsulatedQuote = (attrs,dealerDiscount)=>{
          
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
        numberOfColumns = Math.floor(0.0883*attrs.width + 0.0291);
    }

    let latticePrice = 0;
    let columnPrice = 0;
    let raftersPrice = 0;
    let beamsPrice = 0;
    let beamAndRafterEnds = 0;
    let rectBeamsPrice = 0;
    let postPrice = 0;
    let optionalPostCorePrice = 0;
    let vPrice = 0;
    let gutterPrice = 0;
    let platePrice = 0;

    if(attrs.mountMode!=3){

        latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
        columnPrice = attrs.postType == 0? post3x3Price*attrs.height*numberOfColumns:post4x4Price*attrs.height*numberOfColumns;
        raftersPrice = attrs.projection * rafterPrice * Math.floor((attrs.width/4)+1);
        beamsPrice = attrs.selectedHead == 0? attrs.width*beamPrice: 2*attrs.width*beamPrice;
        beamAndRafterEnds =  attrs.selectedHead == 0? 2*tailKitsPrice* (Math.floor(attrs.width/4)+1): 4*tailKitsPrice* (Math.floor(attrs.width/4)+1);
        rectBeamsPrice = attrs.selectedHead == 0? attrs.width*rectBeamPrice: 2*attrs.width*rectBeamPrice;
        postPrice = squareTubePrice*attrs.height*numberOfColumns;
        optionalPostCorePrice = attrs.optionalPostCore==0?0:attrs.optionalPostCore==1?5.20*numberOfColumns:15.33*numberOfColumns;
        vPrice = attrs.width * 4.448;
        gutterPrice = attrs.width * 8.9;
        platePrice = attrs.width * (attrs.projection+1) * 6.5;
        
    }
    else{
        latticePrice = attrs.rafterSize == 2? lattice2x2Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize)): lattice3x3Price*attrs.width*Math.floor(attrs.projection/(0.3+attrs.rafterSize));
        columnPrice = attrs.postType == 0? 2*post3x3Price*attrs.height*numberOfColumns:2*post4x4Price*attrs.height*numberOfColumns;
        raftersPrice = attrs.projection * rafterPrice * (Math.floor(attrs.width/2.5)+1);
        beamsPrice = attrs.selectedHead == 0? 2*attrs.width*beamPrice: 4*attrs.width*beamPrice;
        beamAndRafterEnds =  attrs.selectedHead == 0? 4*tailKitsPrice* (Math.floor(attrs.width/2.5)+1): 8*tailKitsPrice* (Math.floor(attrs.width/2.5)+1);
        rectBeamsPrice = attrs.selectedHead == 0? 2*attrs.width*rectBeamPrice: 4*attrs.width*rectBeamPrice;
        postPrice = 2*squareTubePrice*attrs.height*numberOfColumns;
        optionalPostCorePrice = attrs.optionalPostCore==0?0:attrs.optionalPostCore==1?5.20*numberOfColumns*2:15.33*numberOfColumns*2;
        gutterPrice = attrs.width * 8.9;
        platePrice = attrs.width * (attrs.projection+1) * 6.5;
    }


    totalPrice+= latticePrice+columnPrice+raftersPrice+beamsPrice+beamAndRafterEnds+rectBeamsPrice+postPrice+optionalPostCorePrice+vPrice+gutterPrice+platePrice;
    totalPrice *= 1.07
    return dealerDiscount?totalPrice*(1-dealerDiscount):totalPrice;


}

export const calculateDiscount = (attrs,handleDiscountChange) =>{
    
    useMemo(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'da2-dz4zldsidrdexe5wx2bfz4dhpm';
                const apiUrl = 'https://lzm2bp7eunag3la2hfq6oyyyq4.appsync-api.us-west-2.amazonaws.com/graphql';
                const query = `
                query ListCustomersByUser {
                    getUser(id:"${attrs.dealerId}"){
                        tierId
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
        
        const fetchedDiscount = response.data.data.getUser.tierId;
        switch(fetchedDiscount){
              case "Tier0":
                  handleDiscountChange(0)
                  break;
              case "Tier1":
                  handleDiscountChange(0.05)
                  break;
              case "Tier2":
                  handleDiscountChange(0.1)
                  break;
              case "Tier3":
                  handleDiscountChange(0.25);
                break;
              default:
                  handleDiscountChange(0)
                  break;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };
    fetchData()
    }, []);
};  



export const getQuote = (attrs,dealerDiscount) => {    
    let price = 0;
    switch(attrs.model){
        case "lattice":
            price = calculateLatticeQuote(attrs,dealerDiscount);
            break
        case "insulated":
            price = calculateInsulatedQuote(attrs,dealerDiscount);
            break
        case "mixed":
            if(attrs.isLatticeMiddle){
                price = calculateLatticeQuote(attrs.middleAttrs,dealerDiscount)+ calculateInsulatedQuote(attrs.leftAttrs,dealerDiscount) + calculateInsulatedQuote(attrs.rightAttrs,dealerDiscount);
            }
            else{
                price = calculateLatticeQuote(attrs.leftAttrs,dealerDiscount)+ calculateInsulatedQuote(attrs.middleAttrs,dealerDiscount) + calculateLatticeQuote(attrs.rightAttrs,dealerDiscount);
            }
            break
        case "lattice-insulated":
            price = calculateLatticeQuote(attrs.rightAttrs,dealerDiscount) + calculateInsulatedQuote(attrs.leftAttrs,dealerDiscount);
            break

    }
    let prices = {
        "TotalPrice": Math.round(price)
    }
    return prices;
}