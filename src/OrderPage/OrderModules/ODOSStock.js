import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useRef, useState } from "react";
var tempValue=''

function ODOSStock(props){
    const [multi,setMulti] = useState(0);
    const [phi,setPhi] = useState("65");
    //const [lastRef,setLastRef] = React.createRef();
    
    const options = {
        SPH:props.params.find(item=>item.title==="SPH"),
        CYL:props.params.find(item=>item.title==="CYL"),
        Axis:props.params.find(item=>item.title==="Axis"),
        ADD:props.params.find(item=>item.title==="ADD"),
        count:props.params.find(item=>item.title==="count")
    }
    //console.log(options.ADD)
    const [mark, setMark]= useState({SPH:1,CYL:1})
    
    const defMainValue=props.defMainData&&props.defMainData.split(',')
    
    useEffect(() => {
        defMainValue&&props.setMainValue(defMainValue);
        const nextfield = document.querySelector(
            `#RSPH`
            );
          // If found, focus the next field
          if (nextfield !== null) {
            nextfield.focus();
          }
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
        if(index === 4) props.setODCount(newValue)
        props.setMainValue(cItems => {
            return [...cItems.slice(0, index),
            newValue,
            ...cItems.slice(index + 1)]
        })
        updateIndex(index)
        
    }
    const updateIndex=(index)=>{
        const nextfield = document.querySelector(
            index===0?`#${props.title}CYL`:
            index===1?`#${props.title}Count`:
            `#${props.title==="R"?"LSPH":"Brand"}`
          );
          // If found, focus the next field
          if (nextfield !== null) {
            nextfield.focus();
          }
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
                <Autocomplete id={`${props.title}SPH`}
                    disabled={props.showSingle&&props.showAll?true:false}
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
                <Autocomplete id={`${props.title}CYL`}
                    options={standardOption(options.CYL,mark.CYL)||[]}
                    disabled={props.showSingle&&props.showAll?true:false}
                    style={{ width: "100%"}}
                    defaultValue={"0.00"}
                    value={props.mainValue[1]?props.mainValue[1]:
                        defMainValue&&defMainValue[1]||''}
                    onChange={(e,value)=>updateValue(value,1)}
                    renderInput={(params) =>
                    <TextField {...params} label="CYL" variant="outlined"/>}
                />
            </div>
            {props.showSingle?<><div className='lenzData'>
                <Autocomplete 
                    disabled={props.showSingle&&props.showAll?true:false}
                    options={options.Axis?options.Axis.paramValue.split(','):[]} 
                    style={{ width: "100%"}}
                    value={props.mainValue[2]?props.mainValue[2]:
                        defMainValue&&defMainValue[2]||''}
                    onChange={(e,value)=>updateValue(value,2)}
                    renderInput={(params) =>
                    <TextField {...params} label="Axis" variant="outlined"/>}
                />
            </div>
            <div className='lenzData'>
                <Autocomplete
                    disabled={props.showSingle&&props.showAll?true:false}
                    options={options.ADD?options.ADD.paramValue.split(','):[]}
                    style={{ width: "100%"}}
                    value={props.mainValue[3]?props.mainValue[3]:
                        defMainValue&&defMainValue[3]||''}
                    onChange={(e,value)=>updateValue(value,3)}
                    renderInput={(params) =>
                    <TextField {...params} label="ADD" variant="outlined"/>}
                />
                    </div></>:<></>}
            {!props.showSingle?<div className='lenzData'>
                <Autocomplete id={`${props.title}Count`}
                    options={options.count?options.count.paramValue.split(','):[]}
                    style={{ width: "100%"}}
                    disabled={props.showSingle?true:false}
                    onChange={(e,value)=>{
                        props.setCount(
                            props.title ==="L"?[props.count[0],value]:[value,props.count[1]]
                        )
                        updateIndex(2)
                        }
                    }
                    defaultValue="1"
                    renderInput={(params) =>
                    <TextField {...params} label="تعداد" variant="outlined"/>}
                />
                    </div>:<></>}
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
export default ODOSStock