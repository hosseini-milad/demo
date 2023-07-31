import { useEffect, useState } from "react";
import StockResult from "./StockResultFinal";
import env, { normalPrice } from "../../env";
import BrandHolderStock from "./Stock01/BrandHolderStock";
import ODOSStock from "../OrderModules/ODOSStock";
import BrandHolderStockMobile from "./Stock01/BrandHolderStockMobile";
import ODOSStockMobile from "../OrderModules/ODOSStockMobile";
import StockFaktorPreview from './Stock02/StockFaktorPreview';
import SingleOrder from './Stock02/SingleOrder';
import StockFaktorSingle from './Stock02/StockFaktorSingle';
const wWidth= window.innerWidth;
const token = JSON.parse(localStorage.getItem('token-lenz'))

function StockStep(props){
    const [mainValue,setMainValue] = useState([,,,,,]);
    const [mainLeft,setMainLeft] = useState([,,,,,])
    const [faktor,setFaktor] = useState([]);
    const [brandFilter,setBrandFilter]= useState("")
    const [singleOrder,setSingleOrder] = useState(0);
    const [content,setContent]= useState(0)
    const [odCount,setODCount] = useState([1,1]);
    const [refresh,setRefresh] = useState(0)
    //console.log(content)
    useEffect(() => {
        //console.log(content)
        setContent('')
        const body={
            brand:brandFilter&&brandFilter.brandName,
            lenzIndex:brandFilter&&brandFilter.lenzIndex,
            material:brandFilter&&brandFilter.material,
            coating:brandFilter&&brandFilter.coating,

            osSph:mainValue[0],
            osCyl:mainValue[1],
            odSph:mainLeft[0],
            odCyl:mainLeft[1],
            //dia:mainValue[2]?mainValue[2]:'',
            //add:mainValue[3]?mainValue[3]:'',
            //price:price,
            sort:"lenzIndex",
            sortAsc:"1"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/order/stock/list",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            
            //if(result.size===1)saveCart
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[brandFilter,mainValue,mainLeft])
    useEffect(() => {
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/getCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setFaktor(result)
                setSingleOrder(result.singleOrder)
                props.setOrderCount(result.cart.length)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    },[props.orderCount])
    useEffect(() => {
        if(refresh===1){
            setMainValue([,,,,,]);
            setMainLeft([,,,,,]);
            setContent(0);
            setBrandFilter("");
            setRefresh(0);
        }
    },[refresh])
    return(<>
        <div className='stockMainHolder' style={{display:"grid"}}>
            {!refresh?<div className="orderDataHolder">
            {wWidth>700?<>
                <ODOSStock params={props.params} setMainValue={setMainValue} showSingle={props.singleOrder} 
                    showAll={faktor.cart&&faktor.cart.filter(item=>item.align==="R").length?true:false}
                    mainValue={mainValue} title="R" setCount={setODCount} count={odCount}/>
                <ODOSStock params={props.params} setMainValue={setMainLeft} showSingle={props.singleOrder} 
                    showAll={faktor.cart&&faktor.cart.filter(item=>item.align==="L").length?true:false}
                    mainValue={mainLeft} title="L" setCount={setODCount} count={odCount}/></>:
                <>
                <ODOSStockMobile params={props.params} setMainValue={setMainValue} showSingle={props.singleOrder}
                    mainValue={mainValue} title="R" setCount={setODCount} count={odCount}/>
                <ODOSStockMobile params={props.params} setMainValue={setMainLeft} showSingle={props.singleOrder}
                    mainValue={mainLeft} title="L" setCount={setODCount} count={odCount}/>
                    </>}
                
                {content?wWidth>700?<BrandHolderStock setBrandFilter={setBrandFilter} brandFilter={brandFilter}
                    content = {content} /*brandSingle={props.singleOrder?["KODAK"]:''}*//>:
                    <BrandHolderStockMobile setBrandFilter={setBrandFilter} brandFilter={brandFilter}/>:<></>}
                
            </div>:<span>در حال آپدیت</span>}
            <StockResult setStockItem={props.setStockItem} mainValue={mainValue}
                content={content} count={odCount} setRefresh={setRefresh}
                orderCount={props.orderCount} setOrderCount={props.setOrderCount}/>
        </div>
        {props.singleOrder?<StockFaktorSingle faktor={faktor} setFaktor={setFaktor}
            singleOrder={singleOrder} setSingleOrder={setSingleOrder} showSingle={props.singleOrder}
            setOrderCount={props.setOrderCount} orderCount={props.orderCount}/>
        :<StockFaktorPreview faktor={faktor} setFaktor={setFaktor} setStockPreviewTab={props.setStockPreviewTab}
            singleOrder={singleOrder} setSingleOrder={setSingleOrder} showSingle={props.singleOrder}
            setOrderCount={props.setOrderCount} orderCount={props.orderCount}/>}
        </>
    )
}
export default StockStep