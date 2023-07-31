import React, { useState } from "react";

function ButtonLoaderSimple(props){
  const [title,setTitle]= useState(props.title)
  const [doAction,setDoAction]= useState(props.doAction)
  const changeAction=()=>{
    setTitle("در حال ثبت ...");
    props.action()
    doAction&&props.completed();
  }
  return(
    <button className={props.className} onClick={changeAction}>{title}</button>
  )
}
export default ButtonLoaderSimple