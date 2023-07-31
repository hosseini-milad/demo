import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from "react";

function BrandExtra(props){
    const def = props.defData;

    const designOptions=["Ashpheric","DeAspheric","Vision"];
    const dKindOptions=["تدریجی","DeAspheric","Vision"];
    const coridorOptions=["انتخاب خودکار","انتخاب 2"]
    
    return(
        <div className='orderLenzData'>
            <div className='lenzData'>
                <div className="orderHeader">
                    <span>طراحی</span>
                </div>
                <Autocomplete
                    options={designOptions}
                    style={{ width: "100%"}}
                    defaultValue={def.design}
                    onChange={(_event, data)=>props.setBrandFilter(pState => {
                        return { ...pState, design: data }
                      })}
                    renderInput={(params) =>
                    <TextField {...params}    />}
                />
            </div>
            <div className='lenzData'>
                <div className="orderHeader">
                    <span>کریدور</span>
                </div>
                <Autocomplete
                    options={coridorOptions}
                    style={{ width: "100%"}}
                    defaultValue={def.coridor}
                    onChange={(_event, data)=>props.setBrandFilter(pState => {
                        return { ...pState, coridor: data }
                      })}
                    renderInput={(params) =>
                    <TextField {...params}    />}
                />
            </div>
            <div className='lenzData'>
                <div className="orderHeader">
                    <span>نوع عدسی</span>
                </div>
                <Autocomplete
                    options={dKindOptions}
                    style={{ width: "100%"}}
                    defaultValue={def.kind}
                    onChange={(_event, data)=>props.setBrandFilter(pState => {
                        return { ...pState, kind: data }
                      })}
                    renderInput={(params) =>
                    <TextField {...params} />}
                />
            </div>
        </div>
    )
}
export default BrandExtra