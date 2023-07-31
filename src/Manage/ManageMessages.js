
import env, { filterResult, normalPrice, removeNull } from "../env";
import "../css/manage.css"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Paging from "../CategoryPage/Paging";
import DateShow from "../ProfilePage/ProfileModules/DateShow";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function ManageMessages(props){
    //const manufactureList = SimpleFetch(env.siteApi+"/order/manufacture/list");
    const logs = props.logs
    const [update,setUpdate]= useState(1)
    
    //console.log(token.access)
    
    const updateUser=(userId,logId)=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
                userid:userId
            },
            body:JSON.stringify({access:"customer",hesabfa:"new"})
        }
        const logOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({id:logId,status:"done",kind:token.access})
            }
        //console.log(logOptions)
        fetch(env.siteApi + "/user/edit",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            result&&fetch(env.siteApi + "/setting/log/update",logOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setTimeout(()=>window.location.reload(),1000)
            }
            )
        },
        (error) => {
            console.log(error);
        })
        
    }
    const updateLog=(logId,status)=>{
        const logOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({id:logId,status:status,kind:token.access})
            }
        fetch(env.siteApi + "/setting/log/update",logOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setTimeout(()=>window.location.reload(),1000)
        },
        
        (error) => {
            console.log(error);
        })
    }
    return(
        <div className="favHolder">
            <h2 className="profileTitle">پیام ها</h2>
            <small className="more">{"مشاهده همه ->"}</small>
            <hr/>
            {logs&&logs.log.map((log,i)=>(
              <div className="messageHolder" key={i}>
                <div className="messageHeader">
                    <span>موضوع پیام: {log.title}</span>
                    <DateShow date={log.date}/>
                </div>
                <div className="messageBody">
                    <span>{log.description}</span>
                    <div className="messageBtnHolder">
                        <input type="button" className="orderBtn messageBtn" 
                            value={update?"تایید کاربر جدید" :"در حال ثبت"}
                            onClick={()=>{update&&updateUser(log.user,log._id);setUpdate(0)}}/>
                        {/*<div style={{display:"grid"}}>
                        <TextField variant="outlined"
                            value={consumer||''}
                            onChange={(e)=>{}}
                            label="کد مشتری قدیمی" />
                            <input type="button" className="orderBtn messageBtn" value="کاربر قدیمی" 
                            onClick={()=>updateUser(log.user,log._id)}/>
            </div>*/}
                        <input type="button" className="orderBtn messageBtn" value="مشاهده اطلاعات کاربر" 
                        onClick={()=>window.location.href=("/customer/"+log.phone)}/>
                    </div>
                </div>
                <div className="messageIconHolder">
                    <div className="messageIcon">
                        <span onClick={()=>updateLog(log._id,"delete")}>حذف پیام</span>
                        <i className="icon-size fas fa-remove"></i>
                    </div>
                </div>
              </div>
            ))}
        </div>
    )
}
export default ManageMessages