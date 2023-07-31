import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect } from "react";
import { useState } from "react";
import env, { removeNull } from "../../../env";
import AutoComplete from '../../../Components/AutoComplete'

function BrandHolderStockMobile(props){
    const def = props.defData;
    const [brandSelect , setBrandSelect]= useState("")
    const [selectedBrand,setSelectBrand] = useState(def)
    
    const [existItems , setExistItems]= useState()
    console.log(props.brandFilter)

    useEffect(() => {
        const body=props.brandFilter.brandName?{
            brandName:props.brandFilter.brandName,
            lenzIndex:props.brandFilter.lenzIndex,
            material:props.brandFilter.material,
            coating:props.brandFilter.coating
        }:{}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/product/exists-brands",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setTimeout(()=> setExistItems(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[props.brandFilter])
    
    const updateQuery=(field,rawValue)=>{
        const value = rawValue;
        if(field==="coating")
            props.setBrandFilter(pState => {
            return { ...pState, coating: value }
            })  
        if(field==="material")
            props.setBrandFilter(pState => {
                return { ...pState, material: value ,coating:""}
            }) 
        if(field==="lenzIndex")
            props.setBrandFilter(pState => {
                return { ...pState,lenzIndex:value, material: "" ,coating:""}
            })    

        if(field==="brandName")
        props.setBrandFilter({brandName:value})
    }
    
    return(
        <div className='orderLenzData ltr'>
            <div className='lenzData'>
                {existItems&& <AutoComplete
                    options={existItems?existItems.brandName:[]}
                    style={{ width: "100%"}}
                    value={props.brandFilter.brandName||''}
                    onValueChange={(data)=>updateQuery("brandName",data)}
                    label="Brand" 
                />}
            </div>
            <div className='lenzData'>
                {existItems&& <AutoComplete
                    disabled={props.brandFilter.brandName?false:true}
                    options={existItems?existItems.lenzIndex:[]}
                    style={{ width: "100%"}}
                    onValueChange={(data)=>updateQuery("lenzIndex",data)}
                    value={props.brandFilter.lenzIndex|| null}
                    label="Lens Index"
                />}
            </div>
            <div className='lenzData'>
                {existItems&& <AutoComplete
                    disabled={props.brandFilter.lenzIndex?false:true}
                    options={existItems?existItems.material:[]}
                    style={{ width: "100%"}}
                    onValueChange={(data)=>updateQuery("material",data)}
                    value={props.brandFilter.material|| null}
                    label="Material"
                />}
            </div>
            {/*<div className='lenzData'>
                <TextField label="Coating" value={(existItems&&existItems.coating
                            &&existItems.coating.length===1)?
                            existItems.coating[0]:''}
             variant="outlined" disabled={true}/>
             </div>
            <div className='lenzData'>
                {existItems&& <AutoComplete
                    disabled={props.brandFilter.material?false:true}
                    options={existItems?removeNull(existItems.coating):[]}
                    style={{ width: "100%"}}
                    onValueChange={(data)=>updateQuery("coating",data)}
                    value={props.brandFilter.coating|| null}
                    label="Coating"
                />}
                </div>*/}
        </div>
    )
}
export default BrandHolderStockMobile