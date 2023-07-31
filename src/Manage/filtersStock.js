import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useState,useEffect } from "react";

function FilterStock(props){
    const brandList = props.content
    const [markSph,setMarkSph] = useState(1);
    //console.log(props)
    const [sphOptions,setSphOptions] = useState(0)
    useEffect(()=>{
        setSphOptions(markSph?["6","4","2"]:["-2","-4","-6"]);
        
    },[markSph])
    return(
        <div className="autoFilter">
            {brandList&&<><div className="filterItems">
            <Autocomplete
                options={brandList.brandList||{}} 
                freeSolo
                style={{ width: "100%"}}
                value={props.stockResult.brand||''}
                onChange={(_event, Value)=>props.setStockResult(pState => 
                    {return { ...pState, brand:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="برند"/>}
            />
            <Autocomplete
                options={brandList.lenzIndexList||[]} 
                freeSolo
                style={{ width: "100%"}}
                value={props.stockResult.lenzIndex||''}
                
                onChange={(_event, Value)=>props.setStockResult(pState => 
                    {return { ...pState, lenzIndex:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="ضریب شکست"/>}
            />
            <Autocomplete
                options={brandList.materialList||[]} 
                freeSolo
                style={{ width: "100%"}}
                value={props.stockResult.material||''}
                
                onChange={(_event, Value)=>props.setStockResult(pState => 
                    {return { ...pState, material:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="متریال"/>}
                />
            <Autocomplete
                options={brandList.coatingList||[]} 
                freeSolo
                style={{ width: "100%"}}
                value={props.stockResult.coating||''}
                
                onChange={(_event, Value)=>props.setStockResult(pState => 
                    {return { ...pState, coating:Value }}
                )}
                renderInput={(params) =>
                <TextField {...params} label="پوشش"/>}
                />

                {/*<Autocomplete
                        options={["6.00","4.00","2.00","0.00","-2.00","-4.00","-6.00"]} 
                        freeSolo
                        style={{ width: "100%"}}
                        value={props.stockResult.sphF||''}
                        
                        onChange={(_event, Value)=>props.setStockResult(pState => 
                            {return { ...pState, sphF:Value }}
                        )}
                        renderInput={(params) =>
                        <TextField {...params} label="SPH From"/>}
                        />*/}
                    <div className='positiveBtn' style={{margin:"20px 0 0 20px",position:"relative"}}
                     >
                        <span className={markSph?"pBtn":"dBtn"} onClick={()=>setMarkSph(1)}>+</span>
                        <span className={!markSph?"nBtn":"dBtn"} onClick={()=>setMarkSph(0)}>-</span>
                        <TextField label="SPH Fix" className="sphFix"
                         defaultValue={props.stockResult.sphFix}
                        onChange={(e)=>(e.target.value.length>4||e.target.value==="0.00"||e.target.value==="")&&
                        props.setStockResult(pState => 
                            {return { ...pState, sphFix:e.target.value }}
                        )} />
                        <TextField label="CYL Fix" className="sphFix" style={{left:"130px"}}
                         defaultValue={props.stockResult.cylFix}
                        onChange={(e)=>(e.target.value.length>4||e.target.value==="0.00"||e.target.value==="")&&
                        props.setStockResult(pState => 
                            {return { ...pState, cylFix:e.target.value }}
                        )} />
                    </div>
                    <Autocomplete
                        options={sphOptions} 
                        freeSolo
                        style={{ width: "100%"}}
                        value={props.stockResult.sphT||''}
                        
                        onChange={(_event, Value)=>props.setStockResult(pState => 
                            {return { ...pState, sphT:Value }}
                        )}
                        renderInput={(params) =>
                        <TextField {...params} label="SPH"/>}
                    />
                    
                    <Autocomplete
                        options={["-2.00","-4.00","-6.00"]} 
                        freeSolo
                        style={{ width: "100%"}}
                        value={props.stockResult.cyl||''}
                        
                        onChange={(_event, Value)=>props.setStockResult(pState => 
                            {return { ...pState, cyl:Value }}
                        )}
                        renderInput={(params) =>
                        <TextField {...params} label="CYL"/>}
                    />
                    <Autocomplete
                    options={["65","70","75"]} 
                    freeSolo
                    style={{ width: "100%"}}
                    value={props.stockResult.dia||''}
                    
                    onChange={(_event, Value)=>props.setStockResult(pState => 
                        {return { ...pState, dia:Value }}
                    )}
                    renderInput={(params) =>
                    <TextField {...params} label="DIA"/>}
                    />
                    {/*<Autocomplete
                    options={["0.75","1.00","1.25","1.50","1.75","2.00","2.25","2.50","2.75","3.00","3.25","3.50"]} 
                    freeSolo
                    style={{ width: "100%"}}
                    value={props.stockResult.add||''}
                    
                    onChange={(_event, Value)=>props.setStockResult(pState => 
                        {return { ...pState, add:Value }}
                    )}
                    renderInput={(params) =>
                    <TextField {...params} label="ADD"/>}
                    />*/}
                    <TextField label="کد محصول" style={{ width: "100%"}}
                    //value={props.stockResult.sku}
                    onKeyDown={(e)=>
                        (e.key)==='Enter'&&props.setStockResult(pState => 
                        {return { ...pState, sku:e.target.value }}
                        )}/>
            </div>
            </>}
        </div>
    )
}
export default FilterStock