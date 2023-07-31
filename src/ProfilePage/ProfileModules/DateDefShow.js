import { useEffect } from "react";
import { useState } from "react";


function DateDefShow(props){
var tempCounter = !tempCounter&&props.countDown;
    const [sec,setSec] = useState(tempCounter);
    useEffect(() => {

        const interval = setInterval(() => {
            setSec(sec + 1000);
          }, 1000);
          return () => clearInterval(interval);
    }, [sec]);
    
    const msToTime=(milliseconds)=>{
        
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds = seconds % 60;
        minutes = seconds >= 60 ? minutes + 1 : minutes;
        minutes = minutes % 60;
        hours = hours % 24;
        days = days;
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    return(
        <>
            {<div className='countDown'><i>{msToTime(sec)}</i></div>}   
            
        </>
    )
}
export default DateDefShow