import { useEffect } from "react";
import { useState } from "react";
import env from "../../env";
import ProfileStockItem from "../../ProfilePage/ProfileStockItem";

function GuranteeStock(props){
    const status = props.status;
    console.log(status)
    const [gurantee,setGurantee] = useState()
    useEffect(() => {
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({search:status})
          }
          fetch(env.siteApi+"/order/stockGurantee/search",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setGurantee()
                console.log(result)
                setTimeout(()=>setGurantee(result),200)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    },[status])
    
    return(
        <>
        {gurantee&&
        gurantee.map((stock,i)=>(
           <ProfileStockItem open={!i} key={stock._id} 
           orderData={stock} manager={"manager"} setRefreshRate={1}/>
            
        ))}
        </>
    )
}
export default GuranteeStock