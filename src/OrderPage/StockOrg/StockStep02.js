import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useState } from "react";
import SimpleFetch from "../../Components/simpleFetch";
import env, { normalPrice } from "../../env";
import ColorSelect from "./Stock02/ColorSelect";

function StockStep02(props){
    const frameType = ["ریملس","گریف","کائوچو","فلزی"];
    const IPD = ["20","20.5","21","21.5"];
    const FH=["10","11","12","13","14","15","16"];
    const cover=["Blue Control","HC","HMC"];
    const [frame,selectFrame] = useState(0);
    const [extraData,setExtraData] = useState('')
    const [moreService, setMoreService] = useState(0)
    const colorList = SimpleFetch(env.siteApi+"/order/color");
    console.log(props)
    const addToCart=()=>{
        console.log(frame,extraData)
        const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({
                ...{userId:token.userId,status:"initial",
                stockId:props.stockItem._id,extraInformation:"",
                frameShape:frame,framePrice:"0",count:props.count},
                
                ...extraData
                  }  )
          }
          fetch(env.siteApi+"/order/addItem",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setTimeout(()=>window.location.href='/cart',1000)
              },
              (error) => {
                console.log(error);
                setTimeout(()=>window.location.href='/login',1000)
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    }
    //console.log(extraData)
    return(
        <div className="orderStepsHolder">
                
            <div className="orderDataHolder"><br/>
                <div className='innerSeprator'>
                    <div className='innerHeader'>نصب</div>
            <Autocomplete
                    options={frameType}
                    style={{ width: "50%"}}
                    onChange={(e,value)=>selectFrame(value)}
                    renderInput={(params) =>
                    <TextField {...params} label="شکل فریم" variant="outlined" />}
                />
            <div className="frameDetail" style={{display:frame?"block":"none"}}>
                <div className='orderLenzData inRow'>
                {props.count==="1"&&<h2> OD </h2>}
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.sphOD} label="SPH" variant="outlined"/> 
                    </div>
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.cylOD} label="CYL" variant="outlined"/> 
                    </div>
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.od} label="AXIS" variant="outlined"/> 
                    </div>
                    <div className='lenzData'>
                        <Autocomplete
                            options={IPD}
                            onChange={(e,value)=>
                                setExtraData(previousState => {
                                return { ...previousState, odIPD: value }
                              })}
                            style={{width:"100%"}}
                            renderInput={(params) =>
                            <TextField {...params} label="IPD" variant="outlined"/>}
                        />
                    </div>
                    <div className='lenzData'>
                        <Autocomplete
                            options={FH}
                            onChange={(e,value)=>
                                setExtraData(previousState => {
                                return { ...previousState, odFH: value }
                              })}
                              style={{width:"100%"}}
                            renderInput={(params) =>
                            <TextField {...params} label="FH" variant="outlined"/>}
                        />
                    </div>
            </div>
            {props.count==="1"&&<div className='orderLenzData inRow'>
                    <h2> OS </h2>
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.sphOS} variant="outlined" label="SPH"/> 
                    </div>
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.cylOS} variant="outlined" label="CYL"/> 
                    </div>
                    <div className='lenzData disableLenz'>
                        <TextField disabled value={props.stockItem.os} variant="outlined" label="AXIS"/> 
                    </div>
                    <div className='lenzData'>
                        <Autocomplete
                            options={IPD}
                            onChange={(e,value)=>
                                setExtraData(previousState => {
                                return { ...previousState, osIPD: value }
                              })}
                              style={{width:"100%"}}
                            renderInput={(params) =>
                            <TextField {...params}  label="IPD" variant="outlined"/>}
                        />
                    </div>
                    <div className='lenzData'>
                        <Autocomplete
                            options={FH}
                            onChange={(e,value)=>
                                setExtraData(previousState => {
                                return { ...previousState, osFH: value }
                              })}
                              style={{width:"100%"}}
                            renderInput={(params) =>
                            <TextField {...params}  label="FH" variant="outlined"/>}
                        />
                    </div>
            </div>}
            <div className="priceXtra"><span>قیمت: رایگان</span></div>
            </div></div>    <br/>
            
                <div className='innerSeprator'>
                    <div className='innerHeader' onClick={()=>setMoreService((parseInt(moreService)+1)%2)}>خدمات بیشتر 
                    <i className={moreService?"fa fa-chevron-up":"fa fa-chevron-down"}></i></div>
                    <div style={{display:moreService?"block":"none"}}>
                    <div className='lenzData lenzFull'>                   
                        <div className='innerSeprator' style={{width: "100%"}}>
                            <div className='innerHeader'>رنگ</div>
                            {colorList&&<ColorSelect colorList={colorList.color} 
                                setExtraData={setExtraData} type="color"/>}
                            <div className="priceXtra"><span>قیمت: {normalPrice(extraData.colorPrice)} تومان</span></div>
                        </div>
                    </div>
                <div className='lenzData lenzFull'>                   
                    <div className='innerSeprator' style={{width: "100%"}}>
                        <div className='innerHeader'>پوشش</div>
                        <Autocomplete
                            options={cover}
                            style={{ width: "100%"}}
                            onChange={(e,value)=>
                                setExtraData(previousState => {
                                return { ...previousState, coverCode: value }
                            })}
                            renderInput={(params) =>
                            <TextField {...params} variant="outlined" />}
                        />
                        <div className="priceXtra"><span>قیمت: 1.000.000 تومان</span></div>
                    </div>
                </div>
                <div className='lenzData lenzFull'>                   
                    <div className='innerSeprator' style={{width:"100%"}}>
                        <div className='innerHeader'>Mirror</div>
                    {colorList&&<ColorSelect colorList={colorList.mirror} 
                        setExtraData={setExtraData} type="mirror"/>}
                    <div className="priceXtra"><span>قیمت: {normalPrice(extraData.mirrorPrice)} تومان</span></div>
                </div>
                </div>
                <TextField variant="outlined"
                    label="اطلاعات تکمیلی"
                    multiline  
                    minRows={5}
                    style={{width:"100%"}}/>
                <hr/>
            </div>
            </div>  
                <div className="orderContinue">
                    <input type="button" className="orderBtn fullBtn" value="افزودن به سبد خرید" 
                     onClick={()=>addToCart()}/>
                </div>
            </div>
        </div>

    )
}
export default StockStep02