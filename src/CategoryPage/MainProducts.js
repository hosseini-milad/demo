import SingleProduct from "../CategoryPage/singleProduct";

function MainProductList(props){
    return(
        <div className="productList">
            {props.product.data.map((product,i)=>(
                <div className="productSingle" key={i}>
                    <SingleProduct product={product}/>
                </div>
            ))}
        </div>
    )
}
export default MainProductList