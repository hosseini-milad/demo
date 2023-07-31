import { useEffect, useState } from "react";
import env from "../../env";
function OptionHolder(){
    const [sliders,setSliders]= useState();
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/slider",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setSliders(result)
                
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
            {sliders&&sliders.data.map((slider,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+slider._id+"?type=slider"}>
                <div className="imagePanel">
                    <img src={slider.imageUrl&&env.siteApiUrl+slider.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{slider.title}</strong>
                    <small>{slider.description}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=slider"}>
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
export default OptionHolder