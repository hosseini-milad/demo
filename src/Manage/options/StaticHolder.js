import { useEffect, useState } from "react";
import env from "../../env";
function PagesHolder(){
    const [pages,setPages]= useState();
    console.log(pages)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/pages",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setPages(result)
                
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
            {pages&&pages.data.map((pages,i)=>(
            <div className="reyhamItemHolder" key={i}
                onClick={()=>window.location.href="/setting/"+pages._id+"?type=pages"}>
                <div className="imagePanel">
                    <img src={pages.imageUrl&&env.siteApiUrl+pages.imageUrl} />
                </div>
                <div className="textPanel">
                    <strong>{pages.title}</strong>
                </div>
            </div>))}
            <div className="reyhamItemHolder" 
                onClick={()=>window.location.href="/setting/new?type=pages"}>
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
export default PagesHolder