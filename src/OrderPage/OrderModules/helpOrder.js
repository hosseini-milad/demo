function HelpOrder(){
    return(
        <div className="orderHolder">
            <h3>راهنمای ثبت سفارش</h3>
            برای ثبت سفارش مراحل زیر را طی کنید: 
            <ul><li>
            <a className="helpOrder" href="/profile#account">اطلاعات کاربری خود را تکمیل کنید </a>
            <a className="profileBtn" href="/profile#account">اطلاعات کاربری</a></li>
            <li>کارشناسان MGM با شما تماس خواهند گرفت </li>
            <li>بعد از احراز هویت، می توانید به راحتی ثبت سفارش نمایید </li>
            </ul>
        </div>
    )
}
export default HelpOrder