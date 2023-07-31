import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";

function Filters(props){
    const manufactureList = props.manufactureList;
    //const brandList = props.brandList
    //console.log(manufactureList.lenzType)
    return(
        <div className="filterItems">
            <Autocomplete
                options={manufactureList.manufacture||[]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, manufacture:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="شرکت"/>}
            />
            <Autocomplete
                options={manufactureList.brandList||[]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, brandName:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="برند"/>}
            />
            <Autocomplete
                options={(manufactureList.lenzType&&manufactureList.lenzType.length>1)?manufactureList.lenzType:[]||[]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, lenzType:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="نوع عدسی"/>}
            />
            <Autocomplete
                options={(manufactureList.lenzDesign&&manufactureList.lenzDesign.length>1)?manufactureList.lenzDesign:[]||[]} 
                freeSolo
                style={{ width: "100%"}}
                
                onChange={(_event, Value)=>props.setManResult(pState => 
                    {return { ...pState, lenzDesign:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="طراحی"/>}
            />
            <Autocomplete
            options={manufactureList.lenzIndex||[]} 
            freeSolo
            style={{ width: "100%"}}
            
            onChange={(_event, Value)=>props.setManResult(pState => 
                {return { ...pState, lenzIndex:Value }}
            )}
            renderInput={(params) =>
            <TextField {...params} label="ض.شکست"/>}
            />
            <Autocomplete
            options={manufactureList.material||[]} 
            freeSolo
            style={{ width: "100%"}}
            
            onChange={(_event, Value)=>props.setManResult(pState => 
                {return { ...pState, material:Value }}
            )}
            renderInput={(params) =>
            <TextField {...params} label="متریال"/>}
        />
            <TextField label="کد محصول" style={{ width: "100%"}}
            onChange={(e)=>props.setManResult(pState => 
                {return { ...pState, sku:e.target.value }}
            )}/>
        </div>
    )
}
export default Filters