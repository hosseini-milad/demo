import persianDate from 'persian-date';
import { TextField } from "@material-ui/core"
import { useState } from 'react';

function DateSelect(props){
    persianDate.toCalendar('persian');
    const nowDate = new Date(Date.now())
    var delayTime = new Date(nowDate.getTime());
    delayTime.setDate(delayTime.getDate()-(props.delay?props.delay:0))
    const pDate = new persianDate(new Date(delayTime)).toLocale('en').format();
    const pNow = pDate.split(' ')[0].replace(/-/g, '/');
    const pWeek = new persianDate(new Date(delayTime)).format('dddd');
    //console.log(enDate(pDate))
    return(<>
        <span>
            <TextField style={{ width: "100%"}}
                defaultValue={pNow}
                onChange={(e)=>props.setDate(e.target.value)}
                 label={props.title}/>
        </span>
        </>
    )
}
export default DateSelect

const DateDefNow=(date)=>{
    persianDate.toCalendar('persian');
    let dateNow = new Date()
    const nowPDate =new persianDate(dateNow).toLocale('en').format().split(' ')[0]; 
    const numNow = nowPDate.split('-').map(fromDate=>Number(fromDate))
    //const from =; 
    const numFrom = date.split('/').map(fromDate=>Number(fromDate))
    var a = new persianDate(numNow);
    var b = new persianDate(numFrom);
    const def = a.diff(b, 'days')//now.diff(date, 'days'); // 1
    
    //console.log(def)
    return(def)
}