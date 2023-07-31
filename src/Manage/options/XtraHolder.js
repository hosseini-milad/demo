import { useEffect, useState } from "react";
import env from "../../env";
function XtraHolder(){
    const [xtra,setXtra]= useState();
    console.log(xtra)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/xtra",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setXtra(result)
                
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
            {xtra&&xtra.data.map((xtra,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+xtra._id+"?type=xtra"}>
                <div className="imagePanel thumbPanel">
                    <img src={xtra.imageUrl&&env.siteApiUrl+xtra.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{xtra.title}</strong>
                    <small>{xtra.colorPrice}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=xtra"}>
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
export default XtraHolder