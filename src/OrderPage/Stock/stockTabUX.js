function StockTab(props){
    const tabIndex = props.index;
    const tabOptions = [
        {tab:"اطلاعات نسخه و عدسی",url:"info"},
        {tab:"اطلاعات خدمات",url:"service"},
        {tab:"سفارش انبوه",url:"bulk"},];
    const url = window.location.href;
    if(url.split('#')[1])
        for(var i=0;i<tabOptions.length;i++)
            if(url.split('#')[1]===tabOptions[i].url){
                props.setTabIndex(i);
                break;
            }
    return(
        <div className="orderTabHolder">
            <div className="horizonCircle"></div>
            <div className="horizonLine"></div>
            {tabOptions.map((tabItem,i)=>(
            <div className="orderTab" key={i} 
                onClick={()=>{props.setTabIndex(i);
                window.location.href="/order/stock#"+tabItem.url}}>
                <img src={tabIndex===i?"/img/tabFull.png":"/img/tab.png"} />
                <span style={{color:tabIndex===i?"#fff":""}}>{tabItem.tab}</span>
            </div>
            ))}
        </div>
    )
}
export default StockTab