import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Box, Slider } from '@material-ui/core';
import { useState } from "react";
import StockResult from "./StockResult";
import SimpleFetch from "../../Components/simpleFetch";
import env from "../../env";
import BrandHolderStock from "./Stock01/BrandHolderStock";
import ODOSStock from "../OrderModules/ODOSStock";

function StockStep01(props){
    const [mainValue,setMainValue] = useState([,,,,,]);
    const [mainLeft,setMainLeft] = useState([,,,,,])

    const [brandFilter,setBrandFilter]= useState("")
    const [price,setPrice] = useState([10,100]);
    const [search,setSearch] = useState(0);
    const changeValue = (event, value) => {
        setPrice(value);
      };
    const getText = (price) => `${price}`;
    
    return(
        <div className="orderStepsHolder">
            <div className='innerSeprator'>
        <div className='innerHeader'>مشخصات عدسی مورد نظر را وارد کنید</div>
            <div className="orderDataHolder">
                <ODOSStock params={props.params} setMainValue={setMainValue} 
                           mainValue={mainValue} title="OD"/>
                <ODOSStock params={props.params} setMainValue={setMainLeft} 
                           mainValue={mainLeft} title="OS"/>
                
                <BrandHolderStock setBrandFilter={setBrandFilter} brandFilter={brandFilter}/>
                <div className='orderTitle'>محدوده قیمت عدسی</div>
                <div className="priceHolder">
                    <small>1.250.000R</small>
                    <Box display="flex" flexDirection="column" m={10}>
                        <Slider
                        className={"priceSlider"}
                        min={10}
                        max={100}
                        step={10}
                        value={price}
                        marks
                        onChange={changeValue}
                        valueLabelDisplay="auto"
                        getAriaValueText={getText} />
                    </Box>
                    <small>100.000R</small>
                </div>
                <hr/>
                <div className="orderContinue" style={{float: "none"}}>
                    <input type="button" className="orderBtn" value="جستجو" 
                    style={{margin:"auto"}} onClick={()=>setSearch(1)}/>
                </div>
            </div>
                {search?<StockResult setTabIndex={props.setTabIndex}
                                     setStockItem={props.setStockItem}
                                     //stockData={stockData}
                                     stockFilter={brandFilter}/>:""}
        </div>
        </div>
    )
}
export default StockStep01