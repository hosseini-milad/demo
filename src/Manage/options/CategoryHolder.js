import { useEffect, useState } from "react";
import env from "../../env";
function CategoryHolder(){
    const [category,setCategory]= useState();
    console.log(category)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/category",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setCategory(result)
                
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
            {category&&category.data.map((category,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+category._id+"?type=category"}>
                <div className="imagePanel thumbPanel">
                    <img src={category.imageUrl&&(env.siteApiUrl+category.imageUrl)} />
                </div>
                <div className="textPanel">
                    <strong>{category.title}</strong>
                    <small>{category.description}</small>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=category"}>
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
export default CategoryHolder