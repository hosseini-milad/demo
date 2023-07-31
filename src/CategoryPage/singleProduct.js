import env from "../env";

function SingleProduct(props){
    const product = props.product;
    return(<>
        {product&&<div className="productHolder">
            <div className="productImg">
                <img src={product.imageUrl?(env.siteApiUrl+product.imageUrl):"/img/lenz01.jpg"} alt={product.title} />
            </div>
            <div className="productDetail">
                <h4>{product.title}</h4>
                <sub>{product.description}</sub>
                <div className="productIcons">
                    <i className="icon-size fas fa-heart"></i>
                    <i className="icon-size fas fa-shopping-cart"></i> 
                </div>
                <a href={"/product/"+product.enTitle}>مشاهده محصول</a>
                <input className="productBtn" type="button" value="سفارش آنلاین"
                onClick={()=>window.location.href="/product/"+product.enTitle}/>
            </div>
        </div>}</>
    )
}
export default SingleProduct