import { useEffect, useState } from "react";
import env from "../env";

function Slider(props){
    const [sliderIndex,setSliderIndex] = useState(0);
    const [timer,setTimer] = useState(0)
    const slider=props.mainSlider;
    var myTimeout=''
    useEffect(()=>{
        try{myTimeout = setTimeout(()=>setTimer(timer+1),1000);
        if(timer >10){
            setSliderIndex(slider.length===(sliderIndex+1)?0:sliderIndex+1);
            setTimer(0);
            clearTimeout(myTimeout);
        }}
        catch{setTimer(0);
            clearTimeout(myTimeout);}
    },[timer])
    
    return(
        <div className="slidersList">
            <div className="slider">
                {(slider&&slider[sliderIndex].imageUrl)?
                    <img className="sliderImg" src={env.siteApiUrl+slider[sliderIndex].imageUrl} alt={slider[sliderIndex].title} />:
                env.loader}
                <div className="sliderTextHolder">
                    <img src="/logo.png" alt = "logo" />
                    <div className="sliderText">
                        {slider?<span>{slider[sliderIndex].description}</span>:''}
                        {slider?<h2>{slider[sliderIndex].title}</h2>:''}
                    </div>
                    <div className="sliderBullet">
                        {slider&&slider.map((slider,i)=>(
                            <div key={i} className={sliderIndex===i?"bullet activeBullet":"bullet"} 
                             onClick={()=>{setSliderIndex(i);setTimer(0);clearTimeout(myTimeout);}}>

                        </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Slider