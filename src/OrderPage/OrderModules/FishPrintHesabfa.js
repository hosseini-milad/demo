import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env, { calcTotalItems, normalPrice } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function FishPrintHesabfa(props){
    const rxOrderNo = document.location.pathname.split('/')[2];
    const [orderInfo, setOrderInfo] = useState('');
    const [orderError,setOrderError] = useState('در حال دریافت اطلاعات')
    const [userInfo, setUserInfo] = useState('');
    const [totalPrice , setTotalPrice] = useState({sum:0,discount:0})
    const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
    persianDate.toCalendar('persian');
    const[pDate,setPDate] = useState('');
    const[pWeek,setPWeek] = useState('');
    const[color,setColor] = useState('');
    console.log(orderInfo)
    useEffect(() => {
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({'orderNo':rxOrderNo})
          }
          fetch(env.siteApi+"/hesabfa/faktorApi",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setOrderInfo(result.data.Result);
                setUserInfo(result.data.Result.Contact)
                setPDate(new persianDate(new Date(result.data.Result.Date)).format().split(' ')[0]);
                setPWeek(new persianDate(new Date(result.data.Result.Date)).format().split(' ')[1].split(':'));
                totalValues(result.data.Result.InvoiceItems)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              setOrderError('خطایی رخ داده است')
              console.log(error)
            })
      
          //window.scrollTo(0, 170);
      },[])
      
    //console.log(rxInfo)
    const totalValues=(values)=>{
      var sum = 0;
      var discount=0;
      for(var i=0;i<values.length;i++){
        sum+= values[i].Sum;
        discount+= values[i].Discount
      }
      setTotalPrice({sum:sum,discount:discount})
    }

    if(!orderInfo)
      return(<main>{orderError}</main>)
    else return(
        <div className="printArea fishPrintArea">
          <div className="userInfo hesabSection">
              <div className="hesabfaSection hesabBorder">
                <h4>فاکتور فروش</h4>
                <h4>MGM Lens</h4>
              </div>
              <div className="hesabfaSection hesabBorder">
                <small>ش.فاکتور: {orderInfo.Number}</small>
                <small>ش.ارجاع: {rxOrderNo}</small>
              </div>
              <div className="hesabfaSection hesabBorder">
                <small> تاریخ: {pDate.replace(/-/g,'/')}</small>
                <small>ساعت: {new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()}</small>
              </div>
            </div>
            <table className="hesabPrintTable hesabBorder">
              <tbody>
                <tr>
                  <td className="verticalRow hesabfaColor">
                    <small>مشتری</small>
                  </td>
                  <td colSpan={3} className="hesabfaItem">
                    <span>نام: </span>
                    <strong>{userInfo.Name}</strong>{/*+" ("+userInfo.Code+")"*/}
                    <br/>
                    <span>شماره تماس: </span>
                    <strong>{userInfo.Mobile}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="hesabfaMainTable">
              <tbody>
                <tr>
                  <th>#</th>
                  <th width={120}>عنوان</th>
                  <th>تعداد</th>
                  <th className="priceCell">مبلغ</th>
                </tr>
                {orderInfo&&orderInfo.InvoiceItems.map((items,i)=>(
                <tr key={i}>
                  <td className="centerCell">{i+1}</td>
                  <td style={{fontSize:"11px"}}>{items.Description}</td>
                  <td className="centerCell">{items.Quantity}</td>
                  <td className="priceCell">{normalPrice(items.Sum)}</td>
                </tr>))}
              </tbody>
            </table>
            <table className="hesabfaMainTable sumTable"> 
              <tbody>
                <tr>
                  <td rowSpan={3}>جمع اقلام: {calcTotalItems(orderInfo&&orderInfo.InvoiceItems)}</td>
                  <td>جمع فاکتور </td>
                  <td className="priceCell">{normalPrice(totalPrice.sum)}</td>
                </tr>
                <tr>
                  <td>جمع تخفیف </td>
                  <td className="priceCell">{normalPrice(totalPrice.discount)}</td>
                </tr>
                <tr>
                  <td>قابل پرداخت </td>
                  <td className="priceCell"><b>{normalPrice(orderInfo.Payable)}</b></td>
                </tr>
              </tbody>
            </table>
            <div className="hesabfaFooter">
              <div className="footerRows">
                  <div className="hesabfaRight">
                    <span>مانده حساب: {normalPrice(userInfo.Liability)} ریال بدهکار</span>
                  </div>
                  
                </div>
            </div>
            {/*<button className="printBtn" onClick={()=>printNow()}>چاپ</button>*/}
            <div className="footerHesabfa">
              <span style={{textAlign:"center",display:"block"}}>امضا</span>
              <span style={{textAlign:"center",display:"block"}}>
                  تنظیم سند: {token&&token.mobile}
              </span>
            </div>
        </div>
    )

  }

export default FishPrintHesabfa