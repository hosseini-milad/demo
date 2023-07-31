import env from "../env";
import { useEffect, useState } from "react";
import ProfileOrderList from "../ProfilePage/ProfileOrderList";
import Kharid from "./ManagerAction/Kharid";
import Shop from "./ManagerAction/Shop";
import AnbarList from "./ManagerAction/AnbarHeader";
import ShopStock from "./ManagerAction/ShopStock";
import GuranteeStock from "./ManagerAction/GuranteeStock";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function ManageSection1(){
    const [rxList,setRXList]= useState('');
    const [rxIndex,setIndex] = useState(-1)
    const [stockList,setStockList]= useState('');
    const [manager,setManager] = useState('')
    const [refreshRate,setRefreshRate] = useState(1)
    //console.log(rxIndex)
    const [stockRX,setStockRX]= useState(token.access!=="saleStock"?0:1)
    useEffect(()=>{
      if(refreshRate){
        setRXList('');
        const postOptions={
            method:'get',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
            'userId':token.userId}
          }
          fetch(env.siteApi+"/order/stockSeprate",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              //console.log(result);
              setStockList(result);
              //setStockList(result.stockData);
            },
            (error) => {
              window.location.href="/login";
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
        
          //console.log(postOptions)
          fetch(env.siteApi+"/order/rxSeprate",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result);
                setManager(result.userInfo)
                setRXList(result);
                //setStockList(result.stockData);
                setRefreshRate(0);
              },
              (error) => {
                window.location.href="/login";
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
          }
    },[refreshRate])
    useEffect(()=>{
      if(rxIndex>-1)window.scrollTo(0, 670)
  },[rxIndex])
    const orderOptions = [
        {title:"سفارشات ثبت شده",status:"inprogress",count:rxList.rxDataInprogress,
          sCount:stockList.stockDataInprogress,access:"manager",stock:true,rx:true},
        {title:"سفارشات تایید شده",status:"accept",count:rxList.rxDataAccepted,
          sCount:stockList.stockDataAccepted,access:"factory",stock:false,rx:true},
        {title:"تایید کارخانه",status:"qc",count:rxList.rxDataQC,
          sCount:stockList.stockDataQC,access:"factory",stock:false,rx:true},
        {title:"در حال تولید",status:"inproduction",count:rxList.rxDataInproduction,
          sCount:stockList.stockDataInproduction,access:"factory",stock:false,rx:true},
        {title:"سفارشات تولید شده",status:"faktor",count:rxList.rxDataFaktor,
          sCount:stockList.stockDataFaktor,access:"factory",stock:false,rx:true},
        {title:"در حال ارسال از کارخانه",status:"sending",count:rxList.rxDataSending,
        sCount:stockList.stockDataSending,access:"store&factory",stock:false,rx:true},
        {title:"تحویل شده به انبار",status:"delivered",count:rxList.rxDataDelivered,
          sCount:stockList.stockDataDelivered,access:"store",stock:true,rx:true},
        {title:"ارسال شده به فروشگاه",status:"storeSent",count:rxList.rxDataStoreSent,
          sCount:stockList.stockDataStoreSent,access:"store&shop",stock:true,rx:true},
        {title:"درخواست گارانتی",gurantee:"waitGu",count:rxList.rxDataWaitGu,
          sCount:stockList.stockDataWaitGu,access:"store&shop",stock:true,rx:false},
        {title:"چاپ گارانتی",gurantee:"printGu",count:rxList.rxDataPrintGu,
          sCount:stockList.stockDataPrintGu,access:"store&shop",stock:true,rx:false},
        {title:"ارسال به مشتری",status:"completed",count:rxList.rxDataCompleted,
          sCount:stockList.stockDataCompleted,access:"shop",stock:true,rx:true},
        {title:"سفارشات نهایی",status:"completed",count:rxList.rxDataCompleted,
          sCount:stockList.stockDataCompleted,access:"manager",stock:true,rx:true},
        {title:"سفارشات کنسل شده",status:"cancel",count:rxList.rxDataCancel,
          sCount:stockList.stockDataCancel,access:"factory",stock:true,rx:true},
    ]
    //console.log(rxStatus)
    //console.log(rxList)
    return(
        <>
        <div className="rxStockTabHolder">
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
              ((stockRX===0&&order.rx)||(stockRX===1&&order.stock))&&
              (order.access.includes(token.access)||token.access==="manager"||
                token.access==="sale"||token.access==="saleStock")&&
                <div className={(i===rxIndex?"profileItemActive":"")
                +(i<5?" profileItem smallItem":" profileItem")} key={i}
                    style={{backgroundColor:i===12?"coral":i===11?"lightGreen":"",
                            width:i===12?"44%":i===11?"44%":""}} 
                    onClick={()=>setIndex(i)}>
                    <div className="profileText">
                        <strong>{order.title}</strong>
                        <sub>{stockRX===1?(order.sCount?("Stock: "+order.sCount):''):
                          (order.count?("Rx: "+order.count):'')}</sub>
                    </div>
                </div>
            ))}
        </div>
        <div className="profileOrderHolder">
            {rxIndex!==-1?
            (rxIndex===5&&token.access==="store")?
            <div className="orderStepsHolder" style={{width: "70%",
            margin: "auto"}}>
              <AnbarList />
              {/*<Kharid status={orderOptions[rxIndex].status}/>*/}</div>:
              (stockRX===1&&rxIndex===8)?<GuranteeStock status="request"/>:
            (stockRX===1&&rxIndex===9)?<GuranteeStock status="printed"/>:
              (rxIndex===7&&(token.access==="shop"||token.access==="sale"||token.access==="saleStock"))?
              <div className="orderStepsHolder" style={{width: "70%",
            margin: "auto"}}>
                {stockRX===1?
                  <ShopStock status={orderOptions[rxIndex].status}/>:
                  <Shop status={orderOptions[rxIndex].status}/>}
                  </div>:
              <ProfileOrderList setRefreshRate={setRefreshRate} refreshRate={refreshRate}
                  title={orderOptions[rxIndex].title} manager={manager}
                  count={orderOptions[rxIndex].count} sCount={orderOptions[rxIndex].sCount}
                  rxIndex={rxIndex} status={orderOptions[rxIndex].status} setIndex={setIndex}
                  setStockRX={setStockRX} stockRX={stockRX}/>:
                ''}
        </div> 
        {/*<input type="text" placeholder="جستجوی جدید" onChange={(e)=>
        setRXList(rxList.filter(item=>item.rxOrderNo.includes(e.target.value)))}/>*/}
        </>
    )
}
export default ManageSection1