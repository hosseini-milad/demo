import persianDate from 'persian-date';
import { useEffect, useState } from 'react';
import Alert from '../../Components/Alert';
import env from '../../env';
import DateDef from '../../ProfilePage/ProfileModules/DateDef'
import OrderStatusMessage from '../../ProfilePage/ProfileModules/OrderStatusMessage';
import FactoryHeader from '../ManagerAction/FactoryHeader';
import ManageHeader from '../ManagerAction/ManageHeader';
import ManageStockHeader from '../ManagerAction/ManageStockHeader';
import StoreHeader from '../ManagerAction/StoreHeader';
import ShopHeader from '../ManagerAction/ShopHeader';
import GuranteeHeader from '../ManagerAction/GuranteeHeader';

function StockHeader(props){
    const orderData = props.orderData;
    persianDate.toCalendar('persian');
    const pDate = new persianDate(new Date(orderData.date)).format();
    const pWeek = new persianDate(new Date(orderData.date)).format('dddd');
    const countDown = (new Date(orderData.date))-(new Date());
    //console.log(orderData)
    const [alertShow,setAlertShow] = useState(
        {show:false,action:0})

    //console.log(alertShow)
    const changeOrderStatus=(status,reason)=>{
        //const acceptStatus = !reason&&window.confirm("تایید سفارش؟");
        const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token&&token.token,
              'userId':token&&token.userId},
              body:JSON.stringify({stockOrderNo:orderData.stockOrderNo,
                status:reason?status+"|"+reason+"|"+props.manager:status})
        }
        console.log(postOptions)
        fetch(env.siteApi+"/order/manage/addstock",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            status==="initial"?window.location.href="/order/stock":
            setTimeout(()=>props.setRefreshRate(1),200)
            },
            (error) => {
            console.log(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(() => {
        alertShow.action&&changeOrderStatus(
            alertShow.status,alertShow.reason,alertShow.part)
    },[alertShow.action])

    return(<>
        <div className="orderHeaderTitle">
            {!props.manager?<DateDef countDown={countDown} changeOrderStatus={changeOrderStatus}/>:
            (props.manager==="manager"||props.manager==="saleStock")?
                (<ManageStockHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            
            (props.manager==="store"||props.manager === "sale"||props.manager==="saleStock")?
                (<StoreHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            (props.manager==="shop"||props.manager==="saleStock")?
                (<ShopHeader orderData={orderData} 
                changeOrderStatus={changeOrderStatus} setAlertShow={setAlertShow}/>):
            ''}
            {orderData.stockGurantee=="request"?   
              (<GuranteeHeader orderData={orderData} />):''}
            {orderData.status.includes("cancel")&&
            <small style={{color:"red"}}>
                {orderData.status.split('|')[2]}<br/>{orderData.status.split('|')[1]}
            </small>}
            
            <OrderStatusMessage status={orderData.status} pWeek={pWeek} pDate={pDate.split(' ')[0].replaceAll('-','/')} 
                user={props.userInfo} rawDate={pDate.split(' ')[1]}
                orderNo={orderData.stockOrderNo} userLog={props.userLog}/>
            <div style={{display:"grid"}}>
                <small>شماره سفارش: {orderData.stockOrderNo}</small>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    <button className='profileBtn' onClick={()=>props.setShowDetail((props.showDetail+1)%2)}>
                    {props.showDetail?"بستن جزئیات":"مشاهده جزئیات"}</button>
                <button className='profileBtn' onClick={()=>window.open("/print/"+orderData.stockOrderNo,'_blank')}>
                    {"چاپ سفارش"}</button></div>
            </div>
        </div>
        {alertShow.show?<Alert data={alertShow} setAlertShow={setAlertShow}/>:''}
        </>
    )
}
export default StockHeader