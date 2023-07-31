import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Component } from "react";
import { useState ,useEffect} from "react";
import MultiPicker from "rmc-picker-scroll/es/MultiPicker";
import Picker from "rmc-picker-scroll/es/Picker";
import 'rmc-picker/assets/index.css';
import AutoComplete from "../../../Components/AutoComplete";
import env,{ checkNull, manualSort, removeNull} from "../../../env";

function BrandHolderMobile(props){
    const [manufactureList,setManufactureList] = useState()
    const component = new Component();
    const def = props.defData;
    const [filterItems,setFilterItems] = useState()
    //const [filteredResult , setFilteredResult]= useState("");
    const [coridor , setCoridor]= useState(0)
    console.log(filterItems)
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
        //if(def.coridor)setCoridor(1)
        setFilterItems(def)
    },[def])

    const clearForm=(fName,value)=>{
        const newJson = value?(JSON.parse(`{"${fName}":"${value}"}`)):''
        props.setPrice('-1')

        if(fName==='facoryName'){setFilterItems(newJson);setCoridor(0);}
        if(fName==='brandName'){setFilterItems(
            { facoryName:filterItems.facoryName, ...newJson })
            setCoridor(0)
        }
        if(fName==='lenzType'){setFilterItems(
            { facoryName:filterItems.facoryName,
              brandName:filterItems.brandName,   ...newJson })
              //value==="تدریجی"?setCoridor(1):setCoridor(0)
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
        <div className='orderLenzData rxOrder' style={{flexDirection: "initial"}}>
            <div className="mobileField">
                <div className="mobileFieldHeader">تولید کننده</div>
                <div className='lenzData'>
                {manufactureList&&<AutoComplete label="نوع عدسی" 
                    value={"عادل لنز"}
                    options={removeNull(manufactureList.manufacture)}
                />}

                {/*manufactureList&&
                    <Picker 
                    onValueChange={(value)=>clearForm("facoryName",value)}
                    selectedValue={filterItems&&filterItems.facoryName}>
                        {[""].concat(removeNull(manufactureList.manufacture)).map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"انتخاب تولید کننده"}</Picker.Item>
                        ))}
                        
                        </Picker>*/}
                </div>
            </div>
            <div className="mobileField mobileOdd">
                <div className="mobileFieldHeader">برند</div>
                <div className='lenzData'>
                {manufactureList&&manufactureList.brandList&&
                    <Picker 
                    onValueChange={(value)=>clearForm("brandName",value)}
                    selectedValue={filterItems&&filterItems.brandName}
                    disabled={filterItems&&filterItems.facoryName?false:true}>
                        {[""].concat(removeNull(manufactureList.brandList)).map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"انتخاب برند"}</Picker.Item>
                        ))}
                        
                </Picker>}
                </div>
            </div>
            <div className="mobileField">
                <div className="mobileFieldHeader">نوع عدسی</div>
                <div className='lenzData'>
                {manufactureList&&
                    <Picker onValueChange={(value)=>clearForm("lenzType",value)}
                    selectedValue={filterItems&&filterItems.lenzType}
                    disabled={filterItems&&filterItems.brandName?false:true}>
                        {[""].concat(manualSort(manufactureList.lenzType,["تکدید","دودید","تدریجی","تدریجی لایف استایل"]))
                            .map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"انتخاب نوع عدسی"}</Picker.Item>
                        ))}
                        
                </Picker>}
                </div>
            </div>
            <div className="mobileField mobileOdd">
                <div className="mobileFieldHeader">طراحی</div>
                <div className='lenzData'>
                {manufactureList&&
                    <Picker onValueChange={(value)=>clearForm("lenzDesign",value)}
                    selectedValue={filterItems&&filterItems.lenzDesign}
                    disabled={filterItems&&filterItems.lenzType?false:true}>
                        {[""].concat(manufactureList.lenzDesign).map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"انتخاب طراحی"}</Picker.Item>
                        ))}
                        
                </Picker>}
                </div>
            </div>
            <div className="mobileField">
                <div className="mobileFieldHeader">ضریب شکست</div>
                <div className='lenzData'>
                {manufactureList&&
                    <Picker onValueChange={(value)=>clearForm("lenzIndex",value)}
                    selectedValue={filterItems&&filterItems.lenzIndex}
                    disabled={filterItems&&filterItems.lenzDesign?false:true}>
                        {[""].concat(manufactureList.lenzIndex).map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"ضریب شکست"}</Picker.Item>
                        ))}
                        
                </Picker>}
                </div>
            </div>
            <div className="mobileField mobileOdd">
                <div className="mobileFieldHeader">متریال</div>
                <div className='lenzData'>
                {manufactureList&&
                    <Picker onValueChange={(value)=>{clearForm("material",value)
                    value&&props.setPrice(
                    [manufactureList.rawData[0].lenzPrice.replaceAll(',', ''),
                    manufactureList.rawData[0].lenzDiscount.replaceAll(',', ''),
                    manufactureList.rawData[0].sku,
                    manufactureList.rawData[0].lenzType==="تدریجی"?"1":"",
                    manufactureList.rawData[0].lenzType==="دودید"?"1":""])
                }}
                    selectedValue={filterItems&&filterItems.material}
                    disabled={filterItems&&filterItems.lenzIndex?false:true}>
                        {[""].concat(manufactureList.material).map((pickerData,i)=>(
                            <Picker.Item key={i} className="my-picker-view-item"
                            value={pickerData}>{pickerData?pickerData:"انتخاب متریال"}</Picker.Item>
                        ))}
                        
                </Picker>}
                </div>
            </div>
        </div>
    )
}
export default BrandHolderMobile