import { useState,useEffect } from "react";
import env, { jalali_to_gregorian } from "../../env";
import {FormControlLabel, Switch} from '@material-ui/core';
import DatePicker, {Calendar } from "react-modern-calendar-datepicker";

function ChangePriceStatus(props){
    const [priceStatus,setPriceStatus] = useState()
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });
    
    useEffect(() => {
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'}
      }
    fetch(env.siteApi + `/order/${props.rxStock}/activePrice`,postOptions)
  .then(res => res.json())
  .then(
    (result) => {
        setPriceStatus(result.status)
    },
    (error) => {
      console.log(error);
    }
    )},[])
    const changeStatus=(state)=>{
        const body={priceState:state.paramValue==="active"?"deactive":"active"}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
        }
        fetch(env.siteApi + `/order/${props.rxStock}/activePrice`,postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            setPriceStatus(result.status)
        },
        (error) => {
        console.log(error);
        })
    }
    const schedulePrice=()=>{
        console.log(selectedDayRange)
        const body={dateFrom:jalali_to_gregorian(
            selectedDayRange.from.year,
            selectedDayRange.from.month,
            selectedDayRange.from.day),
        dateTo:jalali_to_gregorian(
            selectedDayRange.to.year,
            selectedDayRange.to.month,
            selectedDayRange.to.day)}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
        }
        fetch(env.siteApi + `/order/${props.rxStock}/activePrice`,postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result)
            setPriceStatus(result.status)
        },
        (error) => {
        console.log(error);
        })
    }
    return( <>
        <div className="" style={{float:"left"}}>
            <DatePicker
                value={selectedDayRange}
                onChange={setSelectedDayRange}
                inputPlaceholder="انتخاب تاریخ"
                shouldHighlightWeekends
                locale="fa" // add this
            />
            <input className="orderTabOpti activeOptiTab filterDate"
             value="زمانبندی اعلامیه قیمت" style={{alignItem:"center"}} 
             type="button" onClick={()=>schedulePrice()} />
        </div>
        <FormControlLabel className="priceSwitcher"
        control={
        <Switch color="secondary" label={"left"}
            checked={priceStatus&&priceStatus.paramValue==="active"?true:false}
            onClick={()=>changeStatus(priceStatus)} />}
            label="اعلامیه قیمت"
        /></>
    )
}
export default ChangePriceStatus