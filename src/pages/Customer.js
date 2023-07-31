import { useState } from "react";
import { useEffect } from "react";
import env from "../env";
import { useNavigate } from 'react-router-dom';
import DateShow from "../ProfilePage/ProfileModules/DateShow";

function Customer(props){
    const url =document.location.pathname.split('/')[2];
    const [content,setContent]= useState('')
    const options=["کدمشتری","نام و نام خانوادگی","شناسه مشتری","شماره تماس",
    "شماره تماس 2","شماره موبایل"];
    const optionsSite = ["نام و نام مشتری","آدرس پستی","شماره موبایل","تلفن ثابت","تاریخ تولد","شغل"]
    const optionsOrder=["شماره سفارش","وضعیت","شناسه","برند","تاریخ"];
    const optionsOffer=["برند","کدتخفیف"]
    const optionsOfferLog=["برند","کدتخفیف","تاریخ"]
    let history = useNavigate();
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({userId:url})
          }
        fetch(env.siteApi + "/report/userDetail",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
            //setContent('')
            setContent(!result.error&&result)
            //setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    const [tabIndex,setTabIndex] = useState(0);
    var tabOptions = [
        {tab:"اطلاعات کاربری",index:0},
        {tab:"لیست سفارشات",index:1},
        {tab:"لیست تخفیفات",index:2},
        {tab:"سابقه تخفیفات",index:3},
    ]
    //const userId = props.userId
    return(
        <main className="pagesMain">
            <div className='orderTableHolder'></div>

            <div className="profileTabHolder">
                {tabOptions.map((tabItem,i)=>(
                <div className={tabItem.index===tabIndex?"profileTab profileTabActive":"profileTab"}
                    onClick={()=>{setTabIndex(i)}} key={i}>
                    <span>{tabItem.tab}</span>
                </div>
                ))}
                <div className="back">
                    <input type="button" className="backInput" onClick={()=>history(-1)} value="بازگشت" />
                    <i className="icon-size fas fa-history"></i>
                </div>
            </div>

            <div className="customer" style={{display:tabIndex===0?"block":"none"}}>
                <table className="orderTable stockTable rtl">
                    <tbody>
                        <tr> 
                            {options.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        
                        {content.rawUser&&<tr >
                            <td>{content.rawUser.cCode}</td>
                            <td>{content.rawUser.cName}</td>
                            
                            <td>{content.rawUser.phone}</td>
                            <td>{content.rawUser.phone1}</td>
                            <td>{content.rawUser.phone2}</td>
                            <td>{content.rawUser.phone3}</td>
                            
                            {/*<td>{content.password&&content.password.length<5&&content.password}</td>
                            <td>{normalPrice(manItem.totalPrice)}</td>*/}
                        </tr>}
                        
                    </tbody>
                </table>
                <hr/>
                <table className="orderTable stockTable rtl">
                    <tbody>
                        <tr> 
                            {optionsSite.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        
                        {content.userInfo&&<tr >
                            <td>{content.userInfo.userName}</td>
                            <td>{content.userInfo.meliCode}</td>
                            
                            <td>{content.userInfo.mobile}</td>
                            <td>{content.userInfo.email}</td>
                            <td>{content.userInfo.birthDate}</td>
                            <td>{content.userInfo.job}</td>
                            
                            {/*<td>{content.password&&content.password.length<5&&content.password}</td>
                            <td>{normalPrice(manItem.totalPrice)}</td>*/}
                        </tr>}
                        
                    </tbody>
                </table>
            </div>
            <div className="customer" style={{display:tabIndex===1?"block":"none"}}>
                <table className="orderTable stockTable rtl">
                    <tbody>
                        <tr> 
                            {optionsOrder.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        
                        {content.orderData&&content.orderData.map((order,i)=>(
                        <tr key={i}>
                            <td>{order._id}</td>
                            <td>{order.status}</td>
                            <td>{order.rxLenz}</td>
                            <td>{order.brand}</td>
                            <td>{order.date}</td>
                            
                            
                            {/*<td>{content.password&&content.password.length<5&&content.password}</td>
                            <td>{normalPrice(manItem.totalPrice)}</td>*/}
                        </tr>))}
                        
                    </tbody>
                </table>
            </div>
            <div className="customer" style={{display:tabIndex===2?"block":"none"}}>
                <table className="orderTable stockTable rtl">
                    <tbody>
                        <tr> 
                            {optionsOffer.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        
                        {content.offerData&&
                        content.offerData.map((offer,i)=>(<tr key={i}>
                            <td>{offer.brandName}</td>
                            <td>{offer.discountPercent}</td>
                            
                            {/*<td>{content.password&&content.password.length<5&&content.password}</td>
                            <td>{normalPrice(manItem.totalPrice)}</td>*/}
                        </tr>))}
                        
                    </tbody>
                </table>
            </div>
            <div className="customer" style={{display:tabIndex===3?"block":"none"}}>
                <table className="orderTable stockTable rtl">
                    <tbody>
                        <tr> 
                            {optionsOfferLog.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        
                        {content.offerLogData&&
                        content.offerLogData.map((offer,i)=>(<tr key={i}>
                            <td>{offer.brandName}</td>
                            <td>{offer.discountPercent}</td>
                            <td><DateShow date={offer.date}/></td>
                            
                            {/*<td>{content.password&&content.password.length<5&&content.password}</td>
                            <td>{normalPrice(manItem.totalPrice)}</td>*/}
                        </tr>))}
                        
                    </tbody>
                </table>
            </div>
        </main>
    )
}
export default Customer