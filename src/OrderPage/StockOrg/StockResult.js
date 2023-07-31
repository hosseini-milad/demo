import { useEffect, useState } from "react";
import Paging from "../../CategoryPage/Paging";
import env from "../../env";
const perPage = 10;
function StockResult(props){
    const options=["عملیات","sku","برند","طراحی","OD","OS","قیمت واحد(راست)",
            "قیمت واحد(چپ)","تخفیف"];
    const rowSpan=["2","2","1","2","1","1","2","2","2"]
    const colSpan=["1","1","4","1","3","3","1","1","1"]
    const subOptions=["نام برند","ض.شکست","متریال",
            "پوشش","SPH","CYL","ϕ",
            "SPH","CYL","ϕ",]; 
    const design=["Aspheric","Spheric"];
    const [pageNumber,setPageNumber] = useState('')
    const [content,setContent] = useState('')
//console.log(props.stockFilter)
    useEffect(() => {
        const body={
            page:pageNumber,
            brand:props.stockFilter.brandName,
            lenzIndex:props.stockFilter.lenzIndex,
            material:props.stockFilter.material,
            coating:props.stockFilter.coating,
            pageSize:perPage,
            sort:"lenzIndex",
            sortAsc:"1"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        fetch(env.siteApi + "/order/stock/list",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent('')
          //console.log(result)
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[pageNumber,props.stockFilter])
    //console.log(props)
    return(
        <div className="orderDataHolder StockDataHolder">
            <table className="orderTable stockTable rtl">
                <tbody>
                    <tr> 
                        {options.map((th,i)=>(
                        <th rowSpan={rowSpan[i]} colSpan={colSpan[i]}
                        style={{display:i===1?"none":""}} key={i}>{th}</th>))}
                    </tr>
                    <tr>
                        {subOptions.map((th,i)=>(
                        <th key={i}>{th}</th>))}
                    </tr>
                    {content&&content.stock.map((stockItem,i)=>(
                       
                    <tr key={i} onClick={()=>{}}>
                        <td onClick={(e)=>{props.setTabIndex(1);props.setStockItem(stockItem);props.setCount(props.count)
                            window.location.href="/order/stock#service"}}><input type="radio" /></td>
                        <td style={{display:"none"}} id={stockItem._id}>{stockItem.sku}</td>
                        <td width={80}><input type="text" defaultValue={stockItem.brandName} /></td>
                        <td width={60}><input type="text" defaultValue={stockItem.lenzIndex}/></td>
                        <td width={60}><input type="text" defaultValue={stockItem.material}/></td>
                        <td width={60}><input type="text" defaultValue={stockItem.coating}/></td>
                        <td width={60}><input type="text" defaultValue={stockItem.design}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.sphOD}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.cylOD}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.od}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.sphOS}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.cylOS}/></td>
                        <td width={30}><input type="text" defaultValue={stockItem.os}/></td>
                        <td width={80}><input type="text" defaultValue={stockItem.priceOD}/></td>
                        <td width={80}><input type="text" defaultValue={stockItem.priceOS}/></td>
                        <td >{stockItem.discountOS}</td>

                    </tr>
                    ))}
                </tbody>
            </table>
            {content&&
            <Paging content={content} setPageNumber={setPageNumber} pageNumber={pageNumber} perPage={perPage}/>}
        </div>
    )
}
export default StockResult