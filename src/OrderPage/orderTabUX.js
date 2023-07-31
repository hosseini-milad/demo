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
        <div className="orderTabHolder">
            <div className="horizonCircle"></div>
            <div className="horizonLine"></div>
            {tabOptions.map((tabItem,i)=>(
            <div className="orderTab" key={i} onClick={()=>{props.setTabIndex(i);window.location.href="/order/rx#"+tabItem.url}} >
                <img src={tabIndex===i?"/img/tabFull.png":"/img/tab.png"} />
                <span style={{color:tabIndex===i?"#fff":""}}>{tabItem.tab}</span>
            </div>
            ))}
        </div>
    )
}
export default OrderTab