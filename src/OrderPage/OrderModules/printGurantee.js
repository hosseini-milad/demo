import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env, { normalPrice } from "../../env";
import Preview from "./Preview";
import PreviewStock from "./PreviewStock";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintGurantee(props){
  const rxOrderNo = document.location.pathname.split('/')[2];
  const [orderInfo, setOrderInfo] = useState('');
  const [orderError,setOrderError] = useState('در حال دریافت اطلاعات')
  const [userInfo, setUserInfo] = useState('');
  const [orderDetail , setOrderDetail] = useState()
  const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
  const[pDate,setPDate] = useState('');
  //console.log(orderInfo)
  //console.log(userInfo)
  useEffect(() => {
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
          body:JSON.stringify({'orderNo':rxOrderNo})
        }
        fetch(env.siteApi+"/order/fetch-stockOrder",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setOrderInfo(result.data);
              setUserInfo(result.user)
              setPDate(new Date(result.data.date).toLocaleDateString());
              setOrderDetail(result.detail)
              //totalValues(result.data.Result.InvoiceItems)
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
    try{
      return(
      <div className="printArea fishPrintArea guranteePrint">
      <div className="hesabSection">
          <div className="hesabfaSection ">
            <h4>Congratulations, on your purchase of authentic Essence</h4>
          </div>
        </div>
        <table className="hesabfaMainTable">
          <tbody>
            <tr>
              <td colSpan={5}>Order No:{rxOrderNo} 
               _Dt.{pDate}</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Sph</td>
              <td>Cyl</td>
              <td>Axis</td>
              <td>Add</td>
            </tr>
            {orderInfo&&orderInfo.stockFaktor.map((items,i)=>(
              i<2&&
            <tr key={i}>
              <td>{items.align}</td>
              <td>{items.sph?items.sph:orderDetail[i].sph}</td>
              <td>{items.cyl?items.cyl:orderDetail[i].cyl}</td>
              <td>{items.axis}</td>
              <td>{items.add}</td>
            </tr>))}
            <tr>
              <td colSpan={5}>{orderDetail&&orderDetail[0]&&orderDetail[0].title&&
                orderDetail[0].title.split('(')[0]}</td>
            </tr>
            <tr>
              <td colSpan={5}>{orderInfo&&orderInfo.stockGuranteeName?
                orderInfo.stockGuranteeName:userInfo.cName}</td>
            </tr>
          </tbody>
        </table>
        <div className="footerGurantee">
          <span >
              REMEMBER , YOUR EYES SHOULD BE REGULARY TESTED BY YOUR EYE CARE PROFESSIONAL
          </span>
        </div>
    </div>
    )}
    catch{
      return(
        <main>مجدد تلاش کنید</main>
      )
    }
}
export default PrintGurantee