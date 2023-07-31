import SimpleAuth from "../Components/simpleAuth";
import env from "../env";
import ProfileSection6 from "../ProfilePage/profileSection6";

const token = JSON.parse(localStorage.getItem('token-lenz'))
function ManageTab(props){
    const tabIndex = props.index;
    var tabOptions = [
        {tab:"مدیریت سفارش",icon:"shopping-bag",url:"orders",index:0},
        {tab:"Stock مدیریت",icon:"dollar",url:"price",index:1},
        {tab:"مدیریت RX",icon:"clock-o",url:"manufacture",index:2},
        {tab:"سفارشات",icon:"user-o",url:"customer",index:3},
        {tab:"تخفیف ها",icon:"envelope-o",url:"offers",index:4},
        {tab:"پیام ها",icon:"envelope-o",url:"messages",index:5},
        {tab:"تنظیمات",icon:"cog",url:"setting",index:6}
    ];
    if(token.access!=="manager")
    tabOptions = [
        {tab:"مدیریت سفارش ها",icon:"shopping-bag",url:"orders",index:0},
        
        {tab:"پیام ها",icon:"envelope-o",url:"messages",index:5}]
    if(token.access==="sale")
    tabOptions = [
        {tab:"مدیریت سفارش ها",icon:"shopping-bag",url:"orders",index:0},
        {tab:"سفارشات",icon:"user-o",url:"customer",index:3},
        
        {tab:"پیام ها",icon:"envelope-o",url:"messages",index:5}]
    const url = window.location.href;
    if(url.split('#')[1])
        for(var i=0;i<tabOptions.length;i++)
            if(url.split('#')[1]===tabOptions[i].url){
                props.setTabIndex(tabOptions[i].index+1);
                break;
            }
    return(
        <div className="profileTabHolder">
            <div className="logOut" 
                onClick={()=>{localStorage.removeItem('token-lenz');window.location.href="/login"}}
                >خروج</div>
            <div className="profileOut" onClick={()=>{window.location.href="#profile"; props.setTabIndex(10)}}>
                پروفایل کاربری
            </div>
            {tabOptions.map((tabItem,i)=>(
            <div className={tabItem.index+1===tabIndex?"profileTab profileTabActive":"profileTab"}
                 onClick={()=>(props.setTabIndex(tabItem.index+1),window.location.href="#"+tabItem.url)} key={i}>
                 <i className={"icon-size fas fa-"+tabItem.icon}></i>
                 {(tabItem.index===5&&props.logs&&props.logs.length)?<b className="messageCounter">{props.logs.length}</b>:''}
                <span>{tabItem.tab}</span>
            </div>
            ))}
            
        </div>
    )
}
export default ManageTab