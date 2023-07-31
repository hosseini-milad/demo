import { useEffect } from "react";
import env from "../../env";
import { useState } from "react";

function SkuToDetail(props){
    const [skuDetail,setSkuDetail] = useState('')
    useEffect(()=>{
          const postOptions={
              method:'post',
              headers: { 
                'Content-Type': 'application/json'},
            body:JSON.stringify({sku:props.sku})
            }
            fetch(env.siteApi+"/order/stock/sku",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result);
                setSkuDetail(result);
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
      },[])
      return(<>
        {skuDetail?<span>{skuDetail.title}</span>:<></>}
        </>
      )
    
}
export default SkuToDetail