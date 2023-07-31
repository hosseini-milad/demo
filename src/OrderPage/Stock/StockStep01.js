
import {Box, Slider } from '@material-ui/core';
import { useState } from "react";
import StockResult from "./StockResult";
import env, { normalPrice } from "../../env";
import BrandHolderStock from "./Stock01/BrandHolderStock";
import ODOSStock from "../OrderModules/ODOSStock";
import BrandHolderStockMobile from "./Stock01/BrandHolderStockMobile";
import ODOSStockMobile from "../OrderModules/ODOSStockMobile";
const wWidth= window.innerWidth;

function StockStep01(props){
    const [mainValue,setMainValue] = useState([,,,,,]);
    const [mainLeft,setMainLeft] = useState([,,,,,])

    const [brandFilter,setBrandFilter]= useState("")
    const [price,setPrice] = useState([0,500]);
    const [priceFilter,setPriceFilter]= useState(0)
    const [odCount,setODCount] = useState([1,1]);
    const [eyeSelect,setEyeSelect] = useState([1,0]);
    const changeValue = (event, value) => {
        setPrice(value);
      };
    const getText = (price) => `${normalPrice(price)}`;
    
    return(<>
        <div className='stockMainHolder'>
            <div className="orderDataHolder">
            {wWidth>700?<>
                <ODOSStock params={props.params} setMainValue={setMainValue} 
                    mainValue={mainValue} title="R" setCount={setODCount} count={odCount}/>
                <ODOSStock params={props.params} setMainValue={setMainLeft} 
                    mainValue={mainLeft} title="L" setCount={setODCount} count={odCount}/></>:
                <>
                <ODOSStockMobile params={props.params} setMainValue={setMainValue} 
                    mainValue={mainValue} title="R" setCount={setODCount} count={odCount}/>
                <ODOSStockMobile params={props.params} setMainValue={setMainLeft} 
                    mainValue={mainLeft} title="L" setCount={setODCount} count={odCount}/>
                    </>}
                
                {wWidth>700?<BrandHolderStock setBrandFilter={setBrandFilter} brandFilter={brandFilter}/>:
                    <BrandHolderStockMobile setBrandFilter={setBrandFilter} brandFilter={brandFilter}/>}
                {/*<div className='orderTitle'>محدوده قیمت عدسی</div>
                <div className="priceHolder">
                    <small>{price[1]}.000 R</small>
                    <Box display="flex" flexDirection="column" m={10}>
                        <Slider
                        className={"priceSlider"}
                        min={0}
                        max={500}
                        step={50}
                        value={price}
                        marks
                        onChange={changeValue}
                        valueLabelDisplay="auto"
                        getAriaValueText={getText} />
                    </Box>
                    <small>{price[0]}.000 R</small>
                </div>
                <div className="orderContinue" style={{float: "none"}}>
                    <input type="button" className="orderBtn" value="اعمال قیمت" 
                    style={{margin:"auto"}} onClick={()=>setPriceFilter(priceFilter+1)}/>
                </div>
                <hr/>*/}
            </div>
            <div className='quickCart'>
            {props.faktor&&<table className="orderTable stockTable">
                    <tbody>
                        <tr>
                            <th>جهت</th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>برند</th>
                            <th>تعداد</th>
                        </tr>
                        {props.faktor.map((faktorItem,i)=>(
                            <tr key={i}>
                                <td>{faktorItem.align}</td>
                                <td style={{direction:"ltr"}}>{faktorItem.stockDetail[0].sph}</td>
                                <td style={{direction:"ltr"}}>{faktorItem.stockDetail[0].cyl}</td>
                                <td dangerouslySetInnerHTML={{__html:"<strong>"+faktorItem.stockDetail[0].brandName+"</strong>"}}>
                                </td> 
                                <td>{faktorItem.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div> 
        <StockResult setTabIndex={props.setTabIndex}
            style={{display:eyeSelect[0]===1?"block":"none"}}
            setStockItem={props.setStockItem}
            setStockPopUp={props.setStockPopUp}
            price={price} priceFilter={priceFilter}
            mainValue={mainValue} mainLeft={mainLeft}
            count={odCount} setCount={props.setCount}
            stockFilter={brandFilter} setQuick={props.setQuick}
            orderCount={props.orderCount} setOrderCount={props.setOrderCount}/>
        
        </>
    )
}
export default StockStep01