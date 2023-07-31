import BreadCrumb from "../Components/BreadCrumb";
import SimpleFetch from "../Components/simpleFetch";
import env, { orderStatus, normalPrice } from "../env";
import "../css/manage.css"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Paging from "../CategoryPage/Paging";
import DateShow from "./ProfileModules/DateShow";
import ProfileFiltersReport from "./ProfileModules/profileFiltersReport";
const token = JSON.parse(localStorage.getItem('token-lenz'));

function ProfileSection2(){
    //const manufactureList = SimpleFetch(env.siteApi+"/order/manufacture/list");
    
    const [perPage , setperPage]= useState("10")
    const [manResult,setManResult] = useState("")
    const [refreshTable,setRefreshTable] = useState(0)

    const [pageNumber,setPageNumber] = useState('')
    const [content,setContent] = useState('')
    useEffect(() => {
        const body={
            offset:pageNumber,
            pageSize:perPage,
            customer:manResult.customer,
            orderNo:manResult.orderNo,
            status:manResult.status,
            brand:manResult.brand,
            dateFrom:manResult.dateFrom,
            dateTo:manResult.dateTo,
            userId:token&&token.userId,
            access:"manager"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        fetch(env.siteApi + "/report/order",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent('')
          //console.log(result)
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[pageNumber,manResult,perPage,refreshTable])

    
    const options=["عملیات","مشتری","شماره سفارش","تاریخ","وضعیت","قیمت","برنـد",
            "متریال"];
    
    const PrintForm=()=>{
        console.log("prontForm")
    }
    return(
        <div className='orderTableHolder'>
            <div className="filters">
                <ProfileFiltersReport manufactureList={content} findState={orderStatus}
                setManResult={setManResult}/>
            </div>
            {/*<div className="ManyHolder" style={{float: "right"}}>
                <input style={{margin:"auto 10px",padding:"2px 10px",fontSize:"12px"}} className="orderTabOpti activeOptiTab" 
                    type="button" value="چاپ گزارش" onClick={PrintForm}/>
    </div>*/}
            <div className="perPage">
                <span>تعداد در صفحه: </span>
                <Autocomplete
                    options={["5","10","20","50"]} 
                    disableClearable freeSolo
                    style={{ width: "50px"}}
                    
                    value={perPage} 
                    onChange={(_event, Brand)=>{setperPage(Brand)}}
                    renderInput={(params) =>
                    <TextField {...params} />}
                />
            </div>
            <table className="orderTable stockTable">
            <tbody>
                <tr> 
                    {options.map((th,i)=>(
                    <th key={i}>{th}</th>))}
                </tr>
                {content&&content.filter&&content.filter.map((manItem,i)=>(
                    //console.log(manItem)||
                <tr key={i} onClick={()=>{}}>
                    <td onClick={(e)=>{window.open("/print/"+manItem.rxOrderNo,'_blank')}}
                    className="saveManager">مشاهده</td>
                    <td>{manItem.userInfo[0]&&manItem.userInfo[0].userName}</td>
                    <td>{manItem.rxOrderNo}</td>
                    <td><DateShow date={manItem.date}/></td>
                    <td>{orderStatus(manItem.status)}</td>
                    <td>{manItem.rxLenz&&normalPrice(manItem.rxLenz.split(',')[0])}</td>
                    <td>{manItem.brand}</td>
                    <td></td>
                </tr>
                ))}
                
            </tbody>
        </table>
        {content&&
        <Paging content={content} setPageNumber={setPageNumber} pageNumber={pageNumber} perPage={perPage}/>}
        </div>)
}
export default ProfileSection2
