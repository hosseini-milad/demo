import { useEffect, useState } from "react";
import env from "../env";
import UserPlaceHolder from "./ManageModules/UserPlaceHolder";

function ManageCustomers(){
    const [userList,setUserList] = useState('')
    useEffect(()=>{
        const postOptions={
            method:'get',
            headers: { 
              'Content-Type': 'application/json'}
          }
          fetch(env.siteApi+"/userOrders",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setUserList(result);
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    },[])
    console.log(userList)
    return(
        <div className="profileOrderHolder">
        <h1></h1>
            {userList&&userList.map((user,i)=>(
                    <UserPlaceHolder user={user} key={i}/>
            ))}
        </div>
    )
}
export default ManageCustomers