import { useState } from "react"
import persianDate from 'persian-date';
import DateDefShow from "../ProfilePage/ProfileModules/DateDefShow";
import DateCountDown from "../ProfilePage/ProfileModules/DateCountDown";

const token = JSON.parse(localStorage.getItem('token-lenz'));
var loginDate = "";
    try{loginDate =JSON.parse(localStorage.getItem('lenz-login'));}
    catch{}

const Header = (props)=>{
    //console.log(loginDate.date)
    persianDate.toCalendar('persian');
    var pDate = ""; 
    if(loginDate&&loginDate.date)pDate=new persianDate(new Date(loginDate.date)).format();
    var pWeek = "";
    if(loginDate&&loginDate.date)pWeek=new persianDate(new Date(loginDate.date)).format('dddd');
    
    var countDown = "";
    if(loginDate&&loginDate.date)countDown=(new Date())-(new Date(loginDate.date));
    //console.log(countDown)
    
    const[megaMenu,setMegaMenu]= useState(0);
    const[convasMenu,setConvasMenu] = useState(0)

    return(
        <header>
            <div className="topHeader">
                <div className={convasMenu?"convasMenu convasActive":"convasMenu"}>
                    <div className="convasHeader">
                        <i className="icon-size fas fa-close" onClick={()=>setConvasMenu(0)}></i>
                        <a className="header3 logoTab" href="/">
                            <img src="/logo.svg" alt="MGM lens"/>
                        </a>
                    </div>
                    <div className="mainMenuConvas">
                        <a className="menuConvasItem activeMenu" href="/">
                            صفحه نخست
                        </a>
                        <a className="menuConvasItem" href="/category/essence">
                            محصولات
                        </a>
                        <div className="menuConvasItem">
                            سفارش آنلاین
                            <div className="menuSubItems">
                                <a className="menuSubItem" href="/order/stock">
                                    عدسی سفارشی Stock
                                </a>
                                <a className="menuSubItem" href="/order/rx">
                                    عدسی سفارشی RX
                                </a>
                            </div>
                        </div>
                        <a className="menuConvasItem" href="/quality">
                            گارانتی
                        </a>
                        <div className="menuConvasItem">
                            اخبار و مقالات
                        </div>
                        <a className="menuConvasItem" href="/about">
                            درباره ما
                        </a>
                        <a className="menuConvasItem" href="/contact">
                            تماس با ما
                        </a>
                    </div>
                </div>
                <div className="header3 eSpace showMobile">
                    <div className="menuConvas">
                        
                        <i className="icon-size fas fa-bars" onClick={()=>setConvasMenu(1)}></i>
                        
                    </div>
                </div>
                <a className="header3 logoTab" href="/">
                    <img src="/logo.svg" alt="MGM lens"/>
                    <div className="header3 eSpace"></div>
                </a>
                <div className="header3 eSpace showDesktop">
                </div>
                <div className="header3">
                    
                    <div className="headerTab searchTab" >
                        <i className="icon-size fas fa-search"></i>
                        {/*<span style={{color:searchIcon?"var(--main-color)":"inherit"}}>جستجو</span>*/}
                    </div>
                    <a className="headerTab bellTab showDesktop" >
                        <i className="icon-size fas fa-bell-o"></i>
                        {/*<span style={{color:shopIcon?"var(--main-color)":"inherit"}}>سبد خرید</span>*/}
                    </a>
                    <a className="headerTab cartTab" href="/cart">
                        <i className="icon-size fas fa-shopping-cart"></i>
                        {/*<span style={{color:shopIcon?"var(--main-color)":"inherit"}}>سبد خرید</span>*/}
                    </a>
                    {token&&token.access&&token.access!=="customer"?<a className="headerTab" href={"/manager"}>
                        <i className="icon-size fas fa-user-o"></i>
                        <span>مدیریت</span>
                    </a>:
                    <a className="headerTab loginTab" href={!token?"/login":"/profile"}>
                    <i className="icon-size fas fa-user-o"></i>
                    {!token?<div className="buttons topBtn">
                        <span className="loginTopBtn">ورود</span>
                        <span className="registerTopBtn">ثبت نام</span>
                    </div>:<span>حساب کاربری</span>}
                </a>}
                </div>
            </div>
            <div className="mainMenu">
                <div style={{display: "flex"}}><a className="menuItem activeMenu" href="/">
                    صفحه نخست
                </a>
                <div className="menuItem"><a className="menuItem activeMenu" href="/category">
                    محصولات
                    {/*<div style={{display:props.data&&megaMenu==="product"?"block":"none"}}>
                        <MegaMenuProduct data={props.data}/></div>*/}
                </a></div>
                <div className="menuItem" 
                    onMouseOver={()=>setMegaMenu("order")}
                    onMouseOut={()=>setMegaMenu("0")}>
                    سفارش آنلاین
                    <i className="mini-size fas fa-chevron-down"></i>
                    <div className="megaHolder" style={{display:props.data&&megaMenu==="order"?"block":"none"}}>
                        <div className="megaMenu">
                            <div className="megaMenuHolder">
                                <a className="megaMenuCol" href="/order/stock">
                                    <span>عدسی های آماده (Stock)</span>
                                </a>
                                <a className="megaMenuCol" href="/order/rx">
                                    <span>عدسی های سفارشی (RX)</span>
                                </a>
                            </div> 
                        </div>   
                    </div>
                </div>
                <a className="menuItem" href="/quality">
                    گارانتی
                </a>
                <a className="menuItem" href="/blog">
                    اخبار و مقالات
                </a>
                <a className="menuItem" href="/about">
                    درباره ما
                </a>
                <a className="menuItem" href="/contact">
                    تماس با ما
                </a></div>
                {/*countDown&&token&&<DateDefShow countDown={countDown} />*/}
                {token&&<DateCountDown />}
            </div>
        </header>
    )
}
export default Header