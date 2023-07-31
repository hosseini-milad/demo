import { useEffect, useState } from "react"
import env from "../../env"

function OrderStatusMessage(props){
    //const [log,setLog] = useState('')
    const log =props.userLog
    const [logUser,setLogUser] = useState('')
    //console.log(log)
    /*useEffect(() => {
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
              body:JSON.stringify({rxOrderNo:props.orderNo})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/orderlog",postOptions)
        .then(res => res.json())
        .then((result) => {
            //console.log(result)
                if(result){
                setLog(result.log)
                setLogUser(result.user)
                }
                
            //setTimeout(()=>window.location.reload(),200)
            },
            (error) => {
            console.log("error",error);
            }
        )
    },[])*/
    return(
        <div className="profileOrderInfo">
            {!props.status.includes("cancel")&&<>
            <span>تاریخ ثبت: {props.pWeek} {props.pDate}<small> ({props.rawDate}) </small></span>
            </>}
            {props.status.includes("cancel")&&<>
            <span>تاریخ لغو: {props.pWeek} {props.pDate}</span>
            </>}
            <br/>{props.access==="factory"?"":<><small>
                {props.user?
                `${props.user.cName} (${props.user.phone})`:
                ''}
                </small>
                <i className="userLog">{log&&log[0]?
                log[0].user:''}</i></>}
        </div>
    )
}
export default OrderStatusMessage