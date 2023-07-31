import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Component } from "react";
import { useState ,useEffect} from "react";
import AutoComplete from "../../../Components/AutoComplete";
import env,{ checkNull, manualSort, removeNull} from "../../../env";
const token = JSON.parse(localStorage.getItem('token-lenz'))

function BrandHolderMobile(props){
    const [manufactureList,setManufactureList] = useState()
    const component = new Component();
    const def = props.defData;
    const [filterItems,setFilterItems] = useState()
    const [activeItem,setActiveItem] = useState()
    //const [filteredResult , setFilteredResult]= useState("");
    const [coridor , setCoridor]= useState(0)
    //console.log(filterItems)
    useEffect(() => {
        var body=filterItems?{
            facoryName:filterItems.facoryName,
            brand:filterItems.brandName,
            lenzType:filterItems.lenzType,
            lenzDesign:filterItems.lenzDesign,
            lenzIndex:filterItems.lenzIndex,
            coridor:filterItems.coridor
        }:{}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            'x-access-token':token.token,
            'userId':token.userId},
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
        //if(def.coridor)setCoridor(1)
        setFilterItems(def)
    },[def])

    const clearForm=(fName,value)=>{
        const newJson = value?(JSON.parse(`{"${fName}":"${value}"}`)):''
        props.setPrice('-1')

        if(fName==='facoryName'){setFilterItems(newJson);setCoridor(0);setActiveItem(0);}
        if(fName==='brandName'){setFilterItems(
            { facoryName:filterItems.facoryName, ...newJson })
            setCoridor(0);setActiveItem(1);
        }
        if(fName==='lenzType'){setFilterItems(
            { facoryName:filterItems.facoryName,
              brandName:filterItems.brandName,   ...newJson })
              //value==="تدریجی"?setCoridor(1):setCoridor(0)
              setActiveItem(2);
            }
        if(fName==='lenzDesign'){setActiveItem(3);setFilterItems(
        { facoryName:filterItems.facoryName,
            brandName:filterItems.brandName,lenzType:filterItems.lenzType,...newJson })}
        if(fName==='lenzIndex'){setActiveItem(4);setFilterItems(
            { facoryName:filterItems.facoryName,
                brandName:filterItems.brandName,lenzType:filterItems.lenzType,
                lenzDesign:filterItems.lenzDesign,...newJson })}
        if(fName==='material'){setActiveItem(5);setFilterItems(
            { facoryName:filterItems.facoryName,
            brandName:filterItems.brandName,lenzType:filterItems.lenzType,
            lenzDesign:filterItems.lenzDesign,lenzIndex:filterItems.lenzIndex,
            ...newJson })}
        /**/
    }
    return(
        <div className='orderLenzData rxOrder' style={{flexDirection: "initial"}}>
            <div className="mobileField">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="تولید کننده" 
                        value={filterItems&&filterItems.facoryName}
                        onValueChange={(value)=>clearForm("facoryName",value)}
                        options={removeNull(manufactureList.manufacture)}
                        active={activeItem===0?true:false} dir="rtl"
                    />}
                </div>
            </div>
            <div className="mobileField mobileOdd">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="برند" 
                        value={filterItems&&filterItems.brandName}
                        onValueChange={(value)=>{clearForm("brandName",value);props.setBrand(value)}}
                        options={removeNull(manufactureList.brandList)}
                        disabled={filterItems&&filterItems.facoryName?false:true}
                        active={activeItem===1?true:false} dir="rtl"
                    />}
                </div>
            </div>
            <div className="mobileField">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="نوع عدسی" 
                        value={filterItems&&filterItems.lenzType}
                        onValueChange={(value)=>{clearForm("lenzType",value);
                    props.setDodid(value)}}
                        options={
                            manualSort(removeNull(manufactureList.lenzType),["تکدید","دودید","تدریجی","تدریجی لایف استایل"])
                            ||[]}
                        disabled={filterItems&&filterItems.brandName?false:true}
                        active={activeItem===2?true:false} dir="rtl"
                    />}
                </div>
            </div>
            <div className="mobileField">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="طراحی" 
                        value={filterItems&&filterItems.lenzDesign}
                        onValueChange={(value)=>clearForm("lenzDesign",value)}
                        options={removeNull(manufactureList.lenzDesign)}
                        disabled={filterItems&&filterItems.lenzType?false:true}
                        active={activeItem===3?true:false} dir="rtl"
                    />}
                </div>
            </div>
            <div className="mobileField">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="ضریب شکست" 
                        value={filterItems&&filterItems.lenzIndex}
                        onValueChange={(value)=>clearForm("lenzIndex",value)}
                        options={removeNull(manufactureList.lenzIndex)}
                        disabled={filterItems&&filterItems.lenzDesign?false:true}
                        active={activeItem===4?true:false} dir="rtl"
                    />}
                </div>
            </div>
            <div className="mobileField">
                <div className='lenzData'>
                    {manufactureList&&<AutoComplete label="متریال" 
                        value={filterItems&&filterItems.material}
                        onValueChange={(value)=>{clearForm("material",value)
                        value&&props.setPrice(
                        [manufactureList.rawData.find(item=>item.material===value).lenzPrice&&
                            manufactureList.rawData.find(item=>item.material===value).lenzPrice.replaceAll(',', ''),
                        manufactureList.rawData.find(item=>item.material===value).lenzDiscount&&
                            manufactureList.rawData.find(item=>item.material===value).lenzDiscount.replaceAll(',', ''),
                        manufactureList.rawData.find(item=>item.material===value).sku,
                        manufactureList.rawData.find(item=>item.material===value).lenzType==="تدریجی"?"1":"",
                        manufactureList.rawData.find(item=>item.material===value).lenzType==="دودید"?"1":""])
                    }}
                        options={removeNull(manufactureList.material)}
                        disabled={filterItems&&filterItems.lenzIndex?false:true}
                        active={activeItem===5?true:false} dir="rtl"
                    />}
                </div>
            </div>
        </div>
    )
}
export default BrandHolderMobile