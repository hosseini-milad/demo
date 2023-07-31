import { useEffect, useState } from "react";
import env from "../../env"
import SkuToDetail from "./SkuToDetail"
var token = JSON.parse(localStorage.getItem('token-lenz'));

function KharidStock(props){
    //console.log(props.data)
    //const [brands,setBrands] = useState('')
    const [allow,setAllow] = useState(false)
    const updateStockItem=(stockOrderNo,newItem)=>{
        //const updateContent=(newItem,oldID,reload)=>{
            const body={
                stockOrderNo:stockOrderNo,
                newItem:{...newItem,...{status:"delivered"}},
                oldID: newItem.sku,
                //description:description
            }
            const postOptions={
                method:'post',
                headers: { 'Content-Type': 'application/json' ,
                    "x-access-token": token&&token.token,
                    "userId":token&&token.userId},
                body:JSON.stringify(body)
              }
            //console.log(postOptions)
            fetch(env.siteApi + "/order/manage/editstock",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                
            },
            (error) => {
              console.log(error);
            })
    }
    console.log(props.data)
    /*useEffect(() => {
        const postOptions={
            method:'get',
            headers: {'Content-Type': 'application/json'}
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/product/brands",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setBrands(result)
         // console.log(result)
            //setTimeout(()=> setContent(result),200)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])*/
    //return(<main>به زودی</main>)
    return(
        <table>
            <tbody>
                <tr>
                    <th>ردیف</th>
                    <th>شماره سفارش</th>
                    <th>مبلغ سفارش</th>
                    <th>آیتم های سفارش</th>
                    <th>عملیات</th>
                </tr>
            {props.data&&props.data.map((item,i)=>(
            <tr key={i}>
                <td>{i+1}</td>
                <td>{item.stockOrderNo}</td>
                <td>{item.stockOrderPrice}</td>
                <td width={"500px"}><ul>{item.stockFaktor.map((stockItem,j)=>(
                    (stockItem.store===token.mobile)&&
                    (stockItem.count !=="0"&&!stockItem.status)&&
                    //setTimeout(()=>console.log(allow),2000)&&//)?
                    <li  key={j} className="stockRowAnbar">
                        <small><SkuToDetail sku={stockItem.sku}/></small><br/>
                        <div className="stockRow">
                          <strong>{stockItem.sku}</strong>
                          <span> جهت: {stockItem.align==="R"?"راست":"چپ"}</span>
                          <span> تعداد: {stockItem.count}</span>
                          <button onClick={()=>updateStockItem(item.stockOrderNo,stockItem)}>تایید</button>
                        </div>
                    </li>))}
                    </ul>
                </td>
                <td><button>تایید سفارش</button></td>
            </tr>
            ))}
            </tbody>
        </table>
    )
}
export default KharidStock