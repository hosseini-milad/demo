import { useEffect, useState } from "react";
import env from "../env";

function HomeCatSlider(props){
    const brandSlider = props.brandSlider;
    const [curSlider,setSlider] = useState(0);
    const [timer,setTimer] = useState(0)
    var myTimeout=''
    useEffect(()=>{
        myTimeout = setTimeout(()=>setTimer(timer+1),1000);
        if(timer >10){
            setSlider(brandSlider.length===(curSlider+1)?0:curSlider+1);
            setTimer(0);
            clearTimeout(myTimeout);
        }
    },[timer])

    return(
        <div className="catSliderHolder">
            <div className="catSliderArrow" onClick={()=>{setSlider(0);setTimer(0);clearTimeout(myTimeout)}}>
                <i className="icon-size fas fa-chevron-right"></i>
            </div>
            <div className="catSlider" style={{backgroundColor:brandSlider[curSlider].color}}>
                <div className="catSliderImg">
                    {brandSlider[curSlider].imageUrl?<img src={env.siteApiUrl+ brandSlider[curSlider].imageUrl} alt={brandSlider[curSlider].slogon} />:
                        env.loader}
                </div>
                <div className="catSliderText">
                    <img className="catTitle" src={
                        brandSlider[curSlider].brandData&&
                        brandSlider[curSlider].brandData[0]&&
                        (env.siteApiUrl+brandSlider[curSlider].brandData[0].imageUrl)} alt={brandSlider[curSlider].title} />
                    <h3>{brandSlider[curSlider].slogon}</h3>
                    <h4>{brandSlider[curSlider].description}</h4>
                </div>
            </div>
            <div className="catSliderArrow" onClick={()=>{setSlider(1);setTimer(0);clearTimeout(myTimeout)}}>
                <i className="icon-size fas fa-chevron-left"></i>
            </div>
        </div>
    )
}
export default HomeCatSlider