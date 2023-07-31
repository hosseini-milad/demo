import { useState,useEffect} from "react";
import env, { normalPrice, sumPrice } from "../../../env";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function StockFaktor(props){
    const [faktor,setFaktor] = useState();
    const [alertShow,setAlertShow] = useState({show:false,action:0})
    const [sku,setSku] = useState('')
    const [align,setAlign] = useState("R")
    const [error,setError] = useState('')+0
    useEffect(()=>{
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
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    },[])

    useEffect(()=>{
        if(sku.length===7){

        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({sku:sku,align:align,count:"1"})
          }
          //console.log(postOptions)
       fetch(env.siteApi + "/order/addCart",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.cart){
                setFaktor(result.cart)
                props.setOrderCount(result.cart.length)
            }
            else
            {setError("آیتم وجود ندارد")
            setTimeout(()=>setError(""),3000)}
        },
        (error) => {
          console.log(error);
        })
        setSku('')}
    },[sku])
    const updateOrderStatus=(status)=>{
        const orderData ={stockOrderNo:("S"+Date.now().toString().substring(7,12))
            ,stockOrderPrice:totalPrice(faktor)}
        var standardFaktor=[]
        //console.log(faktor)
        for(var i =0;i<faktor.length;i++){
            //console.log(faktor[i])
            faktor[i].stockDetail[0]&&
            standardFaktor.push({
                sku:faktor[i].sku,
                hesabfa:faktor[i].stockDetail[0].hesabfa,
                align:faktor[i].align,
                count:faktor[i].count?faktor[i].count:"1",
                price:faktor[i].stockDetail[0].price})
        }
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({...orderData,status:!status?"inprogress":"completed",stockFaktor:standardFaktor})
          }
          console.log(postOptions)
          fetch(env.siteApi+"/order/addStock",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result)
                clearCart();
                window.setTimeout(()=>document.location.href="/profile#orders",600)
              },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    }
    const removeItem=(item)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({sku:item.sku,align:item.align})
          }
          fetch(env.siteApi+"/order/removeCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setFaktor(result.cart);
                props.setOrderCount(result.cart.length)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    }
    const updateCount=(item,count)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({sku:item.sku,align:item.align,count:count})
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/editCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setFaktor(result.cart)
              },
              (error) => {
               console.log({error:error.message});
              }
        );

    }
    const calcTotalPrice=(price,count,morePrice,align)=>{
        
        var rawPrice =[0,0];
        try{rawPrice[0] = (parseInt(price)
            *(count[0]?count[0]:1))}catch{}
        try{rawPrice[1] = (parseInt(morePrice)
            *(count[1]?count[1]:1))}catch{}
        return((rawPrice[0]?normalPrice(rawPrice[0]):'')+
            (align?"<hr/>":"")+
            (rawPrice[1]?normalPrice(rawPrice[1]):''))
    }
    const totalPrice=(item)=>{
        //console.log(item)
        if(!item)return
        var totalPrice =0;
        for(var i =0;i<item.length;i++){
            totalPrice= item[i].stockDetail[0]&&item[i].stockDetail[0].price?
            sumPrice(totalPrice+"+"+(item[i].count*item[i].stockDetail[0].price)):totalPrice;
        }
        return(totalPrice)
    }
    const clearCart=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          console.log(postOptions)
          fetch(env.siteApi+"/order/removeCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setFaktor(result.cart);
                props.setOrderCount(result.cart.length)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    }
    return(
        <div className="tableHolder">
          <table className="orderTable stockTable rtl">
            <tbody>
                <tr>
                    <th style={{width:"20px"}}>ردیف</th>
                    <th style={{width:"35px"}}>کد</th>
                    <th>برند</th>
                    <th style={{minWidth:"100px"}}>عدسی </th>
                    <th>جهت</th>
                    <th style={{width:"35px"}}>تعداد</th>
                    <th>قیمت واحد</th>
                    <th>تخفیف واحد</th>
                    <th>قیمت کل</th>
                    <th>حذف</th>
                </tr>
                {faktor&&faktor.cart.map((faktorItem,i)=>(
                    faktorItem.stockDetail&&faktorItem.stockDetail[0]&&
                <tr key={i}>
                    <td onClick={()=>removeItem(faktorItem.sku)}>{i+1}</td>
                    <td >{faktorItem.sku}</td>
                    
                    <td dangerouslySetInnerHTML={{__html:"<strong>"+faktorItem.stockDetail[0].brandName+"</strong>"+
                        "-"+faktorItem.stockDetail[0].lenzIndex+"<br/>"+
                        ""+faktorItem.stockDetail[0].material+"-"+
                        (faktorItem.stockDetail[0].coating&&faktorItem.stockDetail[0].coating)}}>
                    </td>
                    <td dangerouslySetInnerHTML={{__html:
                    (faktorItem.stockDetail[0].sph?"<strong>SPH: </strong>"+faktorItem.stockDetail[0].sph
                        +" | <strong>CYL: </strong>"+faktorItem.stockDetail[0].cyl:'')}} style={{direction: "ltr"}}></td>
                    <td dangerouslySetInnerHTML={{__html:(`<strong>${faktorItem.align}</strong>`)}} style={{direction: "ltr"}}></td>
                    <td>{faktorItem.count&&<input className="stockCountInput orderTableInput" type="text" defaultValue={faktorItem.count} 
                        onChange={(e)=>updateCount(faktorItem,e.target.value)}/>}</td>
                    <td style={{direction: "ltr"}} dangerouslySetInnerHTML={{__html:
                    (normalPrice(faktorItem.stockDetail[0].price))}}></td>
                    <td style={{direction: "ltr"}}>
                      {normalPrice(faktorItem.stockDetail[0].price)}</td>
                    <td style={{direction: "ltr"}}dangerouslySetInnerHTML={{__html:
                        calcTotalPrice(faktorItem.stockDetail[0].price,faktorItem.count)}}></td>
                    <td className="deleteBtn" onClick={()=>removeItem(faktorItem)}>×</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={5}></td>
                    <td>قیمت کل</td>
                    <td colSpan={3} style={{fontSize:"15px",fontWeight:"bold"}}>{normalPrice(totalPrice(faktor))} ریال</td>
                </tr>
            </tbody>
          </table>
        <div className="orderContinue" style={{float: "none"}}>
            <input type="button" className="orderBtn" value="مشاهده سبد سفارشات" 
            style={{margin:"auto"}} onClick={()=>{props.setStockPopUp(0);props.setStockPreviewTab(1)}}/>
            <input type="button" className="orderBtn" value="ادامه ثبت سفارش" 
            style={{margin:"auto"}} onClick={()=>props.setStockPopUp(0)}/>
        </div>
        </div>
    )
}
export default StockFaktor