import { useEffect, useState } from "react"
import env, { normalPrice } from "../../../env"
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core"

function SingleOrder(props){
    const [services, setServices] = useState()
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({brand:props.brand})
        }
        fetch(env.siteApi+"/setting/stockservices",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setServices(result.data);
                
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[])
    const addServiceToCart=(item,status)=>{
        status?props.setFaktorS(
            [ 
              ...props.faktorS,
              item
            ]
          ):props.setFaktorS(
            props.faktorS.filter(it => it._id!== item._id))
    }
    return(<>
        {services&&<div>
            {services.map((service,i)=>(
                !service.title.includes('گارانت')&&
                <div className="serviceField" key={i} >
                    <FormControlLabel label={service.title}
                control={<Checkbox onChange={(e,value)=>{addServiceToCart(service,value)}}
                defaultChecked={false}/>}/>
                    <small>{normalPrice(service.colorPrice)} تومان</small>
                </div>
            ))}</div>}</>
    )
}
export default SingleOrder