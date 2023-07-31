import { useEffect, useState } from "react";
import ImageSimple from "../../Components/ImageSimple";
import TextField from '@material-ui/core/TextField';
import env, { normalPrice } from "../../env";
function ProductEdit(){
    const settingId= window.location.pathname.split('/')[2]
    //console.log(settingId)
    const urlParams = new URLSearchParams(window.location.search);
    const [title,setTitle]= useState();
    const [enTitle,setEnTitle]= useState();
    const [description,setDescription]= useState();
    const [fullDesc,setFullDesc]= useState();
    const [price,setPrice]= useState();
    const [config,setConfig]= useState();

    const [image,setImage]= useState();
    const [imageUrl,setImageUrl] = useState('')
    const [error,setError] = useState('')

    //console.log(description)

    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({id:settingId})
        }
        settingId!=="new"&&fetch(env.siteApi+"/setting/product",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setTitle(result.data[0].title);
                setDescription(result.data[0].description);
                setImageUrl(result.data[0].imageUrl);
                setEnTitle(result.data[0].enTitle);
                setConfig(result.data[0].config);
                setFullDesc(result.data[0].fullDesc);
                
                try{setPrice(JSON.parse(result.data[0].price))}catch{}
                //setImageUrl(env.siteApiUrl+"/"+ result.url)
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[])
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({base64image:image&&image.base64,
                                imgName:image&&image.fileName})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        image&&fetch(env.siteApi+"/setting/upload",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
                setImageUrl(result.url)
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[image])
    const registerOrder=(props)=>{
        console.log("reg now")
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({id:(settingId==="new"?'':settingId),
                title:title,description:description, imageUrl:imageUrl,
                config:config,colorPrice:JSON.stringify(price),
                fullDesc:fullDesc,enTitle:enTitle})
        }//URL.createObjectURL(image)
        console.log(postOptions)
        fetch(env.siteApi+"/setting/product/update",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result);
                setError("تغییرات ثبت شد");
                !props?setTimeout(()=>
                window.history.go(-1),1000):
                setTimeout(()=>
                window.location.reload(),2000)
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })
    }
    const setPriceFunc=(e,value)=>{
        const temp = JSON.parse(`{"${e}":"${value}"}`)
        //const temp = JSON.stringify({e:"234"})
        //console.log(temp)
        setPrice(pState => { return { ...pState, ...temp } });
    }
    //console.log(price)
    return(<>
        <div className="reyhamOption">
            
            <div className="imagePanel">
                <img src={imageUrl&&env.siteApiUrl+imageUrl} />
                <div className="reyhamUpload">
                <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} part={1}/>
                </div>
            </div>
            <div className="textPanel">
                <TextField label="عنوان" variant="outlined" 
                value={title||''} onChange={(e)=>setTitle(e.target.value)}/>
                <hr/>
                <TextField label="title" variant="outlined" 
                value={enTitle||''} onChange={(e)=>setEnTitle(e.target.value)}/>
                <hr/>
                <TextField label="توضیحات مختصر" variant="outlined"  multiline
                    minRows={4}
                    value={description||''} onChange={(e)=>setDescription(e.target.value)}/>
                <TextField label="توضیحات کامل" variant="outlined"  multiline
                    minRows={8} value={fullDesc||''} onChange={(e)=>setFullDesc(e.target.value)}/>
                <hr/>
                <TextField label="مشخصات فنی" variant="outlined"  multiline
                    minRows={8} value={config||''} onChange={(e)=>setConfig(e.target.value)}/>
                <hr/>
            
            </div>
        </div>
        <div className="orderContinue" style={{float: "none"}}>
            <input type="button" className="orderBtn" style={{margin: "auto"}} value="ذخیره و بازگشت"
                onClick={()=>registerOrder(0)}/>
            {settingId==="new"?<input type="button" className="orderBtn" style={{margin: "auto"}} value="ذخیره و جدید"
                onClick={()=>registerOrder(1)}/>:''}
        </div>
            <b className="errorLabel" style={{textAlign:"center"}}>{error}</b>
        </>
    )
}
export default ProductEdit