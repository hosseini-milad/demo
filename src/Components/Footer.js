import MobileMenu from "./Menu/MobileMenu";
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';
import env from "../env";
import { useState } from "react";

const Footer = (props)=>{
    const categories=props.data;
    const url = document.location.pathname;
    const [notification,setNotification] = useState('')
    const getTokenFunction=async()=>{
    const permission = await Notification.requestPermission()
        if(permission==='granted'){
          const token = JSON.parse(localStorage.getItem('token-lenz'))
          const fireBaseToken = await getToken(messaging,{vapidKey:env.vapidKey})
          setNotification("token Generated")
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,"userId":token.userId
            },
            body:JSON.stringify({token:fireBaseToken})
          }
          fetch(env.siteApi+"/setting/getToken",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setNotification('')
                console.log(result)
              },
              (error) => {
                console.log(error)
              }
            )
            .catch((error)=>{
              console.log(error)
            })
        }
        else if(permission==='denied'){
          alert("you denied")
        }
    }
    return(
        <footer>
            {categories&&categories.store&&<div className="topFooter">
                <a href={`mailto:${categories.store.email}`}>
                    <i className="icon-size fas fa-envelope-o"></i></a>
                <a href={categories.store.instagram}>
                    <i className="icon-size fas fa-instagram"></i></a>
                <a href={`https://wa.me/${categories.store.whatsapp}`}>
                    <i className="icon-size fas fa-whatsapp"></i></a>
                <a href={`tel:${categories.store.phone}`}>
                        <i className="icon-size fas fa-phone"></i></a>
            </div>}
            <div className="mainFooter">
                <div className="footerAbout">
                    <img src="/logo.png" alt="logo"/>
                    <p dangerouslySetInnerHTML={{__html:categories.about&&categories.about.shortDesc}}>
                    
                    </p>
                </div>
                <div className="footerMenu">
                    <ul className="footerUl">
                        {categories&&categories.category.map((cat,i)=>(
                            <li key={i} onClick={()=>window.location.href="/category"}>{cat.title}</li>
                        ))}
                        <li onClick={getTokenFunction}>درخواست نوتیفیکشن</li>
                        {notification?<li>{notification}</li>:<></>}
                    </ul>
                </div>
                <div className="footerMenu">
                    <ul className="footerUl">
                        <li onClick={()=>window.location.href="/order/rx"}>عدسی های سفارشی(RX)</li>
                        <li onClick={()=>window.location.href="/order/stock"}>عدسی های آماده(stock)</li>
                        <li onClick={()=>window.location.href="/quality"}>گارانتی</li>
                        <li>اخبار و مقالات</li>
                        <li onClick={()=>window.location.href="/about"}>درباره ما</li>
                        <li onClick={()=>window.location.href="/contact"}>تماس با ما</li>
                    </ul>
                </div>
                <div className="footerMenu">
                    {/*<img src="/img/enamad.png" alt="enamad"/>*/}
                    <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=285314&amp;Code=RA7RpDW4NIq7AGoxcpvS"><img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=285314&amp;Code=RA7RpDW4NIq7AGoxcpvS" alt="" style={{cursor:"pointer"}} id="RA7RpDW4NIq7AGoxcpvS"/></a>
                </div>
            </div>
            {url==="/login"?"":<MobileMenu />}
        </footer>
    )
}
export default Footer