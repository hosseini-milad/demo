import SingleProduct from "../CategoryPage/singleProduct"

function ProfileSection5(){
    return(
        <div className="favHolder">
            <h2 className="profileTitle">پیغام ها</h2>
            <small className="more">{"مشاهده همه ->"}</small>
            <hr/>
            <div className="messageHolder">
                <div className="messageHeader">
                    <span>موضوع پیام: عدسی های جدید اسنس</span>
                    <span>24/05/1401</span>
                </div>
                <div className="messageBody">
                    <span>همکار گرامی لطفا برای دریافت آخرین قیمت اسنس، فایل <br/>
                    قیمت زیر را دانلود کنید</span>
                    <div className="messageBtnHolder">
                        <input type="button" className="orderBtn messageBtn" value="دانلود لیست قیمت" />
                    </div>
                </div>
                <div className="messageIconHolder">
                    <div className="messageIcon">
                        <span>حذف پیام</span>
                        <i className="icon-size fas fa-remove"></i>
                    </div>
                </div>
            </div>
            <div className="messageHolder">
                <div className="messageHeader">
                    <span>موضوع پیام: عدسی های جدید اسنس</span>
                    <span>24/05/1401</span>
                </div>
                <div className="messageBody">
                    <span>همکار گرامی لطفا برای دریافت آخرین قیمت اسنس، فایل <br/>
                    قیمت زیر را دانلود کنید</span>
                    <div className="messageBtnHolder">
                        <input type="button" className="orderBtn messageBtn" value="دانلود لیست قیمت" />
                        <input type="button" className="orderBtn messageBtn" value="دانلود لیست قیمت" />
                    </div>
                </div>
                <div className="messageIconHolder">
                    <div className="messageIcon">
                        <span>حذف پیام</span>
                        <i className="icon-size fas fa-remove"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileSection5