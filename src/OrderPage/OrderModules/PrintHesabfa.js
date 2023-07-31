import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env, { normalPrice } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintHesabfa(props){
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
        <div className="printArea">
          <div className="userInfo">
              <div className="hesabfaSection">
              </div>
              <div className="hesabfaSection">
                <h1>MGM Lens</h1>
                <h4>فاکتور فروش</h4>
              </div>
              <div className="hesabfaSection" style={{minWidth: "240px"}}>
                <small>شماره فاکتور: <b>{orderInfo.Number}</b></small>
                <small>شماره ارجاع: <b>{rxOrderNo}</b></small>
                <small> تاریخ سفارش: <b>{pDate}</b></small>
              </div>
            </div>
            <table className="hesabfaTable">
              <tbody>
                <tr>
                  <td className="verticalRow hesabfaColor">
                    <h3>خریدار</h3>
                  </td>
                  <td>
                    <table className="hesabfaRow">
                      <tbody>
                        <tr>
                          <td colSpan={3} className="hesabfaItem">
                            <span>خریدار: </span>
                            <strong>{userInfo.Name}</strong>
                          </td>
                          <td colSpan={2} className="hesabfaItem">
                            <span>شماره تماس: </span>
                            <strong>{userInfo.Mobile}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td className="hesabfaItem">
                            <span>استان: </span>
                            <strong>{userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شهر: </span>
                            <strong>{userInfo&&userInfo.City}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>کدپستی: </span>
                            <strong>{userInfo&&userInfo.PostalCode}</strong>
                          </td>
                          <td colSpan={2} className="hesabfaItem">
                            <span>آدرس: </span>
                            <strong>{userInfo&&userInfo.Address}</strong>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="hesabfaMainTable">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>شرح</th>
                  <th>تعداد</th>
                  <th>مبلغ واحد<br/>(ریال)</th>
                  <th>مبلغ<br/>(ریال)</th>
                  <th>تخفیف<br/>(ریال)</th>
                  <th>مبلغ کل<br/>(ریال)</th>
                </tr>
                {orderInfo&&orderInfo.InvoiceItems.map((items,i)=>(
                <tr key={i}>
                  <td className="centerCell">{i+1}</td>
                  <td>{items.Description}</td>
                  <td className="centerCell">{items.Quantity}</td>
                  <td>{normalPrice(items.UnitPrice)}</td>
                  <td>{normalPrice(items.Sum)}</td>
                  <td>{normalPrice(items.Discount)}</td>
                  <td>{normalPrice(items.TotalAmount)}</td>
                </tr>))}
              </tbody>
            </table>
            <div className="hesabfaFooter">
              <div className="footerRows">
                  <div className="hesabfaRight">
                    <strong>شرایط و نحوه فروش:   نقدی    غیرنقدی</strong>
                    <span>مانده حساب فاکتور: {normalPrice(userInfo.Liability)} ریال بدهکار</span>
                  </div>
                  <div className="hesabfaPrice">
                    <div className="priceSeprate">
                      <span>مجموع:</span>
                      <span>{normalPrice(totalPrice.sum) } ریال</span>
                    </div>
                    <div className="priceSeprate">
                    <span>تخفیف: </span>
                    <span>{totalPrice.discount?
                      normalPrice(totalPrice.discount)+" ریال ":"-"}</span>
                    </div>
                    <h3>مبلغ کل: {normalPrice(orderInfo.Payable)} ریال</h3>
                    <strong> </strong>
                  </div>
                </div>
            </div>
            {/*<button className="printBtn" onClick={()=>printNow()}>چاپ</button>*/}
            <div className="footerHesabfa">
              <span style={{textAlign:"center",display:"block"}}>امضا</span>
              <span style={{textAlign:"center",display:"block"}}>
                  نام کاربر: {token&&token.name}<br/> ساعت: 
                  {new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()}
              </span>
              <button className="printBtn" onClick={()=>window.location.href="/hesabfishprint/"+rxOrderNo}>فیش پرینت</button>
            </div>
        </div>
    )

  }

export default PrintHesabfa