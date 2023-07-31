import { useEffect, useState } from "react";
import env from "../../env";
function StockServiceHolder(){
    const [sService,setSService]= useState();
    //console.log(sService)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/stockservices",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setSService(result)
                
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[])
    return(
        <div className="reyhamPanel">
            {sService&&sService.data.map((service,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+service._id+"?type=stockservices"}>
                <div className="imagePanel thumbPanel">
                    <img src={service.imageUrl&&env.siteApiUrl+service.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{service.title}</strong>
                    <small>{service.colorPrice?JSON.parse(service.colorPrice):''}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=stockservices"}>
                <div className="imagePanel">
                    <h2>+</h2>
                </div>
                <div className="textPanel">
                    <strong>افزودن جدید</strong>
                    
                </div>
            </div>
        </div>
    )
}
export default StockServiceHolder