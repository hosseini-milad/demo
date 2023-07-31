import {useState, useEffect } from "react";
function SimpleFetch(apiUrl,body){
  
    const [item, setItem] = useState('')
    const postOptions={
      method:body?'post':'get',
      headers: { 
        'Content-Type': 'application/json' ,
        'Access-Control-Allow-Origin':'*'},
        body:  body&&body
    }
    useEffect(()=>{
    !item&&fetch(apiUrl,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setItem(result)
          //body&&console.log(result)
        },
        (error) => {
          console.log(error);
        }
      )});
      return (item&&item)
    }
export default SimpleFetch