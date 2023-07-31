import { useEffect, useState } from "react"
import env from "../../../env"

function ColorSelect(props){
    const def = props.defData;
    const colorList = props.colorList
    const [selected,setSelected] = useState(-1)
    useEffect(() => {
        for(var i=0;i<colorList.length;i++)
            if(def === colorList[i].colorCode){
                setSelected(i)
                break;
            }
    },[])
    return(
        <div className="colorSelect">
            {colorList.map((color,i)=>(
                <div className={selected===i?"colorItem colorSelected":"colorItem"} key={i}
                onClick={()=>{props.type==="color"?props.setExtraData(previousState => {
                        return { ...previousState, colorCode: color.colorCode ,
                                                   colorPrice: color.colorPrice}
                      }
                        ):props.setExtraData(previousState => {
                            return { ...previousState, mirrorCode: color.colorCode ,
                                                       mirrorPrice: color.colorPrice}
                        }
                    );setSelected(i)}}>
                    <div className="colorShow">
                        <img src={env.siteApiUrl+color.imageUrl} alt={color.title}/>
                    </div>
                    <div className="colorCode">
                        {color.colorCode}
                    </div>
                </div>
            ))}
            
        </div>
    )
}
export default ColorSelect