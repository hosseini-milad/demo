import { useEffect } from "react";
import { useState } from "react";


function DateDef(props){
var tempCounter = !tempCounter&&props.countDown;
    /*const [sec,setSec] = useState(tempCounter+60*60*1000);
    useEffect(() => {

        const interval = setInterval(() => {
            setSec(sec - 1000);
          }, 1000);
          return () => clearInterval(interval);
    }, [sec]);*/
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
        <button onClick={()=>props.changeOrderStatus("initial")} className='editOrderButton'>ویرایش </button>
            {/*sec>0?<button onClick={()=>props.changeOrderStatus("initial")} className='editOrderButton'>ویرایش <i>{msToTime(sec)}</i></button>:
            <button disabled className='editOrderButton'>ویرایش </button>*/}   
            
        </>
    )
}
export default DateDef