import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
//import Calendar from 'react-calendar';
import { jalali_to_gregorian, orderStatus, orderStatusRev } from "../env";
import DateSelect from "../ProfilePage/ProfileModules/DateSelect";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {Calendar } from "react-modern-calendar-datepicker";
import AutoComplete from "../Components/AutoComplete";

const wWidth = window.innerWidth;

function FiltersReport(props){
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const manufactureList = props.manufactureList;
    const brandList = props.brandList
    const [calendar,setCalendar]= useState(0)
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });
     // console.log(props.manResult&&props.manResult.status)
    const changeDate=()=>{
        props.setManResult(pState => 
            {return { ...pState, 
                /*dateFrom:fromDate?jalali_to_gregorian(
                    fromDate.year,fromDate.month,
                    fromDate.day):0 ,
                dateTo:toDate?jalali_to_gregorian(
                    toDate.year,toDate.month,
                    toDate.day):0*/
                dateFrom:selectedDayRange.from?jalali_to_gregorian(
                    selectedDayRange.from.year,selectedDayRange.from.month,
                    selectedDayRange.from.day)
                :0 ,dateTo:selectedDayRange.to?jalali_to_gregorian(
                    selectedDayRange.to.year,selectedDayRange.to.month,
                    selectedDayRange.to.day):0
                }}
        )
    }
    return(<>
        <div className="filterItems">
            <TextField style={{ width: "100%",marginTop: "20px"}}
                onChange={(e)=>{//(e.key)==='Enter'&&
                    (e.target.value.length>2||e.target.value.length===0)&&
                props.setManResult(pState => 
                    {return { ...pState, customer:e.target.value }}
                )}}
                 label="مشتری"/>
            <TextField style={{ width: "100%",margin: "auto 5px 0"}}
                onChange={(e)=>{
                    (e.target.value.length>6||e.target.value.length===0)&&
                    props.setManResult(pState => 
                        {return { ...pState, orderNo:e.target.value }}
                    )}}
                 label="شماره سفارش"/>
            {wWidth>700?<Autocomplete
                options={["در حال ثبت","ثبت شده","تایید شده",
                "در حال تولید","تولید شده","ارسال از کارخانه",
                "معلق","تحویل به انبار",
                "ارسال به فروشگاه","ارسال به مشتری","انصراف"]} 
                freeSolo
                style={{ width: "100%"}}
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, status:orderStatusRev(Value) }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="وضعیت"/>}
            />:<AutoComplete options={["در حال ثبت","ثبت شده","تایید شده",
            "در حال تولید","تولید شده","ارسال از کارخانه",
            "تحویل به انبار",
            "ارسال به فروشگاه","ارسال به مشتری","انصراف"]} 
            style={{marginTop:"25px"}}
            value={orderStatus(props.manResult.status)}
            onValueChange={(Value)=>props.setManResult(pState => 
                {return { ...pState, status:orderStatusRev(Value) }}
            )}
            label="وضعیت"/>}
            {wWidth>700?<Autocomplete
                options={["ESSENCE","KODAK","MGMPlus","REVO"]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, brand:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="برند"/>}
            />:
            <AutoComplete
                options={["ESSENCE","KODAK","MGMPlus","REVO"]} 
                
                style={{marginTop:"25px"}}
                value={props.manResult.brand}
                onValueChange={(Value)=>props.setManResult(pState => 
                    {return { ...pState, brand:Value }}
                )}
                label="برند"
            />}
            {/*<div className="toDateClass">
                <DateSelect title={"تاریخ از"} delay={0} setDate={setFromDate}/>
            </div>
            <div className="toDateClass">
                <DateSelect title={"تاریخ تا"} setDate={setToDate}/>
            </div>
                */}
            <div className="dateSelect">
                <DatePicker
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    inputPlaceholder="انتخاب تاریخ"
                    shouldHighlightWeekends
                    locale="fa" // add this
                />
                {/*<DatePicker
                    value={fromDate}
                    onChange={setFromDate}
                    inputPlaceholder="انتخاب تاریخ از"
                    shouldHighlightWeekends
                    locale="fa" // add this
                />
                <DatePicker
                    value={toDate}
                    onChange={setToDate}
                    inputPlaceholder="انتخاب تاریخ تا"
                    shouldHighlightWeekends
                    locale="fa" // add this
            />*/}
            </div> 
            <input className="orderTabOpti activeOptiTab filterDate"
             value="اعمال تاریخ" style={{alignItem:"center"}} type="button" onClick={()=>changeDate()} />
        </div>
        <div className="calendar" style={{display:calendar?"block":"none"}}>
            {/*<Calendar onChange={(e,value)=>changeDate(e,value)} value={new Date(Date.now())} />*/}
        </div>
        </>
    )
}
export default FiltersReport