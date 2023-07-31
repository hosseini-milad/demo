import { Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import ButtonLoaderSimple from '../Components/BtnLoaderSimple';
import env from '../env';
import { useEffect } from 'react';

function OrderStep06(props){
    const [moreInfo,setMoreInfo] = useState(props.def.moreInformation)
    const [expressPrice,setExpress] = useState(props.def.expressPrice)
    const [consumer,setConsumer] = useState(props.def.consumer)
    const [spin,setSpin] = useState();
    
       //console.log(props.def)
    return(
        <div className="orderStepsHolder">
            <br/>
            <div className="orderDataHolder">
                
                <FormControlLabel label="ارسال فوری" style={{width:"50%",margin:"10px"}}
                 control={<Checkbox onChange={(e,value)=>setExpress(value)}
    defaultChecked={expressPrice?true:false}/>}/>
                <TextField variant="outlined"
                    value={consumer||''}
                    onChange={(e)=>setConsumer(e.target.value)}
                    label="نام و نام خانوادگی مصرف کننده"
                    style={{width:"275px"}}/>
                <hr/>
                <TextField variant="outlined"
                    label="توضیحات بیشتر"
                    multiline  
                    minRows={5}
                    defaultValue={(props.token.manager?"ثبت توسط مدیریت ":"")}
                    value={(props.token.manager?"ثبت توسط مدیریت ":"")+" | "
                        +moreInfo?moreInfo:""}
                    onChange={(e)=>setMoreInfo(e.target.value)}
                    style={{width:"100%"}}/>
                    <hr/>
                    
                
                <div className="orderContinue">
                    {spin?env.wait:''}
                    {props.def.rxLenz?(<>
                        <input type="button" className="orderBtn"
                        style={{float: "none"}} onClick={()=>{setSpin(1);
                            props.saveState({"moreInformation":moreInfo,"consumer":consumer,
                            "expressPrice":expressPrice?"0":"","lastIndex":10});
                            setTimeout(()=>{setSpin(0);props.setTabIndex(10);
                              window.location.href="/order/rx#preview"},1000);}
                            }
                        value={"مشاهده پیش نمایش"} popText={"پیش نمایش سفارش شما آماده شده است."}/>
                        </>):
                    <><a href="/order/rx#lenzDetail" onClick={()=>props.setTabIndex(1)} className='errorPreview'>عدسی باید تعیین شود</a>
                    <input type="button" className="disableBtn" value="پیش نمایش"/></>}
                    <small className="preBtn" onClick={()=>{props.setTabIndex(4);
                    window.location.href="/order/rx#serviceInfo"}} >صفحه قبل</small>
                    
                </div>
            </div>
        </div>

    )
}
export default OrderStep06