import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
import AutoComplete from "../../Components/AutoComplete";
var tempValue=''

function ODOSinfoMobile(props){
    const ADDShow=props.defADD;
    const[AxisShow,setAxisShow] = useState(0)
    const [showDEC,setShowDEC] = useState(0)
    const options = {
        SPH:props.params.find(item=>item.title==="SPH"),
        CYL:props.params.find(item=>item.title==="CYL"),
        Axis:props.params.find(item=>item.title==="Axis"),
        ADD:props.params.find(item=>item.title==="ADD"),
        SIZE:props.params.find(item=>item.title==="SIZE")
    }
    const moreOptions = {
        Prism:props.params.find(item=>item.title==="Prism"),
        PrismBase:props.params.find(item=>item.title==="PrismBase"),
        DEC:props.params.find(item=>item.title==="DEC"),
        Position:props.params.find(item=>item.title==="Position")
    }
    const [mark, setMark]= useState({SPH:1,CYL:1,Axis:1,ADD:1,SIZE:1})
    
    const [moreOD, setMoreOD] = useState(0)
    //console.log(props)
    const defMainValue=props.defMainData&&props.defMainData.split(',')
    const defMoreValue=props.defMoreData&&props.defMoreData.split(',')

    useEffect(() => {
        defMainValue&&props.setMainValue(defMainValue);
        defMoreValue&&props.setMoreValue(defMoreValue);
        (!defMainValue||!defMainValue[1]||defMainValue[1]==="0.00")?
            setAxisShow(0):setAxisShow(1)
        
    },[])
    useEffect(() => {
        console.log(props.moreValue)
        if(!props.moreValue){setShowDEC(0);return}
        if(props.moreValue[0]&&props.moreValue[1])setShowDEC(2)
        if(!props.moreValue[0]||!props.moreValue[1])setShowDEC(0)
        if(props.moreValue[2])setShowDEC(1)
    },[props.moreValue])
    const updateValue=(newValue,index)=>{
        console.log(newValue,index)
        if(index===1&&newValue)setAxisShow(1)
        if(index===1&&(newValue==="0.00"||!newValue))setAxisShow(0);
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
    const updateMore=(newValue,index)=>{
        props.setMoreValue(cItems => {
            return [...cItems.slice(0, index),
            newValue,
            ...cItems.slice(index + 1)]
        })
        if(index===0&&newValue)
            props.setErrorField(props.RL==="R"?["Base",""]:["","Base"])
        if(index===0&&!newValue) props.setErrorField(["",""])
        if(index===1&&newValue) props.setErrorField(["",""])
        if(index===1&&!newValue&&props.moreValue[0])
            props.setErrorField(props.RL==="R"?["Base",""]:["","Base"])
    }
    const standardOption=(filter,mark)=>{
        if(mark)return(filter?filter.paramValue.split(','):[])
        else return(filter?filter.paramNegative.split(','):[])
    }
//console.log(props.mainValue)
    return(
        <div className='innerSeprator'>
            <div className='innerHeader' dangerouslySetInnerHTML={{__html:props.title}}></div>
            <div className='orderLenzData inRow'>
                <div className='lenzData'>
                    <div className='positiveBtn' onClick={(e)=>{setMark(
                        pState => { 
                            return { ...pState, SPH:mark.SPH?0:1 }
                          });switchValue(props.mainValue&&props.mainValue[0],0)}}>
                        <span className={mark.SPH?"pBtn":"dBtn"}>+</span>
                        <span className={!mark.SPH?"nBtn":"dBtn"}>-</span>
                    </div>
                    <AutoComplete disabled={props.disabled?true:false}
                        options={standardOption(options.SPH,mark.SPH)||[]}
                        value={props.mainValue[0]!==''?props.mainValue[0]:''}
                        //defaultValue={defMainValue&&defMainValue[0]||''}
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
                    <AutoComplete disabled={props.disabled?true:false}
                        options={standardOption(options.CYL,mark.CYL)||[]}
                        style={{ width: "100%"}}
                        value={props.mainValue[1]?props.mainValue[1]:''}
                            onValueChange={(value)=>updateValue(value,1)}
                        label="CYL"
                    />
                </div>
                <div className='lenzData'>
                    <AutoComplete 
                     disabled={(!props.disabled&&AxisShow)?false:true}
                        options={standardOption(options.Axis,mark.Axis)||[]}
                        value={props.mainValue[2]?props.mainValue[2]:''}
                        onValueChange={(value)=>updateValue(value,2)}
                        label="Axis"
                    />
                </div>
                <div className='lenzData'>
                    <AutoComplete 
                        options={standardOption(options.ADD,mark.ADD)||[]}
                        disabled={!props.disabled&&ADDShow&&
                            (ADDShow.split(',')[4]||ADDShow.split(',')[3])?false:true}
                        value={props.mainValue[3]?props.mainValue[3]:''}
                        onValueChange={(value)=>updateValue(value,3)}
                        label="ADD"
                    />
                </div>
                <div className='lenzData'>
                    <AutoComplete 
                        disabled={props.disabled?true:false}
                        options={standardOption(options.SIZE,mark.SIZE)||[]}
                        style={{ width: "100%"}}
                        value={props.mainValue[4]?props.mainValue[4]:''}
                        onValueChange={(value)=>updateValue(value,4)}
                        label="SIZE"
                    />
                </div>
                
            </div>
            
            <div className='innerSeprator'>
                <div className='innerHeader' onClick={()=>setMoreOD((parseInt(moreOD)+1)%2)}>خدمات بیشتر 
                <i className={moreOD?"fa fa-chevron-up mini-size":"fa fa-chevron-down mini-size"}></i></div>
                <div style={{display:moreOD===1?"flex":"none"}} className='orderLenzData inRow'>
                    <div className='lenzData'>
                        <AutoComplete  disabled={props.disabled||showDEC===1?true:false}
                            options={standardOption(moreOptions.Prism,1)||[]}
                            onValueChange={(value)=>updateMore(value,0)}
                            value={props.moreValue[0]?props.moreValue[0]:
                                defMoreValue&&defMoreValue[0]||''}
                            label="Prism"
                        />
                    </div>
                    <div className='lenzData'>
                        <AutoComplete disabled={props.disabled||showDEC===1?true:false}
                            options={standardOption(moreOptions.PrismBase,1)||[]}
                            onValueChange={(value)=>updateMore(value,1)}
                            style={{ width: "100%"}}
                            value={props.moreValue[1]?props.moreValue[1]:
                                defMoreValue&&defMoreValue[1]||''}
                            label="PrismBase"
                        />
                    </div>
                    <div className='lenzData'>
                        <AutoComplete disabled={props.disabled||showDEC===2?true:false}
                            options={standardOption(moreOptions.DEC,1)||[]}
                            onValueChange={(value)=>updateMore(value,2)}
                            value={props.moreValue[2]?props.moreValue[2]:
                                defMoreValue&&defMoreValue[2]||''}
                            label="DEC"
                        />
                    </div>
                    <div className='lenzData'>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ODOSinfoMobile