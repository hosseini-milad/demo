import BreadCrumb from "../Components/BreadCrumb"
import ImagePart from "../ProductPage/imagePart"
import MainProduct from "../ProductPage/MainProduct"
import { useState,useEffect } from "react";
import env from "../env";

function Product(){
    var enTitle = '';
    try{
        enTitle=window.location.pathname.split('/')[2];
    }
    catch{}
    const [product,setProduct] = useState('')
    console.log(product);
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },body:JSON.stringify({enTitle:enTitle})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/productEN",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setProduct(result.data)
                
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[])
    return(
        <main className="pagesMain">
            <BreadCrumb />
            {product&&<div className="productMainHolder">
                <ImagePart product={product} />
                <MainProduct product={product}/>
            </div>}
            {product&&<div className="categorySeo">
                <h2>{product.title}</h2>
                <p dangerouslySetInnerHTML={{__html:
                product.fullDesc}} ></p>

            </div>}
        </main>
    )
}
export default Product