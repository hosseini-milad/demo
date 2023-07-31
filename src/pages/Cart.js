import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from "react";

import CartTab from "../CartPage/CartTab";
import BreadCrumb from "../Components/BreadCrumb";
import SimpleAuth from "../Components/simpleAuth";
import SimpleFetch from "../Components/simpleFetch";
import env, { discountPercent, normalPrice } from "../env";
import Login from "./Login";
import states from "../state";
import cities from "../city";
import CartItems from "../CartPage/CartItems";

const persianDate = require('persian-date');
function Cart(){ 
    const [tabIndex,setTabIndex] = useState(0);
    const [cartDetail,setCartDetail]= useState(-1);
    const [cityList,setCityList] = useState([])
    const [citySelect,setCitySelect]= useState('');
    const [state,StateSelect] = useState('');
    const cart = SimpleAuth(env.siteApi+"/order/cart");
    const cartSide = SimpleFetch(env.siteApi+"/order/cartside")
    const [error,setError]= useState('');

    const orderDetailHeader=["","SPH","CYL","0","QTY"]
    persianDate.toCalendar('persian');
    const token = JSON.parse(localStorage.getItem('token-lenz'))

    const StateChange=(state_id)=>{
        const tempCity = cities.filter(city=>city.province_id==state_id);
        setCityList(tempCity)
        setCitySelect({})
    }
    const submitOrder=()=>{
        for(var index = 0;index<cart.cart.items.length;index++)

        updateOrderStatus(cart.cart.items[index]._id,"inprogress")
        
        setTimeout(()=>window.location.href="/profile#orders",3000)
    }
    const updateOrderStatus=(orderId,status)=>{
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({id:orderId,status:status})
          }
          fetch(env.siteApi+"/order/addStock",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setError({title:'سفارش با موفقیت ثبت شد',color:"green"})
              },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    }
    
    //console.log(cart)
    return(
        <main className="pagesMain">
            <BreadCrumb />
            {tabIndex!==10&&<CartTab index={tabIndex} />}
            {cart&&!cart.error?<div className="cartHolder">
                <div className="cartItems">
                    <h2>سبد خرید شما</h2>
                    <CartItems cart={cart} token={token}/>
                    
                    
                </div>
                <div className="cartSide">
                    <div className="cartSideHolder">
                        <div className="sideField">
                            <span className="sideFieldSpan">نحوه ارسال</span>
                            <Autocomplete
                            disableClearable
                            options={cartSide&&cartSide.transferMethod||{}}
                            getOptionLabel={item=>item.title}
                            style={{ width: "calc(100% - 150px)"}}
                            renderInput={(params) =>
                            <TextField {...params} variant="outlined" />}
                        />
                        </div>
                        <div className="sideField">
                            <span className="sideFieldSpan">نحوه پرداخت</span>
                            <Autocomplete
                            disableClearable
                            options={cartSide&&cartSide.paymentMethod||{}}
                            getOptionLabel={item=>item.title}
                            style={{ width: "calc(100% - 150px)"}}
                            renderInput={(params) =>
                            <TextField {...params} variant="outlined" />}
                        />
                        </div>
                        <div className="sideField">
                            <span className="sideFieldSpan">استان</span>
                            <Autocomplete
                            disableClearable
                            options={states||[]}
                            value={state||null}
                            onChange={(e,value)=>{StateChange(value.id);StateSelect(value)}}
                            getOptionLabel={item=>item.name}
                            style={{ width: "calc(100% - 150px)"}}
                            renderInput={(params) =>
                            <TextField {...params} variant="outlined" />}
                        />
                        </div>
                        <div className="sideField">
                            <span className="sideFieldSpan">شهر</span>
                            <Autocomplete
                            disableClearable
                            value={citySelect}
                            options={cityList}
                            onChange={(e,value)=>setCitySelect(value)}
                            getOptionLabel={city=>city.name||""}
                            style={{ width: "calc(100% - 150px)"}}
                            renderInput={(params) =>
                            <TextField {...params} variant="outlined" />}
                        />
                        </div>
                        
                        <div className="sideField">
                            <TextField variant="outlined"
                            label="آدرس گیرنده"
                            multiline  
                            minRows={5}
                            style={{width:"100%"}}/>
                        </div>
                        <div className="sideField">
                            <TextField variant="outlined"
                                label="کدپستی گیرنده"
                                style={{width:"100%"}}
                            />
                        </div>

                        <div className="cartPrice">
                            <div className="priceText">
                                <strong>مبلغ کل</strong>
                                <span>{normalPrice(parseInt(cart.cart.totalPrice)+
                                    parseInt(cart.cart.totalDiscount))} تومان</span>
                            </div>
                            <div className="priceText greenText">
                                <strong>سود شما</strong>
                                <span>{normalPrice(cart.cart.totalDiscount)} تومان</span>
                            </div>
                            <hr/>
                            <div className="priceText">
                                <strong>مبلغ نهایی</strong>
                                <span>{normalPrice(cart.cart.totalPrice)} تومان</span>
                            </div>
                        </div>
                    </div>
                    <div className="orderContinue">
                        <input type="button" className="orderBtn fullBtn" value="پرداخت" onClick={submitOrder}/>
                        <sub style={{color:error?error.color:"inherit"}}>{error?error.title:''}</sub>
                    </div>
                    {/*<div>
                    <ReactToPrint
                        trigger={() => <a href="#">Print this out!</a>}
                        content={<h1>Here Print</h1>}
                        documentTitle="AwesomeFileName"
                        />
                    <ComponentToPrint ref={null} text={"this.state.text"} /> 
                                </div>*/}
                </div>
            </div>:
            <div className="loginText"><Login /></div>}
        </main>
    )
}
export default Cart