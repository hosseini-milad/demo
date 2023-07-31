import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import env ,{orderStatusRev} from "../../env";
import DateSelect from "./DateSelect";

function ProfileFiltersReport(props){
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const manufactureList = props.manufactureList;
    const brandList = props.brandList
    
    const findState=(e)=>{
        if(e==="ثبت شده")return("inprogress")
        if(e==="کارخانه")return("accept")
        if(e==="انبار")return("store")
        if(e==="فروشگاه")return("shop")
        if(e==="ارسال شده")return("completed")
        if(e==="انصراف")return("cancel")
        
    }
    const changeDate=()=>{
        //const now = new Date(Date.now());
        //const dateFromEn = new Date(now.setDate(now.getDate()-21));
        //const dateToEn = new Date(now.setDate(now.getDate()-1));
        //console.log(now)//,dateFromEn,dateToEn)
        props.setManResult(pState => 
            {return { ...pState, 
                dateFrom:fromDate?fromDate:30 ,dateTo:toDate?toDate:0}}
        )
    }
    return(<>
        <div className="filterItems">
            <TextField style={{ width: "100%",margin: "auto 5px 0"}}
                onChange={(e)=>{
                    props.setManResult(pState => 
                        {return { ...pState, orderNo:e.target.value }}
                    )}}
                 label="شماره سفارش"/>
            <Autocomplete
                options={["در حال ثبت","ثبت شده","تایید شده",
                "در حال تولید","تولید شده","ارسال از کارخانه",
                "تحویل به انبار",
                "ارسال به فروشگاه","ارسال به مشتری","انصراف"]}
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, status:orderStatusRev(Value) }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="وضعیت"/>}
            />
            <Autocomplete
                options={["ESSENCE","KODAK","MGMPlus","REVO"]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, brand:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="برند"/>}
            />
            <div className="toDateClass">
                <DateSelect title={"تاریخ از"} delay={7} setDate={setFromDate}/>
            </div>
            <div className="toDateClass">
                <DateSelect title={"تاریخ تا"} setDate={setToDate}/>
            </div>
            <input className="orderTabOpti activeOptiTab filterDate"
             value="اعمال تاریخ" style={{alignItem:"center"}} type="button" onClick={()=>changeDate()} />
        </div>
        </>
    )
}
export default ProfileFiltersReport