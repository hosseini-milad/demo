
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import ProfileOrderItem from "./ProfileOrderItem";
import ProfileStockItem from "./ProfileStockItem";
import { useEffect } from "react";
import env from "../env";
import Paging from "../CategoryPage/Paging";
const token = JSON.parse(localStorage.getItem('token-lenz'))
function ProfileOrderList(props){
    //const [rxList,setRXList] = useState(''); 
    const [searchText,setSearch]=useState(0) 
    const [searchTrigger,setSearchTrigger]=useState(0)
    const stockList = props.stockList;
    const [searchList,setSearchList] = useState()
    const [searchStockList,setSearchStockList] = useState()
    const [pageNumber,setPageNumber] = useState('')
    const [cancelList,setCancelList] = useState('')

    //console.log(searchList)
    
    useEffect(()=>{
      //if(!searchTrigger)return
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
            'userId':token.userId},
            body:JSON.stringify({status:searchText?'':props.stockRX===2?"cancel":props.status,
                search:searchText,offset:pageNumber,
                userId:(token.access==="customer"||!token.access)?token.userId:''})
          }
          fetch(env.siteApi+"/order/rxSeprate/search",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                if(searchText){
                    var index = 0;
                    if(result[0]&&result[0].status==="inprogress")index=0;
                    if(result[0]&&result[0].status.includes("accept")||
                    result[0]&&result[0].status.includes("qc"))index=1;
                    if(result[0]&&result[0].status==="inproduction")index=3;
                    if(result[0]&&result[0].status==="faktor")index=4;
                    if(result[0]&&result[0].status==="sending")index=5;
                    if(result[0]&&result[0].status==="delivered")index=6;
                    if(result[0]&&result[0].status==="storeSent")index=7;
                    if(result[0]&&result[0].status==="completed")index=8;
                    if(result[0]&&result[0].status==="cancel")index=9;
                    props.setIndex(index);
                }
                setSearchList(result);
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
            fetch(env.siteApi+"/order/stockSeprate/search",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                if(searchText){
                    var index = 0;
                    if(result[0]&&result[0].status==="inprogress")index=0;
                    if(result[0]&&result[0].status==="accept")index=1;
                    if(result[0]&&result[0].status==="completed")index=8;
                    if(result[0]&&result[0].status==="cancel")index=9;
                    
                }
                setSearchStockList(result);
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    },[props.status,props.refreshRate,searchText,pageNumber])
    const manager = token&&token.access;
    if(!token){
    localStorage.removeItem('token-lenz');
        window.location="/login";}
    useEffect(()=>{
        window.scrollTo(0, 470);
    },[pageNumber])
    return(
        <>
        <div className="headerOrderPlace">
            <h2 className="profileTitle">{props.title}</h2>
            {props.stockRX===0?<TextField label="جستجو" variant="outlined" 
                onChange={(e)=>{(e.target.value.length>6||e.target.value.length===0)&&
                    setSearch(e.target.value)
                    setSearchTrigger(e.target.value.length>2?1:0)
                }}/>:<></>}
        </div>
        
        {searchList&&searchList.length&&props.stockRX===0&&
        searchList.map((rx,i)=>(<div key={rx._id}>
            <ProfileOrderItem open={!i} orderData={rx} manager={manager} setRefreshRate={props.setRefreshRate}/>
        </div>
        ))}
        {searchStockList&&props.stockRX===1&&
        searchStockList.map((stock,i)=>(<div key={stock._id}>
           <ProfileStockItem open={!i} orderData={stock} manager={manager} setRefreshRate={props.setRefreshRate}/>
            
        </div>
        ))}
        {searchList&&props.stockRX===2&&searchList.map((rx,i)=>(rx.status.split('|')[2]==="factory"?
            <div key={rx._id}>
                <ProfileOrderItem open={!i} orderData={rx} manager={manager} setRefreshRate={props.setRefreshRate} cancel={1}/>
            </div>:<></>
        ))}
        {searchList?<Paging content={{size:props.stockRX===0?props.count:props.sCount}} setPageNumber={setPageNumber} pageNumber={pageNumber} perPage={10}/>:<></>}
        </>
    )
}
export default ProfileOrderList