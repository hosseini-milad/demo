import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";

function OrderStep01(props){
    const defaultData = props.def;
    const [manager,setManager] = useState()
    const [selectedCustomer,setCustomer] = useState()
    const [customerList,setCustomerList] = useState()
    
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
    const changeUser=()=>{
        const postOptions={
        method:'post',
        headers: { 
            'Content-Type': 'application/json'},
            body:JSON.stringify({phone:selectedCustomer , manager:props.token.userId})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/auth/loginmanager",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                localStorage.removeItem('token-lenz');
                localStorage.setItem('token-lenz',JSON.stringify(
                    {"token":result.token,
                    "manager":props.token.userId,
                    "access":result.access,
                    "phone":props.userInfo.mobile,
                    "userId":result._id}));
                setTimeout(()=>window.location.reload(),500);
            },
            (error) => {
            console.log(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className="orderStepsHolder">
            {/*<div className="orderHeader">
                <span>سفارش دهنده: {props.userInfo} 
                    <a className="editUserInfo" href="/profile#account"><sub>ویرایش</sub></a></span>
    </div> */}
            <div className="orderDataHolder">
                    <h2> به MGM خوش آمدید</h2>
                <div className="dataOrderField">
                    <TextField variant="outlined"
                    value={props.userInfo?props.userInfo.userName:
                        props.userRaw.cName}
                    disabled={true}
                    label="سفارش دهنده(نام فروشگاه)"
                    style={{width:"275px",marginLeft:"20px",marginBottom:"20px"}}/>
                    <a href="/profile#account" className="editUserInfo">ویرایش اطلاعات کاربری</a>
                    <TextField variant="outlined"
                    value={props.userInfo&&props.userInfo.mobile?
                        props.userInfo.mobile:props.userRaw&&props.userRaw.phone||''}
                    label="شماره تماس"
                style={{width:"275px"}}/>
                
                <TextField variant="outlined"
                    value={props.userInfo&&props.userInfo.meliCode?props.userInfo.meliCode:
                        props.userRaw&&props.userRaw.activity||''}
                    label="آدرس پستی"
                style={{width:"275px",marginRight:"20px"}}/>
                    {/*<TextField variant="outlined"
                    value={consumer||''}
                    onChange={(e)=>setConsumer(e.target.value)}
                    label="نام و نام خانوادگی مصرف کننده"
style={{width:"275px"}}/>*/}
                </div>
                <br/>
                {props.token.access!=="customer"?<div className="orderFrom" 
                    style={{display: props.token.access!=="customer"?"flex":"none"}}>
                <Autocomplete
                    options={(manager&&manager.length>1)?customerList&&customerList.customers:[]||[]}
                    getOptionLabel={item=>(item.cName?item.cName:item.phone)||''}
                    style={{minWidth:"50%",margin: "0 0 20px 20px"}}
                    onChange={(e,value)=>setCustomer(value.phone)}
                    renderInput={(params) =>
                        <TextField {...params} label="سفارش از طرف" variant="outlined" 
                        onChange={(e)=>setManager(e.target.value)}/>}
                    />
                {selectedCustomer?<input type="button" className="orderBtn" value={" تغییر به مشتری " +selectedCustomer }
                    onClick={()=>changeUser()}/>:''}
                </div>:<></>}
                <br/>
                <div className="orderContinue">
                    <input type="button" className="orderBtn" value="ادامه" 
                    onClick={()=>{props.setTabIndex(1);window.location.href="/order/rx#lenzDetail"
                        props.saveState({"status":"initial","lastIndex":1})}}/>
                    {/*<small className="preBtn" onClick={()=>{}} >انصراف</small>*/}
                </div>
            </div>
        </div>

    )
}
export default OrderStep01