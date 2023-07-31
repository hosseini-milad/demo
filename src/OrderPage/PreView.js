import { useEffect, useState } from "react";
import ButtonLoader from "../Components/BtnLoader";
import env, { discountPercent, normalPrice, sumPrice } from "../env";
import ImagePop from "./Stock/Stock01/ImagePop";

function PreViewOrder(props){
    const defData = props.def;
    const price = defData&&defData.rxLenz?defData.rxLenz.split(','):[0,0];
    const [lenzDetail,setLenzDetail] = useState()
    
    const [iDisplay , setIDisplay] = useState(-1)
    //console.log(defData)
    useEffect(() => {
        const data = price.length?price[2]:'';
        
        if(!data)return
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data})
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
        
    },[])
    
    const options=["SPH","CYL","AXIS","ADD","IPD",
    "Prism","P/B","DEC","Position"];
    const frameOptions=["HBox","VBox","DBL","FHR","FHL","BVD","PT","FFA","ED","Lens Base"]
    var row01=''
    try{row01=["OD"].concat(defData.odMain&&defData.odMain.split(','))
                      .concat(defData.odMore&&defData.odMore.split(','));}catch{}
    var row02=''
        try{ row02=["OS"].concat(defData.osMain&&defData.osMain.split(','))
                      .concat(defData.osMore&&defData.osMore.split(','));}catch{}
    const frameRow=defData.frameSize&&defData.frameSize.split(',');//["","-","-","-","-","-","-","-","-"];
    return(
        <div className="orderStepsHolder">
            <div className="orderDataHolder"><br/>
            <div className='innerSeprator'>
                <div className='innerHeader innerPreview'>مشخصات عدسی</div>
                <div className="orderDataHolder" style={{direction:"ltr"}}>
                <table className="orderTable">
                    {lenzDetail&&<tbody>
                        <tr>
                            <td >{lenzDetail.facoryName}</td>
                            <td >{lenzDetail.brandName}</td>
                            <td >{lenzDetail.lenzType}</td>
                            <td >{lenzDetail.lenzDesign}</td>
                            <td >{lenzDetail.lenzIndex}</td>
                            <td >{lenzDetail.material}</td>
                        </tr>
                    </tbody>}
                </table>
                    <div className="orderResult">
                        <br/>
                        <span>قیمت عدسی:<br/>
                        {normalPrice(price[0])} ریال<br/>
                        {price[1]?normalPrice(price[1]):''}
                        </span>
                        {price[1]?<div className="offOrder">
                            <small>{discountPercent(price[0],price[1])}%OFF</small>
                            <div className="offBack"></div>
                        </div>:''}
                    </div>
                </div>
            </div>
            <div className='innerSeprator'>
              <div className='innerHeader innerPreview'>مشاهده نسخه</div>
              <div className="orderDataHolder">
                <table className="orderTable" style={{direction:"ltr"}}>
                    <tbody>
                        <tr> <th></th>
                            {options.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        <tr>
                            {row01.map((td,i)=>(
                            <td key={i}>{td}</td>))}
                        </tr>
                        <tr>
                            {row02.map((td,i)=>(
                            <td key={i}>{td}</td>))}
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <div className='innerSeprator'>
              <div className='innerHeader innerPreview'>مشاهده فریم</div>
            <div className="orderDataHolder" style={{direction:"ltr"}}>
                <table className="orderTable">
                    <tbody>
                        <tr>
                            {frameOptions.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        <tr>
                            {frameRow&&frameRow.map((td,i)=>(
                            <td key={i}>{td}</td>))}
                        </tr>
                    </tbody>
                </table>
                <h5 >نوع فریم: {defData.frameType}</h5>
                {defData.frameImg&&defData.frameImg.split(',').map((imgSrc,i)=>(
                    <img src={imgSrc} key={i} className="previewImg"/>
                )) }
            </div>
            </div>
            <div className='innerSeprator'>
              <div className='innerHeader innerPreview'>خدمات</div>
            <div className="orderDataHolder">
                <table className="orderTable" style={{direction:"rtl"}}>
                    <tbody>
                        <tr>
                            <th>خدمت</th>
                            <th>هزینه</th>
                        </tr>
                        
                        <tr>
                            
                            <td>هزینه خدمات <sub className="tableMoreView">مشاهده جزئیات خدمات</sub></td>
                            <td>{sumPrice(defData.mirrorPrice+"+"+
                            defData.colorPrice+"+"+defData.expressPrice)} ریال</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>قیمت عدسی</td>
                            <td>{normalPrice(price[0]?price[0]:0)} ریال</td>
                        </tr>
                        <tr>
                            <td>تخفیف عدسی</td>
                            <td>{normalPrice(price[1]?price[1]:0)} ریال</td>
                        </tr>
                        <tr>
                            <td>قیمت نهایی محصول</td>
                            <td>{sumPrice(defData.mirrorPrice+"+"+
                            defData.colorPrice+"+"+price[0]+"+"+defData.expressPrice)}
                             ریال</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <div className='innerSeprator'>
              <div className='innerHeader'>اطلاعات تکمیلی</div>
            <div className="orderDataHolder">
                <span>نام مصرف کننده: {defData.consumer}</span>
                
            </div>
            </div>
            {defData.frameImg&&defData.frameImg.split(',').map((imgSrc,i)=>(

            <img key={i} className='imgPreview' src={imgSrc} onClick={()=>setIDisplay(imgSrc)}/>))}
            <ImagePop setIDisplay={setIDisplay} iDisplay={iDisplay}  />

            <hr/>
                <div className="previewContinue">
                    <ButtonLoader className="orderBtn orderBtnPreview" action={()=>{}}
                        saveState={props.saveState} price={"12000"}
                        title2={"ثبت درخواست"}/>
                    <input type="button" className="orderBtn orderBtnPreview orderEtc" value="ویرایش" 
                    onClick={()=>{props.setTabIndex(5);window.location.href="/order/rx#moreInfo"}}/>
                    <input type="button" className="orderBtn orderBtnPreview orderEtc" value="چاپ پیش نمایش" 
                    onClick={()=>{}}/>
                    <input type="button" className="orderBtn orderBtnPreview orderdisable" value="لغو درخواست" 
                    onClick={()=>{props.saveState({status:"cancel"});
                        setTimeout(()=>window.location.href="/profile#orders",500)}}/>
                </div>
            </div>
        </div>
    )
}
export default PreViewOrder