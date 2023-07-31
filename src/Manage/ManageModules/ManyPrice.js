import { useState } from "react"
import env, { normalPrice } from "../../env"

function ManyPrice(props){
    const [price,setPrice] = useState(0)
    const [error,setError] = useState('')
    //console.log(props.content)
    const changeAllValue=(priceKind)=>{
        if(props.content.brandList.length!==1)
        {
            setError("برند باید انتخاب شود")
            setTimeout(()=>setError(""),3000)
            return
        }
        if(price.length>4){
            const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify({sku:props.content.allStock,
                price:priceKind===1?(price&&price.replaceAll( ',', '')):'',
                purchase:priceKind===2?(price&&price.replaceAll( ',', '')):'',
                price1:!priceKind?(price&&price.replaceAll( ',', '')):''})
        }
        //console.log(priceKind)
        //console.log(postOptions)
        fetch(env.siteApi+"/order/stock/price",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            props.setPriceSet(Math.random(10))
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
    }
    const changePurchaseValue=()=>{
        if(price.length<2){
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify({sku:props.content.allStock,purchase:price&&price.replaceAll( ',', '')})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/order/stock/purchase",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            props.setPriceSet(Math.random(10))
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
    }
    return(<div className="ManyHolder">
        <input placeholder="قیمت واحد" onChange={(e)=>setPrice(e.target.value)} value={normalPrice(price)} style={{width:"90px"}}/>
        <input style={{margin:"auto 10px",padding:"2px 10px",fontSize:"12px"}} className={price.length<4?"orderTabOpti disBtn":"orderTabOpti activeOptiTab" }
            type="button" value="اعلامیه قیمت" onClick={()=>changeAllValue("")}/>
        <input style={{margin:"auto 10px",padding:"2px 10px",fontSize:"12px"}} 
            className={price.length<4?"orderTabOpti disBtn":"orderTabOpti activeOptiTab" }
            type="button" value="قیمت فروش" onClick={()=>changeAllValue(1)}/>
        <input style={{margin:"auto 10px",padding:"2px 10px",fontSize:"12px"}} className={price.length<4?"orderTabOpti disBtn":"orderTabOpti activeOptiTab" }
            type="button" value="قیمت خرید" onClick={()=>changeAllValue(2)}/>
            {error}
    </div>
    )
}
export default ManyPrice