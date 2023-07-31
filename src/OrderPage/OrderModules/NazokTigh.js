
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from "@material-ui/lab";
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { normalPrice } from '../../env';
import AutoComplete from '../../Components/AutoComplete';
const wWidth = window.innerWidth;

function NazokTigh(props){
    const [optionSelect,setOption] = useState(0);

    const options=props.xtra.map((item,i)=>(
        {NazokTigh:item.title,NazokTighPrice:item.colorPrice?
            normalPrice(item.colorPrice):"رایگان"}
    ))
    useEffect(() => {
        props.defData.NazokTigh&&
        props.defData.NazokTigh==="لبه تیغ"?setOption(1):setOption(2)
    },[])
    return(<>
        <div className="orderContinue rtlPrice" style={{width:"100%",float:"none"}}>
        {wWidth>700?<Autocomplete
                options={options.map(item=>item.NazokTigh)||[]} 
                //getOptionLabel={item=>item.NazokTigh||''}
                defaultValue={props.nazokTigh.NazokTigh}
                style={{ width: "50%"}}
                onChange={(_event, Brand)=>{props.setNazokTigh({NazokTigh:Brand,
                    NazokTighPrice:Brand?options.find(item=>item.NazokTigh===Brand).NazokTighPrice:''})}}
                renderInput={(params) =>
                <TextField {...params} label="خدمات بیشتر" variant="outlined"/>}
            />:
            <AutoComplete
                options={options.map(item=>item.NazokTigh)||[]}  
                //getOptionLabel={item=>item.NazokTigh||''}
                value={props.nazokTigh.NazokTigh}
                style={{ width: "50%"}}
                onValueChange={(Brand)=>{props.setNazokTigh({NazokTigh:Brand,
                    NazokTighPrice:Brand?options.find(item=>item.NazokTigh===Brand).NazokTighPrice:''})}}
                label="خدمات بیشتر" 
            />}
        </div>
        {props.nazokTigh&&props.nazokTigh.NazokTighPrice&&
        <div className="priceXtra rtlPrice">
            <span>قیمت: {
            props.nazokTigh.NazokTighPrice==="رایگان"?"رایگان":
            props.nazokTigh.NazokTighPrice+" ریال "}</span></div>
        }
    </>
    )
}
export default NazokTigh