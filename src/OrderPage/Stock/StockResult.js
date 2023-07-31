import { useEffect, useState } from "react";
import Paging from "../../CategoryPage/Paging";
import env from "../../env";
const perPage = 10;
const wWidth= window.innerWidth;
const token = JSON.parse(localStorage.getItem('token-lenz'));
function StockResult(props){
    const price=props.priceFilter?props.price:0;
    const options=["عملیات","sku","عدسی راست","عدسی چپ","برند","قیمت راست","قیمت چپ"];
    const rowSpan=["1","2","1","1","1","2","2"]
    const colSpan=["2","1","2","2","4","1","1"]
    const subOptions=["ردیف","افزودن","SPH","CYL",
            "SPH","CYL","نام برند","ض.شکست","متریال","پوشش"]; 
    const design=["Aspheric","Spheric"];
    const [pageNumber,setPageNumber] = useState('')
    const [content,setContent] = useState('')
    const [count,setCount] = useState('')
    const eyeSelect = (props.mainValue[0]?props.mainLeft[0]?"pair":"":"")
    const saveCart=(sku)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(sku)
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/addCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                return(result)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    }
    useEffect(() => {
        //console.log(props)
        const body={
            page:pageNumber,
            brand:props.stockFilter.brandName,
            lenzIndex:props.stockFilter.lenzIndex,
            material:props.stockFilter.material,
            coating:props.stockFilter.coating,

            osSph:props.mainValue[0],
            osCyl:props.mainValue[1],
            odSph:props.mainLeft[0],
            odCyl:props.mainLeft[1],
            dia:props.mainValue[2]?props.mainValue[2]:'',
            add:props.mainValue[3]?props.mainValue[3]:'',
            pageSize:perPage,
            price:price,
            sort:"lenzIndex",
            sortAsc:"1"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/order/stock/list",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent('')
            //if(result.size===1)saveCart
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[pageNumber,props.stockFilter,
        props.mainValue,props.mainLeft,props.priceFilter])
    //console.log(props)
    useEffect(() => {
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/getCart",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                props.setOrderCount(result.length)
              },
              (error) => {
               console.log({error:error.message});
              }
        );
    },[props.orderCount])
    return(
        <div className="orderDataHolder StockDataHolder">
            <table className="orderTable stockTable">
                <tbody>
                    <tr> 
                        {options.map((th,i)=>(
                        <th rowSpan={rowSpan[i]} colSpan={colSpan[i]}
                        style={{display:i===1?"none":""
                        }} key={i}>{th}</th>))}
                    </tr>
                    <tr>
                        {subOptions.map((th,i)=>(
                        <th key={i}>{th}</th>))}
                    </tr>
                    {content&&content.stock&&content.stock.map((stockItem,i)=>(
                       
                    <tr key={i} onClick={()=>{}}>
                        <td>{i+1}</td>
                            <td onClick={(e)=>{props.setTabIndex(1);
                            //console.log(stockItem)
                            var res = '';
                            if(!eyeSelect)
                            res = saveCart({sku:stockItem.sku,
                                hesabfa:stockItem.hesabfa,
                                align:stockItem.odSPH?"L":"R",
                                count:stockItem.odSPH?props.count[1]:props.count[0]})
                            else{saveCart({sku:stockItem.sku.split('|')[0],
                                    hesabfa:stockItem.hesabfa.split('|')[0],
                                    align:"R",
                                    count:props.count[0]});
                                saveCart({sku:stockItem.sku.split('|')[1],
                                    hesabfa:stockItem.hesabfa.split('|')[1],
                                    align:"L",
                                    count:props.count[1]});
                                } 
                                setTimeout(()=>props.setOrderCount(' '),1000)
                                window.scrollTo(0, 170);
                            }}
                             className="stockQuickAdd">
                                +
                            </td>
                        <td style={{display:"none"}} id={stockItem._id}>{stockItem.sku}</td>
                        <td width={40}><input type="text" defaultValue={stockItem.osSPH}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.osCYL}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.odSPH}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.odCYL}/></td>
                        <td width={80}><input type="text" defaultValue={stockItem.brandName} /></td>
                        <td width={60}><input type="text" defaultValue={stockItem.lenzIndex}/></td>
                        <td width={120}><input type="text" defaultValue={stockItem.material}/></td>
                        <td width={60}><input type="text" defaultValue={stockItem.coating}/></td>
                        <td width={80}><input type="text" defaultValue={stockItem.osPrice}/></td>
                        <td width={80}><input type="text" defaultValue={stockItem.odPrice}/></td>
                        

                    </tr>
                    ))}
                    {content&&content.stock&&!content.stock.length&&<tr className="emptyError">
                        <td colSpan={13}>عدسی مورد نظر یافت نشد</td></tr>}
                </tbody>
                
            </table>
           
            {(content&&content.stock&&content.stock.length)?
            <Paging content={content} setPageNumber={setPageNumber} pageNumber={pageNumber} perPage={perPage}/>:''}
        </div>
    )
}
export default StockResult