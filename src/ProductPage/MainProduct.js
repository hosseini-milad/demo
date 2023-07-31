

function MainProduct(props){
    const product = props.product;
    
    return(
        <div className="mainProductPart">
            {product&&<>
            <div className="productSpecification">
                <h2>مشخصات فنی</h2>
                <div dangerouslySetInnerHTML={{__html:
                product.config}} ></div>
                {/*<ul>
                    <li>Coridor:13 to 18</li>
                    <li>Fitting:+4</li>
                    <li>Far: 1</li>
                    <li>Intermidiate:3</li>
                    <li>Near:4</li>
            </ul>*/}
            </div>
            <div className="productDescription">
                <h2>توضیحات</h2>
                <p dangerouslySetInnerHTML={{__html:
                product.description}} ></p>
                {/*<p>
                    تطابق راحت و آسان بین دید دور و نزدیک
                    قابل سفارش در ۳ کریدور ۱۴، ۱۶ و ۱۸ و کاهش محدودیت در انتخاب فریم
                    کاهش آستیگمات ناخواسته اطراف عدسی
                    دید راحت در تمامی جهات
                    قابل تولید در تمامی ایندکس‌ها
        </p>*/}
            </div>
            <span>مناسب برای تمامی افراد</span>
            <div className="productAddCartBtn">
                <input type="button" className="orderBtn" value="تماس با واحد پشتیبانی" 
                    onClick={()=>{}}/>
                <input type="button" className="orderBtn orderEtc" value="واتساپ" 
                    onClick={()=>{}}/>
            </div></>}
        </div>
    )
}
export default MainProduct