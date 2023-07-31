import { useEffect, useState } from "react";
import env from "../../env";
function CoverHolder(){
    const [color,setColor]= useState();
    console.log(color)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/cover",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setColor(result)
                
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
            {color&&color.data.map((color,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+color._id+"?type=cover"}>
                <div className="imagePanel thumbPanel">
                    <img src={color.imageUrl&&env.siteApiUrl+color.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{color.option}</strong>
                    <small>{color.brand}</small>
                    <small>{color.price?JSON.parse(color.price):''}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=cover"}>
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
export default CoverHolder