import {useState, useEffect } from "react";
function SimpleAuth(apiUrl,post){
    const [item, setItem] = useState('')
    var token = JSON.parse(localStorage.getItem('token-lenz'));
    var mobile='';
    var userId='';
    if(token !== null){
      mobile=token.mobile;
      userId= token.userId;
      token = token.token;
    }
    const postOptions={
      method:post?'post':'get',
      headers: { 'Content-Type': 'application/json' ,
      "x-access-token": token,
      "userId":userId}
    }
    
    useEffect(()=>{
    !item&&fetch(apiUrl,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setItem(result)
        },
        (error) => {
          setItem({error:error.message});
        }
      )});
      return (item&&item)
    }
export default SimpleAuth