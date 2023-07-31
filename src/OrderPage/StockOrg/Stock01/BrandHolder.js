import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState ,useEffect} from "react";
import env,{ manualSort} from "../../../env";

function BrandHolder(props){
    const [manufactureList,setManufactureList] = useState()
    
    const def = props.defData;
    const [filterItems,setFilterItems] = useState()
    //const [filteredResult , setFilteredResult]= useState("");
    const [coridor , setCoridor]= useState(0)

    useEffect(() => {
        var body=filterItems?{
            facoryName:filterItems.facoryName,
            brand:filterItems.brandName,
            lenzType:filterItems.lenzType,
            lenzDesign:filterItems.lenzDesign,
            lenzIndex:filterItems.lenzIndex,
        }:{}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
          fetch(env.siteApi+"/order/manufacture/list",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setManufactureList(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    },[filterItems])
    useEffect(() => {
        
        setFilterItems(def)
    },[def])

    const clearForm=(fName,value)=>{
        const newJson = value?(JSON.parse(`{"${fName}":"${value}"}`)):''
        props.setPrice('')

        if(fName==='facoryName'){setFilterItems(newJson);setCoridor(0);}
        if(fName==='brandName'){setFilterItems(
            { facoryName:filterItems.facoryName, ...newJson })
            setCoridor(0)
        }
        if(fName==='lenzType'){setFilterItems(
            { facoryName:filterItems.facoryName,
              brandName:filterItems.brandName,   ...newJson })
              value==="تدریجی"?setCoridor(1):setCoridor(0)
            }
        if(fName==='lenzDesign')setFilterItems(
        { facoryName:filterItems.facoryName,
            brandName:filterItems.brandName,lenzType:filterItems.lenzType,...newJson })
        if(fName==='lenzIndex')setFilterItems(
            { facoryName:filterItems.facoryName,
                brandName:filterItems.brandName,lenzType:filterItems.lenzType,
                lenzDesign:filterItems.lenzDesign,...newJson })
        if(fName==='material')setFilterItems(
            { facoryName:filterItems.facoryName,
            brandName:filterItems.brandName,lenzType:filterItems.lenzType,
            lenzDesign:filterItems.lenzDesign,lenzIndex:filterItems.lenzIndex,
            ...newJson })
        /**/
    }
    return(
        <div className='orderLenzData' style={{flexDirection: "initial"}}>
            <div className='lenzData'>
                {/*<div className="orderHeader">
                    <span>Brand</span>
                </div>*/}
                {manufactureList&& <Autocomplete
                    options={manufactureList.manufacture||[]}
                    style={{ width: "100%"}}
                    value={filterItems&&filterItems.facoryName||''}
                    onChange={(e,value)=>clearForm("facoryName",value)}
                    /*onChange={(e,value)=>{setFilterItems({manufacture:value }
                      );props.setPrice('')}}*/
                    renderInput={(params) =>
                    <TextField {...params} label="شرکت" variant="outlined"/>}
                />}
            </div>
            <div className='lenzData'>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&manufactureList.brandList||[]}
                    disabled={filterItems&&filterItems.facoryName?false:true}
                    //getOptionLabel={option => option.enTitle||""}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.brandName}
                    value={filterItems&&filterItems.brandName||''}
                    onChange={(e,value)=>clearForm("brandName",value)}
                    renderInput={(params) =>
                    <TextField {...params} label="برند" variant="outlined"/>}
                />}
            </div>
            <div className='lenzData'>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&
                        manualSort(manufactureList.lenzType,["تکدید","دودید","تدریجی","تدریجی لایف استایل"])
                        ||[]}
                    disabled={filterItems&&filterItems.brandName?false:true}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.lenzType}
                    value={filterItems&&filterItems.lenzType||''}
                    onChange={(e,value)=>clearForm("lenzType",value)}
                    renderInput={(params) =>
                    <TextField {...params} label="نوع عدسی" variant="outlined"/>}
                />}
            </div>
            <div className='lenzData'>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&manufactureList.lenzDesign||[]}
                    disabled={filterItems&&filterItems.lenzType?false:true}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.lenzDesign}
                    value={filterItems&&filterItems.lenzDesign||''}
                    onChange={(e,value)=>clearForm("lenzDesign",value)}
                    renderInput={(params) =>
                    <TextField {...params} label="طراحی" variant="outlined"/>}
                />}
            </div>
            <div className='lenzData'>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&manufactureList.lenzIndex||[]}
                    disabled={filterItems&&filterItems.lenzDesign?false:true}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.lenzIndex}
                    value={filterItems&&filterItems.lenzIndex||''}
                    onChange={(e,value)=>clearForm("lenzIndex",value)}
                    //  value={selectedBrand&&selectedBrand.lenzIndex|| null}
                    renderInput={(params) =>
                    <TextField {...params}  label="ضریب شکست" variant="outlined"  />}
                />}
            </div>
            <div className='lenzData'>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&manufactureList.material||[]}
                    disabled={filterItems&&filterItems.lenzIndex?false:true}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.material}
                    value={filterItems&&filterItems.material||''}
                    onChange={(e,value)=>{clearForm("material",value)
                      value&&filterItems.lenzType!=="تدریجی"&&props.setPrice(
                        [manufactureList.rawData[0].lenzPrice.replaceAll(',', ''),
                        manufactureList.rawData[0].lenzDiscount.replaceAll(',', ''),
                        manufactureList.rawData[0].sku,
                        manufactureList.rawData[0].coridor])
                    }}
                    //  value={selectedBrand&&selectedBrand.material|| null}
                    renderInput={(params) =>
                    <TextField {...params}  label="متریال" variant="outlined"  />}
                />}
            </div>
            <div className='lenzData' style={{display:coridor?"block":"none"}}>
                {manufactureList&& <Autocomplete
                    options={manufactureList&&manufactureList.coridor||[]}
                    disabled={filterItems&&filterItems.material?false:true}
                    style={{ width: "100%"}}
                    //defaultValue={def&&def.material}
                    value={filterItems&&filterItems.coridor||''}
                    onChange={(e,value)=>{setFilterItems(pState => {
                        return { ...pState, coridor:value }
                      })
                      props.setPrice('')
                      value&&props.setPrice(
                        [manufactureList.rawData.find(item=>item.coridor===value).lenzPrice.replaceAll(',', ''),
                        manufactureList.rawData.find(item=>item.coridor===value).lenzDiscount.replaceAll(',', ''),
                        manufactureList.rawData.find(item=>item.coridor===value).sku,
                        manufactureList.rawData.find(item=>item.coridor===value).coridor])
                    }}
                    //  value={selectedBrand&&selectedBrand.material|| null}
                    renderInput={(params) =>
                    <TextField {...params}  label="کریدور" variant="outlined"  />}
                />}
            </div>
        </div>
    )
}
export default BrandHolder