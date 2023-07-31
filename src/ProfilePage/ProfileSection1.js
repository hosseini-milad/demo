import ProfileOrderList from "./ProfileOrderList"
import SimpleAuth from "../Components/simpleAuth";
import env from "../env";
import { useEffect, useState } from "react";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function ProfileSection1(){
    const [rxList,setRXList]= useState('');
    const [stockList,setStockList]= useState('');
    const [rxIndex,setIndex] = useState(0)
    const [refreshRate,setRefreshRate] = useState(1)
    const [stockRX,setStockRX]= useState(0)
    
    useEffect(()=>{
      if(refreshRate){
        const postOptions={
            method:'get',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId}
          }
          fetch(env.siteApi+"/order/rxSeprateCustomer",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setRXList(result);
                //setStockList(result.stockData)
                setRefreshRate(0)
                
                window.scrollTo(0, 470)
              },
              (error) => {
                setRXList({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
          fetch(env.siteApi+"/order/stockSeprateCustomer",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setStockList(result);
                //setStockList(result.stockData)
                setRefreshRate(0)
              },
              (error) => {
                setStockList({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
          }
    },[refreshRate])

    useEffect(()=>{
      if(rxIndex>-1)window.scrollTo(0, 470)
  },[rxIndex])
  
    const orderOptions = [
      {title:"سفارشات ثبت شده",status:"inprogress",count:rxList.rxDataInprogress,
        sCount:stockList.stockDataInprogress,access:"manager",stock:true},
      {title:"سفارشات تایید شده",status:"accept|qc",count:(rxList.rxDataAccepted+rxList.rxDataQC),
        sCount:stockList.stockDataAccepted,access:"factory",stock:false},
      {title:"در حال تولید",status:"inproduction",count:rxList.rxDataInproduction,
        sCount:stockList.stockDataInproduction,access:"factory",stock:false},
      {title:"سفارشات تولید شده",status:"faktor",count:rxList.rxDataFaktor,
        sCount:stockList.stockDataFaktor,access:"factory",stock:false},
      {title:"در حال ارسال از کارخانه",status:"sending",count:rxList.rxDataSending,
      sCount:stockList.stockDataSending,access:"store&factory",stock:false},
      {title:"تحویل شده به انبار",status:"delivered",count:rxList.rxDataDelivered,
        sCount:stockList.stockDataDelivered,access:"store",stock:true},
      {title:"ارسال شده به فروشگاه",status:"storeSent",count:rxList.rxDataStoreSent,
        sCount:stockList.stockDataStoreSent,access:"store&shop",stock:false},
      {title:"ارسال به مشتری",status:"completed",count:rxList.rxDataCompleted,
        sCount:stockList.stockDataCompleted,access:"shop",stock:true},
      {title:"سفارشات نهایی",status:"completed",count:rxList.rxDataCompleted,
        sCount:stockList.stockDataCompleted,access:"manager",stock:true},
      {title:"سفارشات کنسل شده",status:"cancel",count:rxList.rxDataCancel,
        sCount:stockList.stockDataCancel,access:"factory",stock:true},
  ]

    //console.log(rxList)
    return(
        <><div className="rxStockTabHolder">
        {(token.access!=="factory")&&
        <div className={stockRX===1?"rxStockTab rxStockTabActive":"rxStockTab"} 
            onClick={()=>setStockRX(1)}>
            Stock
        </div>}
        {(token.access!=="saleStock")&&
        <div className={stockRX===0?"rxStockTab rxStockTabActive":"rxStockTab"} 
            onClick={()=>setStockRX(0)}>
            RX
        </div>}
    </div>
    <div className="profileHolder">
            {orderOptions.map((order,i)=>(
              (stockRX===0||order.stock)&&
                <div className={i===rxIndex?"profileItemActive profileItem":"profileItem"} key={i}
                  style={{backgroundColor:i===9?"coral":i===8?"lightGreen":"",
                    width:i===9?"44%":i===8?"44%":""}} 
                    onClick={()=>setIndex(i)}>
                    <div className="profileText">
                        <strong>{order.title}</strong>
                        <sub>{stockRX===1?(order.sCount?("Stock: "+order.sCount):''):
                          (order.count?("Rx: "+order.count):'')}
                        </sub>
                    </div>
                </div>
            ))}
        </div>
        <div className="profileOrderHolder">
            <ProfileOrderList setRefreshRate={setRefreshRate} status={orderOptions[rxIndex].status} setIndex={setIndex}
              rxIndex={rxIndex} manager="customer"  title={orderOptions[rxIndex].title} count={orderOptions[rxIndex].count}
              setStockRX={setStockRX} stockRX={stockRX}/>
        </div>
        </>
    )
}
export default ProfileSection1