
import { useState } from "react";
import env,{ discountPercent, normalPrice } from "../env";

const persianDate = require('persian-date');
function CartItems(props){
    const cart = props.cart
    const [cartDetail,setCartDetail]= useState(-1);
    const orderDetailHeader=["","SPH","CYL","0","QTY"]
    const removeItem=(itemID)=>{
        console.log(itemID)
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':props.token.token,
              'userId':props.token.userId},
              body:JSON.stringify({id:itemID,status:"cancel"})
          }
          console.log(postOptions)
          
          fetch(env.siteApi+"/order/updateItem",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                
              },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    }
    console.log(cart)
    return(<>
        {cart.cart.items.map((cartItem,i)=>(
            <div key={i}>
            <div className="cartItem" 
                onClick={()=>cartDetail===-1?setCartDetail(i):
                    cartDetail!==i?setCartDetail(i):setCartDetail(-1)}>
            <span>{i+1}</span>
            <img src="/img/glass02.jpg" />
            <div className="lenzCartDetail">
                <strong>نوع عدسی</strong>
                <small>عدسی آماده</small>
            </div>
            <div className="lenzCartDetail">
                <strong>تاریخ سفارش</strong>
                <small>{new persianDate(new Date(cartItem.date)).format()}</small> 
            </div>
            <div className="removeCart" onClick={()=>removeItem(cartItem._id)}>
                <i className="icon-size fas fa-recycle"></i>
                </div>
        </div>
        <div className="cartDetail"
                style={{display:cartDetail===i?"block":"none"}}>
            <div className="cartDetailHeader">
                <strong> شماره سفارش: 
                    <span> {cart.cart.orderId} </span>
                </strong>
                <strong>وضعیت سفارش:
                    <span>در سبد خرید</span>
                </strong>
            </div>
            <div className="cartDetailHolder" >
                <strong>مشخصات عدسی</strong>
                <table className="orderTable stockTable">
                    <tbody>
                        <tr>
                           <td >{cartItem.stockDetail[0].brandName}</td>
                           <td >{cartItem.stockDetail[0].lenzIndex}</td>
                           <td >{cartItem.stockDetail[0].material}</td>
                           <td >{cartItem.stockDetail[0].coating}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <div className="priceBrand">
                    <div className="priceBrandPart">
                        <b>قیمت عدسی:</b>
                        <span className="priceOff">
                            <i>{normalPrice(parseInt(cartItem.stockDetail[0].priceOD)+
                                parseInt(cartItem.stockDetail[0].priceOS))}</i>
                        {normalPrice(parseInt(cartItem.stockDetail[0].priceOD)+
                                parseInt(cartItem.stockDetail[0].priceOS)-200000)} ریال </span>
                        <div className="offOrder offCart">
                            <small>{discountPercent((parseInt(cartItem.stockDetail[0].priceOD)+
                                parseInt(cartItem.stockDetail[0].priceOS)),200000)}%OFF</small>
                            <div className="offBack"></div>
                        </div>
                    </div>
                    <img className="brandCartImg" src={env.siteApiUrl+"/uploads/product/essence.png"} />
                </div>
            </div>
            <div className="cartDetailHolder" >
                <strong>مشخصات نسخه</strong>
                <table className="orderTable stockTable">
                    <tbody>
                        <tr>
                            {orderDetailHeader.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        <tr>
                        {cartItem.count==="1"?<td>OD</td>:<td>لنز</td>}
                           <td >{cartItem.stockDetail[0].sphOD}</td>
                           <td >{cartItem.stockDetail[0].cylOD}</td>
                           <td >{cartItem.stockDetail[0].od}</td>
                           <td >{cartItem.count}</td>
                        </tr>
                        {cartItem.count==="1"&&<tr>
                        <td>OS</td>
                           <td >{cartItem.stockDetail[0].sphOS}</td>
                           <td >{cartItem.stockDetail[0].cylOS}</td>
                           <td >{cartItem.stockDetail[0].os}</td>
                           <td >{cartItem.count}</td>
                        </tr>}
                    </tbody>
                </table>
                
            </div>
            <div className="cartDetailHolder" >
                <strong>خدمات</strong>
                <table className="orderTable stockTable">
                    <tbody>
                        <tr>
                            <th >خدمت</th>
                            <th >هزینه</th>
                        </tr>
                        <tr>
                            <td>
                            <i className="icon-size fas fa-help"></i>
                                گارانتی دارد</td>
                                <td>0 ریال</td>
                        </tr>
                        <tr>
                            <td>
                            <i className="icon-size fas fa-help"></i>
                                لوازم جانبی </td>
                                <td>{normalPrice(cartItem.extraPrice)} ریال</td>
                        </tr>
                        <tr>
                            <td>قیمت عدسی</td>
                                <td>{normalPrice(cartItem.lenzPrice)} ریال</td>
                        </tr>
                        <tr>
                            <td>میزان تخفیف</td>
                                <td>{normalPrice(cartItem.totalDiscount)} ریال</td>
                        </tr>
                        <tr className="finalPrice">
                            <td>قیمت نهایی محصول</td>
                                <td>{normalPrice(cartItem.totalPrice)} ریال</td>
                        </tr>
                    </tbody>
                </table>
                <div className="orderContinue">
                    <input type="button" className="orderBtn" value="چاپ فاکتور" 
                    onClick={()=>{}}/>
                    
                </div>
                
            </div>
        </div>
            </div>
        ))}
        </>
    )
}
export default CartItems