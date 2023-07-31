import React, { useState } from "react";
import { useEffect } from "react";
import SimpleAlert from "./SimpleAlert";
import persianDate from 'persian-date';

function ButtonLoader(props){
  persianDate.toCalendar('persian');
  const [title,setTitle]= useState(props.title);
  const [alertShow,setAlertShow] = useState({show:false,action:0})
  //console.log(props.price)
  const changeAction=()=>{
    title!=="در حال ثبت ..."&&
    setAlertShow({show: true,title:"تایید سفارش",
    text:"سفارش شما با موفقیت انجام شد . تا نیم ساعت میتوانید سفارش خود را اصلاح نمایید . پس از این مدت سفارش شما نهایی شده و امکان کنسلی و یا تغییر وجود ندارد " ,
      part:""})
    
    //
  }
  const createRXNo=()=>{
    const pDate = new persianDate(new Date()).toLocale('en').format();
    return("R"+pDate.split('-')[0]%10+Date.now().toString().substring(7, 12))
  }
  createRXNo()
  useEffect(()=>{
    if(alertShow.action){
      setTitle("در حال ثبت ...");
      props.saveState({status:"inprogress",
        rxOrderNo:createRXNo(), fromUser:props.selectedCustomer,
        totalPrice:props.price,totalDiscount:props.discount})
        
      //setTitle("سفارش با موفقیت ثبت شد.");
    //setTimeout(()=>window.location.href="/order/rx",3000)
  }
    else{
      setTitle("ثبت درخواست");
    }
  },[alertShow.action])
  return(
    /*<button onClick={()=>{props.saveState({status:"inprogress",rxOrderNo:("MGMRX1401"+Date.now())});
                        setTimeout(()=>window.location.href="/profile#orders",2000)}}>
    </button>*/
    <>
      <button className={props.className} onClick={changeAction}>{title}</button>
      {alertShow.show?<SimpleAlert data={alertShow} setAlertShow={setAlertShow}/>:''}
    </>
  )
}
export default ButtonLoader