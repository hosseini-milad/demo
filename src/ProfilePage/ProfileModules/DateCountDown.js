import { useEffect } from "react";
import { useState } from "react";


function DateCountDown(props){
//var tempCounter = !tempCounter&&props.countDown;
    const [sec,setSec] = useState(60*60*1000);
    useEffect(() => {
        if(sec<=0){localStorage.removeItem('token-lenz');
            setSec(60*60*1000);
            window.location.reload();
        }
        const interval = setInterval(() => {
            setSec(sec - 1000);
          }, 1000);
          return () => clearInterval(interval);
    }, [sec]);
    
    const msToTime=(milliseconds)=>{
        
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = seconds >= 60 ? minutes + 1 : minutes;
        minutes = minutes % 60;
        hours = hours % 24;
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    return(
        <>
            {sec>0?
            <div className='countDown' onClick={()=>{}} >
               <small>مدت باقی مانده</small> <b>{msToTime(sec)}</b></div>:
            <button className='countDown' onClick={()=>document.location.href="/login"}>لطفا دوباره وارد شوید</button>}   
            
        </>
    )
}
export default DateCountDown