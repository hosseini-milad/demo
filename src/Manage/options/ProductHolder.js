import { useEffect, useState } from "react";
import env from "../../env";
function ProductHolder(){
    const [product,setProduct]= useState();
    console.log(product)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/product",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setProduct(result)
                
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
        <div className="reyhamPanel">
            {product&&product.data.map((product,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/edit-product/"+product._id}>
                <div className="imagePanel thumbPanel">
                    <img src={product.imageUrl&&(env.siteApiUrl+product.imageUrl)} />
                </div>
                <div className="textPanel">
                    <strong>{product.title}</strong>
                    <small>{product.description}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/edit-product/new"}>
                <div className="imagePanel">
                    <h2>+</h2>
                </div>
                <div className="textPanel">
                    <strong>افزودن جدید</strong>
                    
                </div>
            </div>
        </div>
    )
}
export default ProductHolder