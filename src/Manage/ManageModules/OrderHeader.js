import persianDate from 'persian-date';
import { useEffect, useState } from 'react';
import Alert from '../../Components/Alert';
import env from '../../env';
import DateDef from '../../ProfilePage/ProfileModules/DateDef'
import OrderStatusMessage from '../../ProfilePage/ProfileModules/OrderStatusMessage';
import FactoryHeader from '../ManagerAction/FactoryHeader';
import ManageHeader from '../ManagerAction/ManageHeader';
import StoreHeader from '../ManagerAction/StoreHeader';
import ShopHeader from '../ManagerAction/ShopHeader';
import CancelHeader from '../ManagerAction/CancelHeader';
const token = JSON.parse(localStorage.getItem('token-lenz'))

function OrderHeader(props){
    const orderData = props.orderData;
    persianDate.toCalendar('persian');
    const pDate = new persianDate(new Date(orderData.date)).format();
    const pWeek = new persianDate(new Date(orderData.date)).format('dddd');
    const countDown = (new Date(orderData.date))-(new Date());
    const [error,setError] = useState('')
    //console.log(orderData)
    const [alertShow,setAlertShow] = useState(
        {show:false,action:0})

    const changeOrderStatus=(status,reason)=>{
        //const acceptStatus = !reason&&window.confirm("تایید سفارش؟");
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({rxOrderNo:orderData.rxOrderNo,
                status:reason?status+"|"+reason+"|"+props.manager:status})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/order/manage/addrx",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                if(result.error){
                    setError(result.error)
                    setTimeout(()=>setError(''),3000)
                }
                else{
                    status==="initial"?window.location.href="/order/rx#lenzDetail":
                    props.setRefreshRate(1)
                }
            //setTimeout(()=>window.location.reload(),200)
            },
            (error) => {
            console.log("error",error);
            }
        )
        .catch((error)=>{
            console.log("catch",error)
        })
    }
    useEffect(() => {
        alertShow.action&&changeOrderStatus(
            alertShow.status,alertShow.reason,alertShow.part)
    },[alertShow.action])
//console.log(orderData)
    return(<>
        <div className="orderHeaderTitle">
            {props.manager==="customer"&&orderData.status==="inprogress"?
                <DateDef countDown={countDown} changeOrderStatus={changeOrderStatus}/>:
            props.manager==="manager"?(<ManageHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            props.manager==="sale"?(<ManageHeader orderData={orderData} 
                    changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            props.manager==="factory"?(<FactoryHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            props.manager==="store"?(<StoreHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            props.manager==="shop"?(<ShopHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):''}
            
            {orderData.status.includes("cancel")&&<div style={{display:"grid"}}>
            {props.cancel?<CancelHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>:<></>}
            <small style={{color:"red"}}>
                {orderData.status.split('|')[2]}<br/>{orderData.status.split('|')[1]}
            </small>
            </div>}
            
            <OrderStatusMessage status={orderData.status} pWeek={pWeek} pDate={pDate.split(' ')[0].replaceAll('-','/')} 
                user={props.userInfo} rawDate={pDate.split(' ')[1]} access={token.access}
                userData={props.user} orderNo={orderData.rxOrderNo} userLog={props.userLog}/>
            <div style={{display:"grid"}}>
                <small>شماره سفارش: {orderData.rxOrderNo}</small>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    <button className='profileBtn' onClick={()=>props.setShowDetail((props.showDetail+1)%2)}>
                    {props.showDetail?"بستن جزئیات":"مشاهده جزئیات"}</button>
                {orderData.status==="delivered"||orderData.status==="storeSent"||orderData.status==="completed"?
                (token.mobile!=="09123778619"?<button className='profileBtn' 
                onClick={()=>window.open("/hesabprint/"+orderData.rxOrderNo,'_blank')}>
                {"چاپ حسابفا"}</button>:
                <button className='profileBtn' onClick={()=>window.open("/hesabfishprint/"+orderData.rxOrderNo,'_blank')}>
                {"چاپ حسابفا"}</button>):
                (token.mobile!=="09123778619"?<button className='profileBtn' 
                    onClick={()=>window.open("/print/"+orderData.rxOrderNo,'_blank')}>
                    {"چاپ سفارش"}</button>:
                    <button className='profileBtn' onClick={()=>window.open("/fishprint/"+orderData.rxOrderNo,'_blank')}>
                    {"چاپ سفارش"}</button>)}</div>
            </div>
        </div>
        
        <small>{error}</small>
        {alertShow.show?<Alert data={alertShow} setAlertShow={setAlertShow}/>:''}
        </>
    )
}
export default OrderHeader