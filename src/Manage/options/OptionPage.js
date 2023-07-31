import { useEffect, useState } from "react";
import ImageSimple from "../../Components/ImageSimple";
import TextField from '@material-ui/core/TextField';
import env, { normalPrice, purePrice } from "../../env";
import { Autocomplete } from "@material-ui/lab";
function OptionPage(){
    const settingId= window.location.pathname.split('/')[2]
    //console.log(settingId)
    const urlParams = new URLSearchParams(window.location.search);
    const [title,setTitle]= useState();
    const [description,setDescription]= useState();
    const [fullDesc,setFullDesc]= useState();
    const [colorCode,setColorCode]= useState();
    const [price,setPrice]= useState();
    const [brand,setBrand]= useState();
    const [hesabfa,setHesabfa]= useState();
    const [url,setUrl]= useState();
    const [image,setImage]= useState();
    const [imageUrl,setImageUrl] = useState('')
    const [error,setError] = useState('')

    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({id:settingId})
        }
        settingId!=="new"&&fetch(env.siteApi+"/setting/"+urlParams.get('type'),postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
                if(urlParams.get('type')!=="cover"){
                setTitle(result.data[0].title);
                setDescription(result.data[0].description);
                setImageUrl(result.data[0].imageUrl);
                setColorCode(result.data[0].colorCode);
                setUrl(result.data[0].url);
                setBrand(result.data[0].brand)
                setHesabfa(result.data[0].hesabfa)
                
                try{setPrice(JSON.parse(result.data[0].colorPrice))}
                catch{setPrice(result.data[0].colorPrice)}
                //setImageUrl(env.siteApiUrl+"/"+ result.url)
                }
                else{
                    setTitle(result.data[0].option);
                    setDescription(result.data[0].content);
                    //setColorCode(result.data[0].brand);
                    setBrand(result.data[0].brand)
                    setPrice(result.data[0].price)
                }
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
        //console.log("reg now")
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({id:(settingId==="new"?'':settingId),
                title:title,description:description, imageUrl:imageUrl,
                colorCode:colorCode, brand:brand,
                colorPrice:urlParams.get('type')==="xtra"?price:JSON.stringify(price),
                url:url,fullDesc:fullDesc,hesabfa:hesabfa})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/"+urlParams.get('type')+"/update",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                //console.log(result);
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
                {urlParams.get('type')==="pages"?<><TextField label="url" variant="outlined" 
                value={url||''} onChange={(e)=>setUrl(e.target.value)}/>
                <hr/></>:''}
                {(urlParams.get('type')==="slider"||urlParams.get('type')==="pages"||urlParams.get('type')==="stockservices"||
                  urlParams.get('type')==="blog"||urlParams.get('type')==="category"||urlParams.get('type')==="product"||
                  urlParams.get('type')==="cover"
                  )
                ?<TextField label="توضیحات" variant="outlined"  multiline
                    minRows={4}
                    value={description||''} onChange={(e)=>setDescription(e.target.value)}/>:
                    <TextField label="کدرنگ" variant="outlined" 
                    value={colorCode||''} onChange={(e)=>setColorCode(e.target.value)}
                    />} 
                {urlParams.get('type')==="blog"?<><TextField label="توضیحات کامل" variant="outlined"  multiline
                    minRows={8} value={fullDesc||''} onChange={(e)=>setFullDesc(e.target.value)}/><hr/></>:''}
            {(urlParams.get('type')==="mirror"||urlParams.get('type')==="color")?
            <div className="panelPrice">
                <TextField label="ESSENCE" variant="outlined" style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.essence)||''} onChange={(e)=>setPriceFunc("essence",e.target.value)}
                    />
                <TextField label="MGMPlus" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.mgmplus)||''} onChange={(e)=>setPriceFunc("mgmplus",e.target.value)}
                    />
                <TextField label="KODAK" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.kodak)||''} onChange={(e)=>setPriceFunc("kodak",e.target.value)}
                    />
                <TextField label="REVO" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.revo)||''} onChange={(e)=>setPriceFunc("revo",e.target.value)}
                    />
                <TextField label="OPTEX" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.optex)||''} onChange={(e)=>setPriceFunc("optex",e.target.value)}
                    />
                <TextField label="INDO" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.indo)||''} onChange={(e)=>setPriceFunc("indo",e.target.value)}
                    />
                <TextField label="CUSTOM" variant="outlined"  style={{margin: "auto 2%"}}
                    value={price&&normalPrice(price.custom)||''} onChange={(e)=>setPriceFunc("custom",e.target.value)}
                    />
            </div>:''}
            {(urlParams.get('type')==="xtra")?
            <div className="panelPrice">
                <TextField label="قیمت" variant="outlined" 
                    value={price&&normalPrice(price)||''} 
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>:''}
            {(urlParams.get('type')==="stockservices")?
            <div className="panelPrice">
                <TextField label="قیمت" variant="outlined" 
                    value={price&&normalPrice(price)||''} 
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                <TextField label="برند" variant="outlined" 
                    value={brand||''} 
                    onChange={(e)=>setBrand(e.target.value)}
                    />
                <TextField label="حسابفا" variant="outlined" 
                    value={hesabfa||''} 
                    onChange={(e)=>setHesabfa(e.target.value)}
                    />
                </div>:''}
            {(urlParams.get('type')==="cover")?
            <div className="panelPrice">
                <Autocomplete 
                    options={["ESSENCE","MGMPlus","KODAK","REVO","OPTEX","INDO","CUSTOM"]||[]}
                    value={brand||''}
                    onChange={(e,value)=>setBrand(value)}
                    style={{width:"225px"}}
                    renderInput={(params) =>
                    <TextField {...params} label="برند" variant="outlined"/>}
                />
                <TextField label="قیمت" variant="outlined" 
                    value={price&&normalPrice(price)||''} 
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>:''}
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
export default OptionPage