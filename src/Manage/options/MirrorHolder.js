import { useEffect, useState } from "react";
import env from "../../env";
function MirrorHolder(){
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
        fetch(env.siteApi+"/setting/mirror",postOptions)
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
                onClick={()=>window.location.href="/setting/"+color._id+"?type=mirror"}>
                <div className="imagePanel thumbPanel">
                    <img src={color.imageUrl&&env.siteApiUrl+color.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{color.colorCode}</strong>
                    <small>{color.colorPrice?JSON.parse(color.colorPrice).essence:''}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=mirror"}>
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
export default MirrorHolder