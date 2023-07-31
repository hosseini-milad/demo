import { useState } from "react";
import { useEffect } from "react";
import env from "../../env";
import Preview from "./StockPreview";

function PrintArea(props){
    const rxOrderNo = document.location.pathname.split('/')[2];
    const [orderInfo, setOrderInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    useEffect(() => {
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({'rxOrderNo':rxOrderNo})
          }
          fetch(env.siteApi+"/order/fetch-order",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setOrderInfo(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
          //window.scrollTo(0, 170);
      },[])
      useEffect(() => {
        console.log(orderInfo)
        if(!orderInfo) return
        const data = orderInfo.rxLenz?orderInfo.rxLenz.split(',')[2]:'';
        
        if(!data)return
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data})
        }
        fetch(env.siteApi+"/order/manufacture/find",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setRxInfo(result)
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
        //window.scrollTo(0, 170);
    },[orderInfo])
    //console.log(orderInfo)

    const printNow=()=>{
        window.print();
    }
    return(
        <div className="printArea">
            <div className="userInfo">
              <div className="userSection">
                <strong>مرکز تخصصی سفارشات نسخه ای</strong>
                <span>www.MGMLens.com</span>
                <span>کد: 15</span>
              </div>
              <div className="userSection">
                <h1>MGM Lens</h1>
              </div>
              <div className="userSection">
                <small>تاریخ: <b>1401/07/10</b></small>
                <small>شماره سفارش: <b>3-37461</b></small>
                <small>ساعت ثبت سفارش: <b>16:25</b></small>
              </div>
            </div>
            <Preview defData={orderInfo} lenzDetail={rxInfo}/>
            <button onClick={()=>printNow()}>چاپ</button>
        </div>
    )
}
export default PrintArea