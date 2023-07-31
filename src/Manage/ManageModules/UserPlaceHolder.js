import { useState } from "react"
import OrderData from "./orderData"

function UserPlaceHolder(props){
    const [showDetail,setShowDetail] = useState(0)
    console.log(props.user)
    return(
        
        <div className="profileOrderList">
            <div className="orderHeaderTitle">
                <button className="editOrderButton acceptBtn" 
                    onClick={()=>setShowDetail((showDetail+1)%2)}>مشاهده سفارشات</button>
                <h3>{props.user.userInfo[0]?props.user.userInfo[0].userName:"بدون نام"}</h3>
                <small>{props.user.phone}</small>
            </div>
            <div className="userOrdersList" style={{display:showDetail?"block":"none"}}>
                {props.user.orders.map((order,i)=>(
                    <OrderData order={order} key={i} />
                ))}
            </div>
        </div>
        
    )
}
export default UserPlaceHolder