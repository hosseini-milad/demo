import { useState,useEffect } from "react";
import env, { discountPriceCount } from "../../../env";

function CalcOff(props){
    //const [offerData,setOfferData] = useState();
    const [price,setPrice] = useState('')
    useEffect(() => {
        const postSimple={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({userId:props.user,
            brandName:props.brand,
            material:props.material?props.material:''})
        }
        fetch(env.siteApi+"/product/list/offersstock",postSimple)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.offers){
            var newPrice = 0;
                //console.log(result,props.material)
                //const brandIndex = ''
                setPrice({price:newPrice=
                    discountPriceCount(props.price,result.offers[0]?
                    result.offers[0].discountPercent:0
                    ,props.count),percent:result.offers[0]?result.offers[0].discountPercent:"0"})
                props.setTotPrice(pItems => {return [
                    ...pItems.slice(0, props.index),
                    newPrice,
                    ...pItems.slice(props.index + 1),
                  ]})
                }
          },
          (error) => {
            console.log({error:error});
          }
        ) 
    },[])
    return(<>
        <td>{price.percent}</td>
        <td>{price.price}</td>
    </>)
}
export default CalcOff