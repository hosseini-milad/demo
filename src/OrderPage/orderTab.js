function OrderTab(props){
    const tabIndex = props.index;
    const tabOptions = [
        {tab:"سفارش دهنده",url:"consumer"},
        {tab:"مشخصات عدسی",url:"lenzDetail"},
        {tab:"اطلاعات نسخه",url:"odOsDetail"},
        {tab:"ابعاد و شکل فریم",url:"frameSize"},
        {tab:"اطلاعات خدمات",url:"serviceInfo"},
        {tab:"اطلاعات تکمیلی",url:"moreInfo"},
    ];
    const url = window.location.href;
    if(url.split('#')[1]){
        for(var i=0;i<tabOptions.length;i++)
            if(url.split('#')[1]===tabOptions[i].url){
                props.setTabIndex(i);
                break;
            }
        if(url.split('#')[1]==="preview")props.setTabIndex(10);
    }
    return(
        <div className="orderTabOptizone">
            <div className="logOut" 
                onClick={()=>{localStorage.removeItem('token-lenz');window.location.href="/login"}}
                >خروج</div>
            <div className={props.index?"preTab":"preTab disableTab"} 
                onClick={()=>props.index&&(props.setTabIndex(parseInt(props.index)-1),
                    window.location.href="/order/rx#"+tabOptions[(parseInt(props.index)-1)].url)}>
                    <i className="icon-size fas fa-angle-right"></i></div>
            {tabOptions.map((tabItem,i)=>(
            <div className={tabIndex===i?"orderTabOpti activeOptiTab":"orderTabOpti"}
                 key={i} onClick={()=>{props.setTabIndex(i);window.location.href="/order/rx#"+tabItem.url}} >
                <span>{tabItem.tab}</span>
            </div>
            ))}
            <div className={props.index!==5?"preTab":"preTab disableTab"} 
                onClick={()=>props.index!==5&&(props.setTabIndex(parseInt(props.index)+1),
                    window.location.href="/order/rx#"+tabOptions[(parseInt(props.index)+1)].url)}>
                    <i className="icon-size fas fa-angle-left"></i></div>
        </div>
    )
}
export default OrderTab