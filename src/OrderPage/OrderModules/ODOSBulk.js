import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
var tempValue=''

function ODOSBulk(props){
    const [multi,setMulti] = useState(0);
    const options = {
        SPH:props.params.find(item=>item.title==="SPH"),
        CYL:props.params.find(item=>item.title==="CYL")
    }
    const [mark, setMark]= useState({SPH:1,CYL:1})
    
    const defMainValue=props.defMainData&&props.defMainData.split(',')
    
    useEffect(() => {
        defMainValue&&props.setMainValue(defMainValue);
        props.setCount("2")
    },[])
    const updateValue=(newValue,index)=>{
        console.log(newValue)
        props.setMainValue(cItems => {
            return [...cItems.slice(0, index),
            newValue,
            ...cItems.slice(index + 1)]
        })
    }
    const switchValue=(newValue,index)=>{
        console.log(newValue)
        props.setMainValue(cItems => {
            return [...cItems.slice(0, index),
            " ",
            ...cItems.slice(index + 1)]
        })
    }
    
    const standardOption=(filter,mark)=>{
        if(mark)return(filter?filter.paramValue.split(','):[])
        else return(filter?filter.paramNegative.split(','):[])
    }
//console.log(props.mainValue)
    return(
        <div className='orderLenzData inRow'>
            <h2>{props.title}</h2>
            <div className='lenzData'>
                <div className='positiveBtn' onClick={(e)=>{setMark(
                    pState => { 
                        return { ...pState, SPH:mark.SPH?0:1 }
                        });switchValue(props.mainValue&&props.mainValue[0],0)}}>
                    <span className={mark.SPH?"pBtn":"dBtn"}>+</span>
                    <span className={!mark.SPH?"nBtn":"dBtn"}>-</span>
                </div>
                <Autocomplete disableClearable 
                    options={standardOption(options.SPH,mark.SPH)||[]}
                    value={props.mainValue[0]?props.mainValue[0]:
                        defMainValue&&defMainValue[0]||''}
                    style={{ width: "100%"}}
                    onChange={(e,value)=>updateValue(value,0)}
                    renderInput={(params) =>
                    <TextField {...params} label="SPH" variant="outlined"/>}
                />
            </div>
            <div className='lenzData'>
                <div className='positiveBtn' onClick={(e)=>{setMark(
                    pState => { 
                        return { ...pState, CYL:mark.CYL?0:1 }
                        });switchValue(props.mainValue[1],1)}}>
                    <span className={mark.CYL?"pBtn":"dBtn"}>+</span>
                    <span className={!mark.CYL?"nBtn":"dBtn"}>-</span>
                </div>
                <Autocomplete disableClearable 
                    options={standardOption(options.CYL,mark.CYL)||[]}
                    style={{ width: "100%"}}
                    value={props.mainValue[1]?props.mainValue[1]:
                        defMainValue&&defMainValue[1]||''}
                    onChange={(e,value)=>updateValue(value,1)}
                    renderInput={(params) =>
                    <TextField {...params} label="CYL" variant="outlined"/>}
                />
            </div>
            <div className='lenzData' >
                <Autocomplete disableClearable
                    options={["2","3","4","5","6","7","8","9","10"]}
                    defaultValue={"2"}
                    onChange={(e,value)=>props.setCount(value)}
                    style={{ width: "100%"}}
                    renderInput={(params) =>
                    <TextField {...params} label="تعداد" variant="outlined"/>}
                />
            </div>
            <div className="popHolder" style={{visibility:multi?"visible":"hidden"}}>
                <div className="popText" style={{height:"200px"}}>
                    <div className="popClose" onClick={()=>setMulti(0)}>×</div>
                
                    <p>برای سفارش عدسی بصورت انبوه(بیش از 1 عدد)
                        روی لینک زیر کلیک کنید
                    </p>
                    <a onClick={()=>{window.location.href="/order/stock#bulk";setMulti(0);props.setTabIndex(2)}} 
                        className="popBtn stockPop">سفارش انبوه</a>
                </div>
            </div>
        </div>
    )
}
export default ODOSBulk