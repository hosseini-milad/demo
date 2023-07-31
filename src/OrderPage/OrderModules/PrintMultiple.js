import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env, { orderStatus } from "../../env";
import Preview from "./Preview";
import PreviewStock from "./PreviewStock";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintMultiple(props){
    const rxOrderNo = document.location.pathname.split('/')[2];
    const rxOrderArray = rxOrderNo.split(',')
    const [orderInfo, setOrderInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
    persianDate.toCalendar('persian');
    const[color,setColor] = useState('');
    console.log(orderInfo)
    useEffect(() => {
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({'rxOrderNo':rxOrderArray})
          }
          fetch(env.siteApi+"/order/fetch-orders",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setOrderInfo(result.data);
                
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
      
      },[])
    return(<>
      {orderInfo&&orderInfo.map((orderData,i)=>(
        <div className="printArea" key={i}>
      
        <div className="userInfo">
          <div className="userSection">
            <strong>مرکز تخصصی سفارشات نسخه ای</strong>
            <span>سفارش دهنده: {orderData.user.cName?orderData.user.cName:orderData.user.phone}</span>
            <span>وضعیت: {orderStatus(orderData.data&&orderData.data.status)}</span>
          </div>
          <div className="userSection">
            <h1>MGM Lens</h1>
            
          </div>
          <div className="userSection">
            <small>تاریخ: <b>{new persianDate(new Date(orderData.data.date)).format().split(' ')[0]}</b></small>
            <small>شماره سفارش: <b>{orderData.data.rxOrderNo}</b></small>
            
            <small>ساعت ثبت سفارش: <b>{new persianDate(new Date(orderData.data.date)).format().split(' ')[1]}</b></small>
          </div>
        </div>
        {type==="RX"?<Preview defData={orderData.data} lenzDetail={orderData.lenzData} colorList={color}/>:
          <PreviewStock defData={orderData.data} lenzDetail={rxInfo}/>}
        
    </div>))}
    </>
    )
}
export default PrintMultiple