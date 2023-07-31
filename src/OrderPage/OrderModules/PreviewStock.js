import { useEffect, useState } from "react";
import env, { normalPrice } from "../../env";
import ImagePop from "../Stock/Stock01/ImagePop";

function PreviewStock(props){
    const [stockDetail,setStockDetail] = useState([])
    const defData = props.defData;

    const lensRows = defData.stockFaktor;
    const lensOrg = props.defData.stockFaktorOrg;
    //console.log(lensOrg)
    useEffect(() => { 
        if(lensRows){
        for(var i=0;i<lensRows.length;i++){
            const oldItem = (lensOrg.find(item=>item.sku===lensRows[i].sku))
            const oldSku = !oldItem?lensOrg[i].sku:''
            console.log(oldSku)
        //const data = orderData&&orderData.rxLenz?orderData.rxLenz.split(','):[];
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:lensRows[i].sku})
          }
          fetch(env.siteApi+"/order/stock/find",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result,data)
                setStockDetail(existingItems => {
                    return [
                    ...existingItems.slice(0, i),
                    {...result[0], ...oldItem?{oCount:oldItem.count,oAlign:oldItem.align}:
                                    {oSku:oldSku}},
                    ...existingItems.slice(i + 1),
                    ]
                })

                //setStockDetail(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
        }  }
    },[lensRows])
    return(
        <div className="orderDataHolder">
            <table className="orderTable stockTable rtl">
                <tbody>
                    <tr>
                        <th style={{width:"20px"}}>ردیف</th>
                        {/*<th style={{width:"35px"}}>کد</th>*/}
                        <th>برند</th>
                        <th>عدسی </th>
                        <th>جهت</th>
                        <th style={{width:"35px"}}>تعداد</th>
                        <th>قیمت واحد</th>
                        <th>قیمت کل</th>
                        <th>توضیحات</th>
                    </tr>
                    {lensRows&&stockDetail.length&&lensRows.map((faktorItem,i)=>(
                    stockDetail[i]&&<tr key={i} style={
                        {backgroundColor:faktorItem.count==="0"?"silver":
                        stockDetail[i].oCount!==faktorItem.count?"orange":"",
                        color:faktorItem.count==="0"?"gray":""}}>
                        <td>{i+1}</td>
                        {/*<td >{faktorItem.sku}</td>*/}
                        
                        <td dangerouslySetInnerHTML={{__html:
                        `<small className="ommitCount">${stockDetail[i].oSku?stockDetail[i].oSku:''}</small>`+
                        "<strong>"+stockDetail[i].brandName+"</strong>"+"-"+
                            stockDetail[i].lenzIndex+"<br/>"+
                            ""+stockDetail[i].material+"-"+
                            (stockDetail[i].coating&&stockDetail[i].coating)}}></td>
                        <td dangerouslySetInnerHTML={{__html:(stockDetail[i].sph?"<strong>SPH: </strong>"+stockDetail[i].sph
                            +" | <strong>CYL: </strong>"+stockDetail[i].cyl:'')}}></td>
                        <td style={{direction: "ltr"}}>
                            {stockDetail[i].oAlign!==faktorItem.align?
                                <small className="ommitCount">{stockDetail[i].oAlign}</small>:<></>}
                                <strong>{faktorItem.align}</strong> </td>
                        <td>{stockDetail[i].oCount!==faktorItem.count?
                            <small className="ommitCount">{stockDetail[i].oCount}</small>:<></>}
                        {faktorItem.count}</td>
                        <td style={{direction: "ltr"}} >{normalPrice(faktorItem.price)}</td>
                        <td style={{direction: "ltr"}}>
                           {normalPrice(faktorItem.price*faktorItem.count)}</td>
                        <td>{faktorItem.description}</td>
                    </tr>))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>قیمت کل</td>
                        <td style={{fontSize:"15px",fontWeight:"bold"}}>{normalPrice(defData.stockOrderPrice)} ریال</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}
export default PreviewStock