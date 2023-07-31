import { useState } from "react"
import { useEffect } from "react"
import env from "../../../env"

function StockRow(props){
    const [stockData,setStockData] = useState()
    //console.log(stockData)
    
    useEffect(() => {
        const body={
            sku:props.stock&&props.stock.sku
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/order/stock/sku",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setStockData(result)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    const editItem=(itemData)=>{
      props.setEditItemData({...itemData,...props.stock})
    }
    return(
        <>{stockData?<>
        <td style={{direction:"ltr"}}><strong>{stockData.brandName}</strong> - {stockData.lenzIndex}<br/>
          {stockData.material} {stockData.coating?" - "+stockData.coating:""}</td>
        
        <td><strong>SPH: </strong>{stockData.sph} | <strong>CYL: </strong>{stockData.cyl}</td>
        <td>{props.stock.align}</td>
        <td>{props.stock.count}</td>
        <td>{props.stock.description}</td>
        <td width={100}><button className="editTable" onClick={()=>{editItem(stockData)
        props.setEditRow(props.index)}}>ویرایش</button></td></>:
        <td>در حال دریافت اطلاعات</td>}
        </>
    )
}
export default StockRow