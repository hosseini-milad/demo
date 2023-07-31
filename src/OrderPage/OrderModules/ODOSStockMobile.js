import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
import AutoComplete from '../../Components/AutoComplete';
var tempValue=''

function ODOSStockMobile(props){
    const [multi,setMulti] = useState(0);
    const [phi,setPhi] = useState("65");
    const options = {
        SPH:props.params.find(item=>item.title==="SPH"),
        CYL:props.params.find(item=>item.title==="CYL"),
        Axis:props.params.find(item=>item.title==="Axis"),
        ADD:props.params.find(item=>item.title==="ADD")
    }
    //console.log(options.ADD)
    const [mark, setMark]= useState({SPH:1,CYL:1})
    
    const defMainValue=props.defMainData&&props.defMainData.split(',')
    
    useEffect(() => {
        defMainValue&&props.setMainValue(defMainValue);
        
    },[])
    useEffect(() => {
        setPhi("65")
        //console.log(props.mainValue[1])
        if(props.mainValue[0]&&props.mainValue[0].includes('-')&&
            props.mainValue[1]&&props.mainValue[1].includes('-')) setPhi("70")
        if(props.mainValue[0]&&props.mainValue[0].includes('-')&&
            props.mainValue[1]&&props.mainValue[1].includes('0.00')) setPhi("70")
        if(props.mainValue[0]&&props.mainValue[0].includes('-')&&
            !props.mainValue[1]) setPhi("70")
        
            if(props.mainValue[0]&&props.mainValue[0].includes('0.00')&&
            props.mainValue[1]&&props.mainValue[1].includes('-')) setPhi("70")
        if(!props.mainValue[0]&&
            props.mainValue[1]&&props.mainValue[1].includes('-')) setPhi("70")
        
    },[props.mainValue])
    const updateValue=(newValue,index)=>{
        //console.log(newValue)
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
                <AutoComplete
                    options={standardOption(options.SPH,mark.SPH)||[]}
                    value={props.mainValue[0]?props.mainValue[0]:
                        defMainValue&&defMainValue[0]||''}
                    style={{ width: "100%"}}
                    onValueChange={(value)=>updateValue(value,0)}
                    label="SPH" 
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
                <AutoComplete
                    options={standardOption(options.CYL,mark.CYL)||[]}
                    style={{ width: "100%"}}
                    value={props.mainValue[1]?props.mainValue[1]:
                        defMainValue&&defMainValue[1]||''}
                    onValueChange={(value)=>updateValue(value,1)}
                    label="CYL"
                />
            </div>
            {/*<div className='lenzData'>
                <AutoComplete disabled={true}
                    options={["65","70","75"]}
                    style={{ width: "100%"}}
                    value={phi||''}
                    onValueChange={(value)=>updateValue(value,2)}
                    label="DIA" 
                />
            </div>
            <div className='lenzData'>
                <AutoComplete
                    options={options.ADD?options.ADD.paramValue.split(','):[]}
                    style={{ width: "100%"}}
                    value={props.mainValue[3]?props.mainValue[3]:
                        defMainValue&&defMainValue[3]||''}
                    onValueChange={(value)=>updateValue(value,3)}
                    label="ADD" 
                />
                    </div>*/}
            <div className='lenzData'>
                <AutoComplete
                    options={["1","2","3","4","5","6","7","8","9","10"]}
                    style={{ width: "100%"}}
                    value={props.count[props.title ==="L"?1:0]||''}
                    onValueChange={(value)=>props.setCount(
                        props.title ==="L"?[props.count[0],value]:[value,props.count[1]]
                        )}
                    label="تعداد"
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
export default ODOSStockMobile