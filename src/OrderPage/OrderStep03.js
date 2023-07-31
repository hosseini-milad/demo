import {FormControlLabel, Checkbox } from '@material-ui/core';
import { useEffect, useState } from 'react';
import env, { checkNull } from '../env';
import ODOSinfo from './OrderModules/ODOSinfo';
import ODOSinfoMobile from './OrderModules/ODOSinfoMobile';
const wWidth = window.innerWidth;

function OrderStep03(props){
    const [mainValue,setMainValue] = useState([,,,,,])
    const [moreValue,setMoreValue] = useState([,,,,])

    const [mainLeft,setMainLeft] = useState([,,,,,])
    const [moreLeft,setMoreLeft] = useState([,,,,])
    const[clear,setClear] = useState(0)
    const[error,setError] = useState()
    const[errorField,setErrorField] = useState(['',''])
    const defaultData = props.def;
    const [spin,setSpin] = useState();
    //console.log(errorField)
    var SPHOptionsP=[];var CYLOptionsP=[];var AxisOptions=[];
    var AddOptionsP=[];var SIZEOptionsP=[]
    try{
    SPHOptionsP=(props.params.find(item=>item.title==="SPH").paramValue).split(',')
    CYLOptionsP=(props.params.find(item=>item.title==="CYL").paramValue).split(',')
    AxisOptions=(props.params.find(item=>item.title==="Axis").paramValue).split(',')
    AddOptionsP=(props.params.find(item=>item.title==="ADD").paramValue).split(',')
    SIZEOptionsP=(props.params.find(item=>item.title==="SIZE").paramValue).split(',')
    }catch{}
    //console.log(props.tabIndex)
    const [leftRight,setLeftRight] = useState(defaultData&&defaultData.copyLeftRight?1:0)
    const [singleLens,setSingle] = useState(defaultData&&defaultData.singleLens?1:0)

    var prismOptions=[];var prismBaseOptions=[];
    var DECOptions=[]; var PositionOptions=[];
    try{
    prismOptions=(props.params.find(item=>item.title==="Prism").paramValue).split(',')
    prismBaseOptions=(props.params.find(item=>item.title==="PrismBase").paramValue).split(',')
    DECOptions=(props.params.find(item=>item.title==="DEC").paramValue).split(',')
    PositionOptions=(props.params.find(item=>item.title==="Position").paramValue).split(',')
    }catch{}
    
    var odList = []
    var osList = []
    useEffect(() => {
        mainLeft===[,,,,,]?setSingle(0):setSingle(1)
    },[mainLeft])
    useEffect(() => {
        setErrorField(['',''])
    },[])
    if(defaultData){
        odList.push(defaultData.odSPH,defaultData.odCYL,
            defaultData.odAxis,defaultData.odAdd,
            defaultData.odSIZE,defaultData.odPrism,
            defaultData.odPrismBase,defaultData.odDEC,defaultData.odPosition);
        
        }
        if(defaultData)
        osList.push(defaultData.osSPH,defaultData.osCYL,
            defaultData.osAxis,defaultData.osAdd,
            defaultData.osSIZE,defaultData.osPrism,
            defaultData.osPrismBase,defaultData.osDEC,defaultData.osPosition);
            //console.log(mainValue)
    const copyRightLeft=()=>{
        if(!leftRight){
            setClear(0)
        setMainLeft(mainValue);
        setMoreLeft(moreValue);}
        else{
            setClear(1)
            setMainLeft([,,,,,]); 
            setMoreLeft([,,,,,])
        }
        setLeftRight((leftRight+1)%2)
    }
    return(
        <div className="orderStepsHolder">
            <div className="orderDataHolder"><br/>
                {props.params&&wWidth>700?<ODOSinfo defMainData={props.def.odMain} 
                    defMoreData={props.def.odMore} defADD={props.def.rxLenz} setError={setError}
                    errorField={errorField[0]} setErrorField={setErrorField} RL="R"
                    params={props.params.params} title="OD<sub>(چشم راست)</sub>"
                setMainValue={setMainValue} mainValue={mainValue}
                setMoreValue={setMoreValue} moreValue={moreValue}/>:
                <ODOSinfoMobile defMainData={props.def.odMain} 
                setErrorField={setErrorField} setError={setError}
                    defMoreData={props.def.odMore} defADD={props.def.rxLenz}
                    params={props.params.params} title="OD<sub>(چشم راست)</sub>"
                setMainValue={setMainValue} mainValue={mainValue} RL="R"
                setMoreValue={setMoreValue} moreValue={moreValue}/>}
                {/*<div className="copyLeftRight">
                    <FormControlLabel label="تک عدسی" 
                    control={<Checkbox defaultChecked={singleLens?true:false}/>} onClick={singleLensSet}/>
    </div>*/}
                {<div className="copyLeftRight">
                    <FormControlLabel label="کپی چشم چپ با راست" 
                    control={<Checkbox defaultChecked={leftRight?true:false}/>} onClick={copyRightLeft}/>
                </div>}
                {props.params&&wWidth>700?<ODOSinfo defMainData={!clear?props.def.osMain:''} 
                    defMoreData={!clear?props.def.osMore:''} defADD={props.def.rxLenz} setError={setError}
                    errorField={errorField[1]} setErrorField={setErrorField} RL="L"
                    params={props.params.params} disabled={leftRight} title="OS<sub>(چشم چپ)</sub>"
                setMainValue={setMainLeft} mainValue={mainLeft}
                setMoreValue={setMoreLeft} moreValue={moreLeft}/>:
                <ODOSinfoMobile defMainData={!clear?props.def.osMain:''} 
                    setErrorField={setErrorField} setError={setError}
                    defMoreData={!clear?props.def.osMore:''} defADD={props.def.rxLenz}
                    params={props.params.params} disabled={leftRight} title="OS<sub>(چشم چپ)</sub>"
                setMainValue={setMainLeft} mainValue={mainLeft}
                setMoreValue={setMoreLeft} moreValue={moreLeft}/>}
                                
                <div className="orderContinue">
                    <small style={{color:"var(--orange-color)",padding:"5px 10px"}}>{error}</small>
                    {spin?env.wait:''}
                    {(!mainValue[0]&&!mainLeft[0]||errorField[0]||errorField[1])?
                    <input type="button" className="disableBtn" value="انتخاب عدسی" />:
                    <input type="button" className="orderBtn" value="ادامه" 
                    onClick={()=>{setSpin(1);
                        var addCheck = defaultData&&defaultData.rxLenz?
                            defaultData.rxLenz.split(','):[,,,,,];
                        //console.log(addCheck)
                        if((!addCheck[3]&&!addCheck[4])||
                            (mainValue[3]||!checkNull(mainValue))&&
                            (mainLeft[3]||!checkNull(mainLeft))){
                            if(((!mainValue[1]||mainValue[2])&&(!mainLeft[1]||mainLeft[2]!==""))){
                                //console.log(checkNull(mainValue[0]),checkNull(mainLeft[0]))
                                //console.log((!(checkNull(mainValue[4])^checkNull(mainLeft[4]))))

                                if(((checkNull(mainValue[0])&&checkNull(mainLeft[0]))?
                                    ((!(checkNull(mainValue[4])^checkNull(mainLeft[4])))?1:0):1)){
                                    setTimeout(()=>{setSpin(0);
                                    props.setTabIndex(3);
                                    props.saveState({
                                    ...{odMain:mainValue.toString()},
                                    ...{odMore:moreValue.toString()},
                                    ...{osMain:mainLeft.toString()},
                                    ...{osMore:moreLeft.toString()},
                                "lastIndex":3,"copyLeftRight":leftRight,"singleLens":singleLens})
                                    window.location.href="/order/rx#frameSize";},2000)}
                                else{setError('هر دو سایز باید وارد شوند');
                                setErrorField((mainValue[0]&&!mainValue[4])?["Size",""]:["","Size"]);
                                window.scrollTo(0, 170)}
                                }
                            else{setError('لطفا مقدار Axis را وارد نمایید');
                                setErrorField((mainValue[1]&&!mainValue[2])?["Axis",""]:["","Axis"]);
                                window.scrollTo(0, 170)
                            }
                        }
                        else{setError('لطفا مقدار ADD را وارد نمایید');
                        setErrorField((mainValue[0]&&!mainValue[3])?["ADD",""]:["","ADD"]);
                        window.scrollTo(0, 170)}
                        setTimeout(setErrorField(['','']),6000)
                    }
                    
                    
                }/>}
                    <small className="preBtn" onClick={()=>{props.setTabIndex(1);window.location.href="/order/rx#lenzDetail"}} >صفحه قبل</small>
                    
                </div>
                
            </div>
        </div>

    )
}
export default OrderStep03