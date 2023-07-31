import { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb"
import SimpleFetch from "../Components/simpleFetch";
import env from "../env";
import HelpOrder from "../OrderPage/OrderModules/helpOrder";
import OrderTab from "../OrderPage/orderTab"
import StockFaktor from "../OrderPage/Stock/Stock02/StockFaktor";
import StockFaktorPreview from "../OrderPage/Stock/Stock02/StockFaktorPreview";
import StockStep01 from "../OrderPage/Stock/StockStep01";
import StockStep from "../OrderPage/Stock/StockStep01N"
import Login from "./Login";
const token = JSON.parse(localStorage.getItem('token-lenz'))
 
function Stock(){
    const [tabIndex,setTabIndex] = useState(0);
    //const stockPage = SimpleFetch(env.siteApi+"/product/brands")
    const params = SimpleFetch(env.siteApi+"/order/params")
    const [stockItem,setStockItem] = useState(0);
    const [faktor,setFaktor] = useState([]);
    const [stockPopUp,setStockPopUp] = useState(0)
    const [stockPreviewTab,setStockPreviewTab] = useState(0)
    //console.log(stockPopUp)
    
    const [count,setCount] = useState("1")
    const [quick,setQuick] = useState(0)
    const [orderCount,setOrderCount] = useState(0)
    useEffect(() => {
        window.scrollTo(0, 170);
    },[tabIndex])
    useEffect(()=>{
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          //console.log("postOptions")
          fetch(env.siteApi+"/order/getCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setFaktor(result)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    },[orderCount])
    //console.log(faktor)
    useEffect(()=>{
        const loginCheck={
            method:'get',
            headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          }
          fetch(env.siteApi+'/auth/welcome',loginCheck)
          .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
              },
              (error) => {
                localStorage.removeItem("token-lenz");
                document.location.href="/login"
              }
            )
            .catch((error)=>{
              console.log(error);
              localStorage.removeItem("token-lenz");
                document.location.href="/login"
            })
    },[])
    useEffect(() => {
        if(!stockItem) return
        var index = faktor.length;
        !quick&&setStockPopUp(1)
        setFaktor(existingItems => {
        return [
        ...existingItems.slice(0, index),
        stockItem,
        ...existingItems.slice(index + 1),
        ]
    })
    window.scrollTo(0, 110);
    },[stockItem])
    //if(token&&(token.access==="manager"||token.access==="customer"))
    return(
    <main className="pagesMain">
       <div className="mainOrder"> 
            
             {token?(token.access==="customer"||token.access==="manager"
              ||token.access==="sale"||token.access==="saleStock")?
             <><div className="orderHolder">
             <div className="orderStepsHolder">
                <div className='innerSeprator'>
                    <div className={stockPreviewTab===0?'stockResultTab innerHeader':'innerHeader'} style={{left:"auto"}}
                        onClick={()=>setStockPreviewTab(0)}>سفارش استوک {orderCount>0&&
                          <small style={{backgroundColor:(orderCount%2)?"":"var(--main-color)"}}>{orderCount}</small>}</div>
                    <div className={stockPreviewTab===1?'stockResultTab stockSecond innerHeader':'stockSecond innerHeader'} 
                        onClick={()=>setStockPreviewTab(1)}>سفارش تکی </div>
                    {stockPreviewTab===0?<>
                    {params&&<StockStep setTabIndex={setTabIndex} setOrderCount={setOrderCount} orderCount={orderCount}
                        setCount={setCount} setStockPopUp={setStockPopUp} setQuick={setQuick}
                        faktor={faktor} setStockPreviewTab={setStockPreviewTab}
                        params={params} stockItem={stockItem} setStockItem={setStockItem}/>}</>:
                        <>
                      {params&&<StockStep setTabIndex={setTabIndex} setOrderCount={setOrderCount} orderCount={orderCount}
                          setCount={setCount} setStockPopUp={setStockPopUp} setQuick={setQuick}
                          faktor={faktor} singleOrder={true}
                          params={params} stockItem={stockItem} setStockItem={setStockItem}/>}</>
                    }
                    </div>
                </div>
            </div>
            <div style={{display:stockPopUp?"block":"none"}}>
                <StockFaktor faktor={faktor} setFaktor={setFaktor} setOrderCount={setOrderCount} orderCount={orderCount}
                 setStockPopUp={setStockPopUp} setStockPreviewTab={setStockPreviewTab}/>
            </div></>:<HelpOrder />:<div className="loginText"><Login /></div>}

        </div>
    </main>
    )
    /*else
    return(<main style={{padding:"200px 20px",textAlign:"center"}}><h2>به زودی</h2></main>)*/
}
export default Stock
