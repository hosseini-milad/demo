
import env, { filterResult, normalPrice, orderStatus } from "../env";
import "../css/manage.css"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Filters from "./filters";
import Paging from "../CategoryPage/Paging";
import FiltersReport from "./filtersReport";
import DateShow from "../ProfilePage/ProfileModules/DateShow";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function ManageReport(){
    //const manufactureList = SimpleFetch(env.siteApi+"/order/manufacture/list");
    
    const [perPage , setperPage]= useState("10")
    const [manResult,setManResult] = useState("")
    const [refreshTable,setRefreshTable] = useState(0)
    const [orderList,setOrderList] = useState([])
    const [pageNumber,setPageNumber] = useState('')
    const [content,setContent] = useState('')
    //console.log(content)
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
            const listArray = result.filter.map(item=>item.rxOrderNo)
          //console.log(listArray)
            setOrderList(listArray)
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )
    window.scrollTo(0, 270);},[pageNumber,manResult,perPage,refreshTable])

    useEffect(() => {
        setPageNumber('')
    },[manResult])
    const options=["عملیات"," ","مشتری","شماره سفارش","تاریخ","وضعیت","قیمت","برنـد",
            "توضیحات"];
    return(
        <div className='orderTableHolder'>
            <div className="filters">
                <FiltersReport manufactureList={content} findState={orderStatus}
                setManResult={setManResult} manResult={manResult}/>
            </div>
            {/*<div className="ManyHolder" style={{float: "right"}}>
                <input style={{margin:"auto 10px",padding:"2px 10px",fontSize:"12px"}} className="orderTabOpti activeOptiTab" 
                    type="button" value="چاپ گزارش" onClick={PrintForm}/>
    </div>*/}
            <div className="perPage">
                <div className="dateOrder" style={{position:"absolute", right:"30px"}}>
                {token.access==="manager"?<span>سفارش ثبت شده:  {content.todayOrder}</span>:<></>}
                    <button className="orderTabOpti activeOptiTab filterDate" onClick={()=>
                    window.location.href="/printmultiple/"+orderList.toString()}
                    style={{margin:"0px 15px"}}>چاپ سفارشات</button>
                </div>
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
                    <td width={"60px"} onClick={(e)=>{window.open("/print/"+manItem.rxOrderNo,'_blank')}}
                    className="saveManager"><i className="icon-size fas fa-eye"></i></td>
                    <td width={"60px"} onClick={(e)=>{window.open("/status/"+manItem.rxOrderNo,'_blank')}}
                    className="saveManager"><i className="icon-size fas fa-history"></i></td>
                    <td width={"150px"}>{(manItem.userInfo[0]&&(manItem.userInfo[0].cName?
                    manItem.userInfo[0].cName:manItem.userInfo[0].phone))}</td>
                    <td width={"100px"}>{manItem.rxOrderNo}</td>
                    <td style={{width:"150px",whiteSpace:"nowrap"}}><DateShow date={manItem.date}/></td>
                    <td width={"100px"}>{orderStatus(manItem.status)}</td>
                    <td width={"100px"}>{manItem.totalPrice&&normalPrice(manItem.totalPrice)}</td>
                    <td width={"100px"}>{manItem.brand}</td>
                    <td>{manItem.moreInformation}</td>
                </tr>
                ))}
                
            </tbody>
        </table>
        {content&&
        <Paging content={content} setPageNumber={setPageNumber} pageNumber={pageNumber} perPage={perPage}/>}
        </div>)
}
export default ManageReport