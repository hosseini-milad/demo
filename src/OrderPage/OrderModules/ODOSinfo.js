import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
var tempValue=''

function ODOSinfo(props){
    const ADDShow=props.defADD;
    const[AxisShow,setAxisShow] = useState(0)
    const [showDEC,setShowDEC] = useState(0)
    const addDodid=["50","55","60","65","70"]
    //const errorField = props.errorField;
    
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
        //console.log(props.moreValue)
        if(!props.moreValue){setShowDEC(0);return}
        if(props.moreValue[0]&&props.moreValue[1])setShowDEC(2)
        if(!props.moreValue[0]||!props.moreValue[1])setShowDEC(0)
        if(props.moreValue[2])setShowDEC(1)
    },[props.moreValue])
    const updateValue=(newValue,index)=>{
        if(index===1&&newValue)setAxisShow(1)
        if(index===1&&(newValue==="0.00"||!newValue))setAxisShow(0);
        props.setMainValue(cItems => {
            return [...cItems.slice(0, index),
            newValue,
            ...cItems.slice(index + 1)]
        })
        props.setError('')
        if(index===3&&newValue)props.setErrorField("","")
        if(index===4&&newValue)props.setErrorField("","")
    }
    const switchValue=(newValue,index)=>{
        //console.log(newValue)
        props.setMainValue(cItems => {
            return [...cItems.slice(0, index),
            " ",
            ...cItems.slice(index + 1)]
        })
    }
    const updateMore=(newValue,index)=>{
        //console.log(newValue,index)
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
            <div className='orderLenzData'>
                <div className='lenzData'>
                    <div className='positiveBtn' onClick={(e)=>{setMark(
                        pState => { 
                            return { ...pState, SPH:mark.SPH?0:1 }
                          });switchValue(props.mainValue&&props.mainValue[0],0)}}>
                        <span className={mark.SPH?"pBtn":"dBtn"}>+</span>
                        <span className={!mark.SPH?"nBtn":"dBtn"}>-</span>
                    </div>
                    <Autocomplete disabled={props.disabled?true:false}
                        options={standardOption(options.SPH,mark.SPH)||[]}
                        value={props.mainValue[0]?props.mainValue[0]:''}
                        defaultValue={defMainValue&&defMainValue[0]||''}
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
                    <Autocomplete disabled={props.disabled?true:false}
                        options={standardOption(options.CYL,mark.CYL)||[]}
                        style={{ width: "100%"}}
                        value={props.mainValue[1]?props.mainValue[1]:''}
                        defaultValue={defMainValue&&defMainValue[1]||''}
                        onChange={(e,value)=>updateValue(value,1)}
                        renderInput={(params) =>
                        <TextField {...params} label="CYL" variant="outlined"/>}
                    />
                </div>
                <div className='lenzData'>
                    <Autocomplete 
                     disabled={(!props.disabled&&AxisShow)?false:true}
                        options={standardOption(options.Axis,mark.Axis)||[]}
                        style={{ width: "100%"}}
                        value={props.mainValue[2]?props.mainValue[2]:''}
                        defaultValue={defMainValue&&defMainValue[2]||''}
                        onChange={(e,value)=>updateValue(value,2)}
                        className={props.errorField==="Axis"?"errorClass":""}
                        renderInput={(params) =>
                        <TextField {...params} label="Axis" variant="outlined"/>}
                    />
                </div>
                <div className='lenzData'>
                    <Autocomplete 
                        options={standardOption(options.ADD,mark.ADD)||[]}
                        //value={tempValue?tempValue:odList[i]?odList[i]:''}
                        disabled={!props.disabled&&ADDShow&&
                            (ADDShow.split(',')[4]||ADDShow.split(',')[3])?false:true}
                        style={{ width: "100%"}}
                        value={props.mainValue[3]?props.mainValue[3]:''}
                        defaultValue={defMainValue&&defMainValue[3]||''}
                        onChange={(e,value)=>updateValue(value,3)}
                        className={props.errorField==="ADD"?"errorClass":""}
                        renderInput={(params) =>
                        <TextField {...params} label="ADD" variant="outlined"/>}
                    />
                </div>
                <div className='lenzData'>
                    <Autocomplete 
                        disabled={props.disabled?true:false}
                        options={(ADDShow&&ADDShow.split(',')[4])?addDodid:
                            standardOption(options.SIZE,mark.SIZE)||[]}
                        //value={tempValue?tempValue:odList[i]?odList[i]:''}
                        style={{ width: "100%"}}
                        value={props.mainValue[4]?props.mainValue[4]:''}
                        defaultValue={defMainValue&&defMainValue[4]||''}
                        onChange={(e,value)=>updateValue(value,4)}
                        className={props.errorField==="Size"?"errorClass":""}
                        renderInput={(params) =>
                        <TextField {...params} label="SIZE" variant="outlined"/>}
                    />
                </div>
                
            </div>
            
            <div className='innerSeprator'>
                <div className='innerHeader' onClick={()=>setMoreOD((parseInt(moreOD)+1)%2)}>خدمات بیشتر 
                <i className={moreOD?"fa fa-chevron-up mini-size":"fa fa-chevron-down mini-size"}></i></div>
                <div style={{display:moreOD===1?"flex":"none"}} className='orderLenzData inRow'>
                    <div className='lenzData'>
                        <Autocomplete  disabled={props.disabled||showDEC===1?true:false}
                            options={standardOption(moreOptions.Prism,1)||[]}
                            onChange={(e,value)=>updateMore(value,0)}
                            style={{ width: "100%"}}
                            value={props.moreValue[0]?props.moreValue[0]:''}
                            defaultValue={defMoreValue&&defMoreValue[0]||''}
                            renderInput={(params) =>
                            <TextField {...params} label="Prism" variant="outlined"/>}
                        />
                    </div>
                    <div className='lenzData'>
                        <Autocomplete disabled={props.disabled||showDEC===1?true:false}
                            options={standardOption(moreOptions.PrismBase,1)||[]}
                            onChange={(e,value)=>updateMore(value,1)}
                            style={{ width: "100%"}}
                            className={props.errorField==="Base"?"errorClass":""}
                            value={props.moreValue[1]?props.moreValue[1]:''}
                                defaultValue={defMoreValue&&defMoreValue[1]||''}
                            renderInput={(params) =>
                            <TextField {...params} label="PrismBase" variant="outlined"/>}
                        />
                    </div>
                    <div className='lenzData'>
                        <Autocomplete disabled={props.disabled||showDEC===2?true:false}
                            options={standardOption(moreOptions.DEC,1)||[]}
                            onChange={(e,value)=>updateMore(value,2)}
                            style={{ width: "100%"}}
                            value={props.moreValue[2]?props.moreValue[2]:''}
                            defaultValue={defMoreValue&&defMoreValue[2]||''}
                            renderInput={(params) =>
                            <TextField {...params} label="DEC" variant="outlined"/>}
                        />
                    </div>
                    <div className='lenzData'>
                        {/*<Autocomplete disabled={true}//{props.disabled?true:false}
                            options={standardOption(moreOptions.Position,1)||[]}
                            onChange={(e,value)=>updateMore(value,3)}
                            style={{ width: "100%"}}
                            value={props.moreValue[3]?props.moreValue[3]:
                                defMoreValue&&defMoreValue[3]||''}
                            renderInput={(params) =>
                            <TextField {...params} label="Position" variant="outlined"/>}
                            />*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ODOSinfo