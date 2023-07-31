import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect } from "react";
import { useState } from "react";
import env from "../../../env";

function BrandHolderStock(props){
    const def = props.defData;
    const [brandSelect , setBrandSelect]= useState("")
    const [selectedBrand,setSelectBrand] = useState(def)
    
    const [existItems , setExistItems]= useState()
    console.log(props.brandFilter)

    useEffect(() => {
        const body={
            brandName:props.brandFilter.brandName,
            lenzIndex:props.brandFilter.lenzIndex,
            material:props.brandFilter.material,
            coating:props.brandFilter.coating
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        console.log(postOptions)
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
                {existItems&& <Autocomplete
                    options={existItems?existItems.brandName:[]}
                    style={{ width: "100%"}}
                    value={props.brandFilter.brandName||''}
                    onChange={(_event, data)=>updateQuery("brandName",data)}
                    renderInput={(params) =>
                    <TextField {...params} label="Brand" variant="outlined"/>}
                />}
            </div>
            <div className='lenzData'>
                {existItems&& <Autocomplete
                    disabled={props.brandFilter.brandName?false:true}
                    options={existItems?existItems.lenzIndex:[]}
                    style={{ width: "100%"}}
                    onChange={(_event, data)=>updateQuery("lenzIndex",data)}
                    value={props.brandFilter.lenzIndex|| null}
                    renderInput={(params) =>
                    <TextField {...params}  label="Lens Index" variant="outlined"  />}
                />}
            </div>
            <div className='lenzData'>
                {existItems&& <Autocomplete
                    disabled={props.brandFilter.lenzIndex?false:true}
                    options={existItems?existItems.material:[]}
                    style={{ width: "100%"}}
                    onChange={(_event, data)=>updateQuery("material",data)}
                    value={props.brandFilter.material|| null}
                    renderInput={(params) =>
                    <TextField {...params}  label="Material" variant="outlined"  />}
                />}
            </div>
            <div className='lenzData'>
                {existItems&& <Autocomplete
                    disabled={props.brandFilter.material?false:true}
                    options={existItems?existItems.coating:[]}
                    style={{ width: "100%"}}
                    onChange={(_event, data)=>updateQuery("coating",data)}
                    value={props.brandFilter.coating|| null}
                    renderInput={(params) =>
                    <TextField {...params} label="Coating" variant="outlined"/>}
                />}
            </div>
        </div>
    )
}
export default BrandHolderStock