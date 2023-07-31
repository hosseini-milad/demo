import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env, { orderStatus } from "../../env";
import Preview from "./Preview";
import PreviewStock from "./PreviewStock";
import DateShow from "../../ProfilePage/ProfileModules/DateShow";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function OrderStatus(props){
    const rxOrderNo = document.location.pathname.split('/')[2];
    const [orderLogInfo, setOrderLogInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
    persianDate.toCalendar('persian');
    const[pDate,setPDate] = useState('');
    const[pWeek,setPWeek] = useState('');
    const[color,setColor] = useState('');
    //console.log(orderLogInfo)
    useEffect(() => {
      const postOptions={
        method:'post',
        headers: { 
          'Content-Type': 'application/json'},
        body:JSON.stringify({'rxOrderNo':rxOrderNo})
      }
      fetch(env.siteApi+"/setting/orderlog",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setOrderLogInfo(result);

          },
          (error) => {
            console.log({error:error});
          }
        )
        .catch((error)=>{
          console.log(error)
        })
      },[])
      
    return(<main>
      <div className="orderDataHolder">
        <div className="statusUserData">
          <h2>{orderLogInfo&&orderLogInfo.user&&orderLogInfo.user.cName}</h2>
          <h4>{orderLogInfo&&orderLogInfo.user&&orderLogInfo.user.phone}</h4>
          <h4>شماره سفارش: {rxOrderNo}</h4>
          <button className="printBtn" onClick={()=>window.location.href="/print/"+rxOrderNo}>جزئیات سفارش</button>
        </div>
        <table className="orderTable">
          <tbody>
            <tr>
              <th>ردیف</th>
              <th>وضعیت</th>
              <th>کاربر</th>
              <th>تاریخ</th>
            </tr>
          {orderLogInfo&&orderLogInfo.log&&orderLogInfo.log.map((item,i)=>(
            <tr key={i}>
              <td>{i+1}</td>
              <td>{orderStatus(item.status)}</td>
              <td>{item.user}</td>
              <td><DateShow date={item.date} second="1"/></td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      </main>
    )
}
export default OrderStatus