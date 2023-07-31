
import { useEffect, useState } from 'react';
import env, { discountPercent, discountPrice, minusPrice, normalPrice, sumPrice } from '../env';
import BrandExtra from './Stock/Stock01/BrandExtra';
import BrandHolder from './Stock/Stock01/BrandHolder';
import BrandHolderMobile from './Stock/Stock01/BrandHolderMobile';
const wWidth = window.innerWidth;
function OrderStep02(props){
    const [defData,setDefData] = useState('');
    const [rxData,setRXData] = useState('');
    const [price,setPrice]= useState();
    const [dodid,setDodid]= useState();
    const [brand,setBrand]= useState();
    const [manufacture,setManufacture]= useState();
    const [spin,setSpin] = useState();

    useEffect(() => {
        props.def&&setRXData(props.def.rxLenz);
        props.def&&props.def.rxLenz&&setPrice(props.def.rxLenz.split(','))
    },[props.def])

    useEffect(() => {
        const data = props.def&&props.def.rxLenz?props.def.rxLenz.split(','):[];
        if(!data[2])return;
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data[2]})
          }
          fetch(env.siteApi+"/order/manufacture/find",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setDefData(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
        
    },[])

    
    return(
        <div className="orderStepsHolder">
            <div className="orderDataHolder">
                {wWidth>700?<BrandHolder defData={defData} setPrice={setPrice} rxData={rxData}
                     setBrand={setBrand} setDodid={setDodid} setManufacture={setManufacture}/>:
                <BrandHolderMobile defData={defData} setPrice={setPrice} rxData={rxData}
                     setBrand={setBrand} setDodid={setDodid} setManufacture={setManufacture}/>}
                {/*<BrandExtra  setBrandFilter={setBrandFilter} defData={brandFilter}/>*/}
                {price&&price!=="-1"?<div className='detailPriceHolder'>
                    <div className='detailPrice'>
                        <div className="priceXtra priceOff "><span>قیمت: {normalPrice(price[0])} ریال</span></div>
                    {/*<div className="priceXtra priceOff"><span>{minusPrice(price[0]+"-"+(price[1]))} ریال</span></div>*/}
                    </div>
                    {price[1]&&<div className="offOrder">
                        <small>{discountPercent(price[0],price[1])}%OFF</small>
                        <div className="offBack"></div>
                    </div>}
                </div>:
                price!=="-1"&&defData&&<div className='detailPriceHolder innerSeprator'>
                <div className='detailPrice'>
                    <div className="priceXtra priceOff "><span>قیمت: <small>{normalPrice(defData.lenzPrice)} ریال</small></span></div>
                    <div className="priceXtra priceOff"><span>{discountPrice(defData.lenzPrice,defData.lenzDiscount)} ریال</span></div>
                </div>
                {defData.lenzDiscount?
                <div className="offOrder">
                <small>{discountPercent(defData.lenzPrice,defData.lenzDiscount)}%OFF</small>
                    <div className="offBack"></div>
                </div>:''}
            </div>}
                <div className="orderContinue">
                    {spin?env.wait:''}
                    {price&&price!=="-1"?<input type="button" className="orderBtn" value="ادامه" 
                    onClick={()=>{setSpin(1);
                    props.saveState({"lastIndex":2,"status":"initial","manufacture":manufacture,
                    "brand":brand,"rxLenz":price.toString(),"lenzDid":dodid})
                    setTimeout(()=>{setSpin(0);
                        window.location.href="/order/rx#odOsDetail";
                        props.setTabIndex(2);},1000);
                }}/>:
                    <input type="button" disabled className='disableBtn' value="انتخاب عدسی" />}
                    
                <small className="preBtn" onClick={()=>{props.setTabIndex(0);window.location.href="/order/rx#consumer";}} >صفحه قبل</small>
                </div>
            </div>
        </div>

    )
}
export default OrderStep02