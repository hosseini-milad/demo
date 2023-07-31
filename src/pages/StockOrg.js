import { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb"
import SimpleFetch from "../Components/simpleFetch";
import env from "../env";
import HelpOrder from "../OrderPage/OrderModules/helpOrder";
import OrderTab from "../OrderPage/orderTab"
import StockStep01 from "../OrderPage/Stock/StockStep01";
import StockStep02 from "../OrderPage/Stock/StockStep02";
import StockStep03 from "../OrderPage/Stock/StockStep03";
import StockTab from "../OrderPage/Stock/stockTab";
import Login from "./Login";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function Stock(){
    const [tabIndex,setTabIndex] = useState(0);
    //const stockPage = SimpleFetch(env.siteApi+"/product/brands")
    const params = SimpleFetch(env.siteApi+"/order/params")
    const [stockItem,setStockItem] = useState(0)
    const [count,setCount] = useState("1")
    useEffect(() => {
        window.scrollTo(0, 170);
    },[tabIndex])
    return(
    <main className="pagesMain">
        {/*<BreadCrumb data={[
            {link:"/",label:" خانه / "},
            {link:"/order",label:"سفارش آنلاین / "},
            {link:"#",label:" عدسی سفارشی Stock "},
            ]}/>*/}
       <div className="mainOrder"> 
            {tabIndex!==10&&<StockTab setTabIndex={setTabIndex} index={tabIndex} />}

             {token?token.access==="customer"?<div className="orderHolder">
                {tabIndex === 0&&params&&<StockStep01 setTabIndex={setTabIndex} //brands={stockPage}
                    setCount={setCount}
                    params={params} stockItem={stockItem} setStockItem={setStockItem}/>}
                {tabIndex === 1&&<StockStep02 setTabIndex={setTabIndex} stockItem={stockItem} count={count}/>}
                {tabIndex === 2&&params&&<StockStep03 setTabIndex={setTabIndex}  params={params}
                    count={count} setCount={setCount} stockItem={stockItem} setStockItem={setStockItem}/>}
            </div>:<HelpOrder />:<div className="loginText"><Login /></div>}
        </div>
    </main>
    )
}
export default Stock