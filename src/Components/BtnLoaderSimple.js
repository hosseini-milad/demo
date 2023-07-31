import React, { useEffect, useState } from "react";
import SimpleAlert from "./SimpleAlert";

function ButtonLoaderSimple(props){
  const [alertShow,setAlertShow] = useState({show:false,action:0})
  const [title,setTitle]= useState(props.title)
  //console.log(alertShow)
  useEffect(()=>{
    //console.log(alertShow)
    if(alertShow.action){props.action();
      setTitle("در حال ثبت ...");
      window.setTimeout(()=>props.completed(),1500)
    }
},[alertShow])
  const changeAction=()=>{
    setAlertShow({show:true,action:0,text:props.popText,title:props.popTitle})
  }
  return(<>
    <button className={props.className} onClick={changeAction}>{title}</button>
    {alertShow.show?<SimpleAlert data={alertShow} setAlertShow={setAlertShow}/>:<></>}
    </>
  )
}
export default ButtonLoaderSimple