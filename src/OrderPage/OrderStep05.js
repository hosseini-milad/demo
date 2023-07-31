import { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import env, { normalPrice } from "../env";
import SimpleFetch from "../Components/simpleFetch";
import ColorSelect from "./Stock/Stock02/ColorSelect";
import NazokTigh from "./OrderModules/NazokTigh";
import AutoComplete from "../Components/AutoComplete";
const wWidth = window.innerWidth;

function OrderStep05(props){
    const [colorList,setColor] = useState('');
    const [moreService, setMoreService] = useState(0);
    const [nazokTigh,setNazokTigh] = useState();
    const [lenzDetail,setLenzDetail]= useState();
    const [spin,setSpin] = useState();
    const [extraData,setExtraData] = useState({
        coverCode:props.def.coverCode,
        coverPrice:props.def.coverPrice,
        coverDesc:props.def.coverDesc,
        colorCode:props.def.colorCode,
        colorPrice:props.def.colorPrice,
        mirrorCode:props.def.mirrorCode,
        mirrorPrice:props.def.mirrorPrice,
        
    })
    //console.log(props.def)
    useEffect(() => {
        fetch(env.siteApi+"/order/color")
            .then(res => res.json())
            .then(
            (result) => {
                //console.log(result)
                setColor(result)
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

            const postOptions={
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({sku:props.def.rxLenz&&props.def.rxLenz.split(',')[2]})
              }
              fetch(env.siteApi+"/order/manufacture/find",postOptions)
                .then(res => res.json())
                .then(
                  (result) => {
                    setLenzDetail(result)
                  },
                  (error) => {
                    console.log({error:error});
                  }
                )
                .catch((error)=>{
                  console.log(error)
                })
                setNazokTigh({NazokTigh:props.def.NazokTigh,
                    NazokTighPrice:props.def.NazokTighPrice})
          },[])
          
    return(
        <div className="orderStepsHolder">
            <div className="orderDataHolder"><br/>
                {colorList&&extraData&&<div className='innerSeprator'>
                    <div className='innerHeader'>پوشش</div>
                    {wWidth>700?<Autocomplete
                    options={lenzDetail?colorList.cover.filter(item=>item.brand===lenzDetail.brandName)
                        :colorList.cover||{}}
                    getOptionLabel={item=>item.option||''}
                    value={colorList.cover.find(item=>item.option===extraData.coverCode)||null}
                    style={{ width: "100%" }}
                    onChange={(e,value)=>{setExtraData(pState=>{
                        return{...pState,coverCode:value&&value.option,
                            coverPrice:value&&value.price,coverDesc:value&&value.content}})
                        }
                    }
                    renderInput={(params) =>
                    <TextField {...params} label="انتخاب پوشش" variant="outlined" />}
                />:<AutoComplete
                options={lenzDetail?colorList.cover.filter(item=>item.brand===lenzDetail.brandName)
                    :colorList.cover||{}}
                    getOptionLabel={(item)=>{return(item.option)}}
                    value={extraData.coverCode||null}
                    style={{ width: "80%",margin:"auto" }}
                    //onValueChange={(value)=>{console.log(colorList.cover.find(item=>item.option===value))}}
                    onValueChange={(value)=>setExtraData(pState=>{
                        return{...pState,coverCode:value&&value,
                            coverPrice:value&&colorList.cover.find(item=>item.option===value)&&
                                colorList.cover.find(item=>item.option===value).price}})}
                    label="انتخاب پوشش"
                /> }
                <div>
                    <div className="priceXtra rtlPrice"><span>
                        {extraData.coverDesc?extraData.coverDesc:''}</span></div>
                    <div className="priceXtra rtlPrice"><span><small> قیمت: </small>
                    {(extraData.coverPrice||extraData.coverPrice!=="0")
                    ?(normalPrice(extraData.coverPrice)+' ریال '):''}</span></div>
                    </div>
                </div>}
                
                {colorList&&<div className='innerSeprator'>
                    <div className='innerHeader' onClick={()=>setMoreService((parseInt(moreService)+1)%2)}>خدمات بیشتر
                    <i className={moreService?"fa fa-chevron-up":"fa fa-chevron-down"}></i></div>
                    <div style={{display:moreService?"block":"none"}}>
                      <div className='innerSeprator'>
                        <div className='innerHeader'>رنگ</div>
                        <div className='lenzFull'> 
                            <ColorSelect colorList={colorList.color}
                                defData={extraData.colorCode} 
                                brand={lenzDetail&&lenzDetail.brandName}
                                setExtraData={setExtraData} type="color"/>
                            <div className="priceXtra rtlPrice"><span>قیمت: {normalPrice(extraData.colorPrice)} ریال</span></div>
                        </div>
                    </div>
                    {/*<div className='innerSeprator'>
                    <div className='innerHeader'>لانتی</div>
                        <div className='lenzFull'>
                            <TextField variant="outlined" label="میزان لانتی"
                            style={{width:"100%"}}
                            defaultValue={extraData.lanti}
                            onChange={(value)=>setExtraData(pState=>{
                                return{...pState,lanti:value.target.value}})}/>
                            <div className="priceXtra rtlPrice"><span>قیمت: رایگان</span></div>
                        </div>
                    </div>*/}
                    <div className='innerSeprator'>
                    <div className='innerHeader'>Mirror</div>
                        <div className='lenzFull'>
                            <ColorSelect colorList={colorList.mirror} 
                                defData={extraData.mirrorCode} 
                                brand={lenzDetail&&lenzDetail.brandName}
                                setExtraData={setExtraData} type="mirror"/>
                            <div className="priceXtra rtlPrice"><span>قیمت: {normalPrice(extraData.mirrorPrice)} ریال</span></div>
                        </div>
                    </div>
                       {colorList&&colorList.xtra&&<NazokTigh defData={extraData} setNazokTigh={setNazokTigh}
                                  nazokTigh={nazokTigh} xtra={colorList.xtra}/> }
                       {/*<TextField variant="outlined"
                            label="توضیحات بیشتر"
                            multiline  
                            minRows={5}
                            style={{width:"100%"}}/>*/}
                    </div>
                </div>}
                <hr/>
                <div className="orderContinue">
                {spin?env.wait:''}
                {extraData.coverCode?<input type="button" className="orderBtn" value="ادامه" 
                    onClick={()=>{setSpin(1);props.saveState({...extraData,...nazokTigh,"lastIndex":5})
                     setTimeout(()=>{setSpin(0);props.setTabIndex(5);
                        window.location.href="/order/rx#moreInfo";},1000)}}/>:
                     <>
                        <small style={{color:"var(--orange-color)",padding:"5px 10px"}}>لطفا پوشش را انتخاب کنید</small>
                        <input type="button" value="ادامه" className="disableBtn"/>
                     </>}
                    <small className="preBtn" onClick={()=>{props.setTabIndex(3);
                    window.location.href="/order/rx#frameSize"}} >صفحه قبل</small>
                    {/*<div className='orderInfo'>
                        <div className='orderInfoData'>
                            <span>پوشش کامل آنتی رفلاکس + پوشش محافظ نور آبی:</span>
                            <strong>1.000.000 ریال</strong>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>

    )
}
export default OrderStep05