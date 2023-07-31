import { useState } from "react";
import ButtonLoaderSimple from "../../../Components/BtnLoaderSimple";
import env, { CalcArray, normalPrice, sumPrice } from "../../../env";
import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect } from "react";
import SimpleAlert from "../../../Components/SimpleAlert";
import CalcOff from "./CalcOff";
import SingleOrder from "./SingleOrderTotal";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function StockFaktorPreview(props){
    const faktor = props.faktor&&props.faktor.cart;
    const priceState = props.faktor.priceState
    const [manager,setManager] = useState()
    const [selectedCustomer,setCustomer] = useState()
    const [align,setAlign] = useState('R')
    const [error,setError] = useState({message:"",color:"white"})
    const [count,setCount] = useState('')
    const [totPrice,setTotPrice] = useState([])
    const [sku,setSku] = useState('')
    const [faktorS,setFaktorS] = useState('')
    const [customerList,setCustomerList] = useState()
    const [alertShow,setAlertShow] = useState({show:false,action:0})
    //console.log(selectedCustomer)
    useEffect(()=>{
      if(alertShow.action)
        window.setTimeout(()=>document.location.href="/profile#orders",200)
    },[alertShow])
    useEffect(() => {
      const postSimple={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({customer:manager})
      }
      fetch(env.siteApi+"/report/customers",postSimple)
      .then(res => res.json())
      .then(
        (result) => {
          setCustomerList(result);
        },
        (error) => {
          console.log({error:error});
        }
      ) 
  },[manager])

    //useEffect(()=>{
    //    if(sku.length===7){
    //      setFaktor('')
    const addToCart=(e)=>{
      if(e.key === 'Enter'){
        if(!e.target.value){
          setError({message:'تعداد خالی است',color:"orange"});
          setTimeout(()=>setError(""),3000)
          return
        }
    const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({sku:sku,align:align,count:e.target.value})
          }
          //console.log(postOptions)
       fetch(env.siteApi + "/order/addCart",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.cart){
                props.setFaktor({})
                setTimeout(()=>props.setFaktor(result),100)
                props.setOrderCount(result.cart.length)
                setCount('')
                props.setSingleOrder(result.singleOrder)
                setError({message:`شناسه ${sku} اضافه شد`,color:"green"})
                setTimeout(()=>setError(""),3000)
                updateIndex("count")
            }
            else
            {setError({message:"آیتم وجود ندارد",color:"var(--main-hover)"})
            setTimeout(()=>setError(""),3000)}
        },
        (error) => {
          console.log(error);
        })
        setSku('')}
      }
    //},[sku])
console.log(faktor)
    const updateIndex=(field,fastSku)=>{
      //console.log(field,fastSku.length)
      const nextfield = document.querySelector(
        field==="user"?"#sku":
          field==="sku"&&fastSku&&fastSku.length===7?`#count`:
          field==="count"?`#sku`:"#sku"
        );
        // If found, focus the next field
        if (nextfield !== null) {
          setTimeout(()=>nextfield.focus(),200);
        }
  }

    const checkHesabfa=(cCode)=>{
      setCustomer('')
      if(cCode.length<2) return;
      const postOptions={
        method:'post',
        headers: { 
          'Content-Type': 'application/json',
          },
          body:JSON.stringify({cCode:cCode})
      }
      fetch(env.siteApi+"/report/userCode",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.customers.length===1){
              setCustomer(result.customers[0])
              updateIndex("user")
            }
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error)=>{
          console.log(error)
        })
    }
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
                store:faktor[i].store,
                discount:faktor[i].discount,
                count:faktor[i].count?faktor[i].count:"1",
                price:
                priceState&&priceState.paramValue==="active"?
                  faktor[i].stockDetail[0].price1:
                  faktor[i].stockDetail[0].price})
        }
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({...orderData,
                status:!status?"inprogress":"delivered",
                stockFaktor:standardFaktor,
                fromUser:selectedCustomer?selectedCustomer:''})
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/addStock",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setCustomer()
                clearCart();
                setAlertShow({show:true,action:0})
                if(result.hesabfaCode)
                window.open((token.phone==="09123778619"?"/hesabfishprint/":"/hesabprint/")
                  +result.hesabfaCode, "_blank")
                
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
        props.setFaktor('')
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
                props.setFaktor(result.cart);
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
            body:JSON.stringify({sku:item.sku,align:item.align,count:count?count:0})
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/editCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result)
                props.setSingleOrder(result.singleOrder)
                props.setFaktor(result)
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
                props.setFaktor(result.cart);
                props.setOrderCount(result.cart.length)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    }
    return(<>
    
        <div className="tableHolder">
        {token.access!=="customer"?<div className="orderFrom" 
                    style={{display: token.access!=="customer"?"flex":"none"}}>
                <TextField label="کد مشتری" onChange={(e)=>checkHesabfa(e.target.value)}/>
                {selectedCustomer?
                  <div className="userName">
                    <span>{selectedCustomer.cName}</span>
                    <sub>{selectedCustomer.cCode}</sub>
                  </div>:
                  <Autocomplete
                    options={(manager&&manager.length>1)?customerList&&customerList.customers:[]||[]}
                    getOptionLabel={item=>(
                      item.cName?item.cName:item.phone)||''}
                    style={{minWidth:"200px",margin: "0 10px 18px 20px"}}
                    onChange={(e,value)=>setCustomer(value)}
                    renderInput={(params) =>
                        <TextField {...params} label="نام مشتری" 
                        onChange={(e)=>setManager(e.target.value)}/>}
                    />}
                {/*selectedCustomer?<span className="orderBtn" >
                {" مشتری " +selectedCustomer}
                </span>:''*/}
                
                {props.singleOrder?props.showSingle?<SingleOrder brand={props.singleOrder}/>:
              <button className="orderBtn" onClick={()=>props.setStockPreviewTab(1)}>
                  سفارش تک</button>:<></>}
                </div>:<></>}
                
          <table className="orderTable stockTable rtl">
            <tbody>
                <tr>
                    <th className="mobileHide" style={{width:"20px"}}>ردیف</th>
                    <th>حذف</th>
                    <th style={{minWidth:"80px"}}>عدسی </th>
                    <th style={{width:"35px"}}>تعداد</th>
                    <th style={{minWidth:"100px"}}>برند</th>
                    <th>جهت</th>
                    <th>قیمت پایه</th>
                    <th>تخفیف</th>
                    <th>قیمت کل</th>
                </tr>
                {faktor&&faktor.map((faktorItem,i)=>(
                    faktorItem.stockDetail&&faktorItem.stockDetail[0]&&
                <tr key={i}>
                    <td className="mobileHide" onClick={()=>removeItem(faktorItem.sku)}>{i+1}</td>
                    <td className="deleteBtn" onClick={()=>removeItem(faktorItem)}>
                      <i className="icon-size fas fa-trash"></i>
                    </td>
                    {/*<td className="mobileHide" >{faktorItem.sku}</td>*/}
                    <td style={{direction: "ltr"}}>
                    <strong>SPH: </strong>{faktorItem.stockDetail[0].sph?(
                    faktorItem.stockDetail[0].sph):"0.00"}
                    <strong> | CYL: </strong>{faktorItem.stockDetail[0].cyl?(
                    faktorItem.stockDetail[0].cyl):"0.00"}
                    </td>
                    <td><input className="stockCountInput orderTableInput" type="text" defaultValue={faktorItem.count} 
                        onChange={(e)=>updateCount(faktorItem,e.target.value)}/></td>
                    <td dangerouslySetInnerHTML={{__html:"<strong>"+faktorItem.stockDetail[0].brandName+"</strong>"+
                        "-"+faktorItem.stockDetail[0].lenzIndex+"<br/>"+
                        ""+faktorItem.stockDetail[0].material+
                        (faktorItem.stockDetail[0].coating?"-"+faktorItem.stockDetail[0].coating:'')}}>
                    </td>
                    
                    <td dangerouslySetInnerHTML={{__html:(`<strong>${faktorItem.align}</strong>`)}} style={{direction: "ltr"}}></td>
                    <td style={{direction: "ltr"}} dangerouslySetInnerHTML={{__html:
                    (normalPrice(priceState&&priceState.paramValue==="active"?
                    faktorItem.stockDetail[0].price1:
                    faktorItem.stockDetail[0].price))}}></td>
                    {selectedCustomer?
                    <CalcOff user={selectedCustomer._id} calcTotalPrice={calcTotalPrice}
                      brand={faktorItem.stockDetail[0].brandName} count={faktorItem.count}
                      material={faktorItem.stockDetail[0].material}
                      setTotPrice={setTotPrice} index={i}
                      price={faktorItem.stockDetail[0].price}/>:<td>0</td>}
                    {selectedCustomer?'':<td style={{direction: "ltr"}}dangerouslySetInnerHTML={{__html:
                        calcTotalPrice(priceState&&priceState.paramValue==="active"?
                        faktorItem.stockDetail[0].price1:
                        faktorItem.stockDetail[0].price,faktorItem.count)}}></td>}
                    </tr>
                ))}
                <tr>
                  <td>*</td>
                  <td>+</td>
                  <td><TextField style={{width:"90%"}}  value={sku} id="sku"
              onChange={(e)=>{setSku(e.target.value);updateIndex("sku",e.target.value)}}/></td>
                  <td>
                  <TextField style={{width:"60px"}} id="count"
                value={count} onKeyDown={(e)=>addToCart(e)} onChange={(e)=>setCount(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                    <th colSpan={2}></th>
                    <th>تعداد کل</th>
                    <th>{props.faktor&&props.faktor.count}</th>
                    <th></th>
                    <th colSpan={2}>قیمت کل</th>
                    <th colSpan={2} style={{fontSize:"15px",fontWeight:"bold",direction:"rtl"}}>
                    {selectedCustomer?normalPrice(CalcArray(totPrice)):
                    normalPrice(totalPrice(faktor))} ریال</th>
                </tr>
            </tbody>
          </table>
          
        </div>
        <SingleOrder 
          setFaktorS={setFaktorS} faktorS={faktorS} 
          brand={"RIVO"}/>
        <div className="orderContinue" style={{float: "none"}}>
            {faktor&&faktor.length?<>
              {(token.access==="manager"||token.access==="sale"||token.access==="saleStock")?<></>:
                <ButtonLoaderSimple className="orderBtn"
                style={{float: "none"}} action={()=>updateOrderStatus(0)} popTitle="ثبت نهایی سفارش"
                    completed={()=>{}}//document.location.href="/profile#orders"}
                title={"ثبت نهایی سبد سفارشات"} popText={"آیا از ثبت سفارش اطمینان دارید؟"}
                orderFrom={selectedCustomer}/>}
                <button className="orderBtn warnBtn" onClick={clearCart}>خالی کردن سفارشات</button>
                </>:<> <div></div></>}
            {/*((token.access==="manager"||token.access==="sale")&&faktor&&faktor.length)?
            <ButtonLoaderSimple className={"orderBtn"} action={()=>updateOrderStatus(1)}
                style={{float: "none"}} completed={()=>setAlertShow({show: true,title:"تایید سفارش",
                text:"سفارش با موفقیت ثبت شد " ,
                nocancel:1,    part:""})}
                    title={"ثبت مستقیم سفارش"}/>:''*/}
            {((token.access==="manager"||token.access==="sale"||token.access==="saleStock")&&
            faktor&&faktor.length&&selectedCustomer)?
            <ButtonLoaderSimple className={"orderBtn"} action={()=>updateOrderStatus(1)}
                style={{float: "none",margin:"0 10px"}} //completed={()=>document.location.reload()}
                popText="در صورت تایید سفارش برای شما فاکتور نهایی صادر میشود
                 و در صورت انصراف میتوانید درخواست خود را اصلاح نمایید
                "   title={"ثبت مستقیم سفارش"}/>:''}
        </div>
        {token.access!=="customer"?<div style={{display:"flex",marginBottom:"20px"}}>
            {/*<Autocomplete
                options={["راست","چپ"]} 
                freeSolo
                style={{ width: "100px",margin:"auto 15px"}}
                defaultValue="راست"
                onChange={(e,value)=>setAlign(value==="راست"?"R":"L")}
                renderInput={(params) =>
                <TextField {...params} label="جهت"/>}
                />
            <TextField label="شناسه محصول" value={sku} id="sku"
              onChange={(e)=>{setSku(e.target.value);updateIndex("sku",e.target.value)}}/>
            <TextField style={{marginRight:"10px"}} label="تعداد" id="count"
                value={count} onKeyDown={(e)=>addToCart(e)} onChange={(e)=>setCount(e.target.value)}/>*/}
            <sub className="errorQuickAdd" style={{color:error&&error.color}}>
                {error&&error.message}</sub></div>:<></>}

            

        {0&&alertShow.show?<SimpleAlert data={{text:"سفارش با موفقیت ثبت شد"}}
           setAlertShow={setAlertShow} nocancel={1}/>:<></>}
        </>
    )
}
export default StockFaktorPreview