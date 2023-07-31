function ProfileTab(props){
    const tabIndex = props.index;
    const tabOptions = [
        {tab:"سفارش ها",icon:"shopping-bag",url:"orders"},
        {tab:"گزارشات",icon:"heart-o",url:"favourite"},
        
        {tab:"اطلاعات کاربری",icon:"user-o",url:"account"}];
    const url = window.location.href;
    {/*tab:"اعتبار من",icon:"clock-o",url:"visit"},
    {tab:"آدرس ها",icon:"map-o",url:"address"},*/}
    if(url.split('#')[1])
        for(var i=0;i<tabOptions.length;i++)
            if(url.split('#')[1]===tabOptions[i].url){
                props.setTabIndex(i+1);
                break;
            }
    return(
        <div className="profileTabHolder">
            <div className="logOut" 
                onClick={()=>{localStorage.removeItem('token-lenz');window.location.href="/login"}}
                >خروج</div>
            {tabOptions.map((tabItem,i)=>(
            <div className={i+1===tabIndex?"profileTab profileTabActive":"profileTab"}
                 onClick={()=>(props.setTabIndex(i+1),window.location.href="#"+tabItem.url)} key={i}>
                 <i className={"icon-size fas fa-"+tabItem.icon}></i>
                <span>{tabItem.tab}</span>
            </div>
            ))}
        </div>
    )
}
export default ProfileTab