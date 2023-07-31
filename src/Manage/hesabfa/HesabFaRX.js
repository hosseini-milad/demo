import { useEffect, useState } from "react";
import env, { hesabfa, normalPrice, purePrice } from "../../env";
function HesabFaRXHolder(){
    const [stockData,setStockData]= useState();
    const [error,setError] = useState('')
    const options=["ردیف","کد حسابداری","شناسه محصول","برند",
        "توضیح محصول","قیمت فروش","قیمت خرید"];
    //console.log(stockData)
    const getStock = () => {
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            //body:JSON.stringify({url:hesabfa.itemsList})
        }
        //console.log(postOptions)
        setError("در حال دریافت اطلاعات سایت")
        fetch(env.siteApi+"/order/manufacture/listHesabfa",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result);
            setError(result.data.length?(result.data.length + " محصول جدید پیدا شد.")
                :"محصول جدیدی پیدا نشد")
            setStockData(result)
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })

        }
    const updateStock = () => {
        if(stockData&&!stockData.data) return;
        var hesabfaItems = [];
        for(var i =0;i<2;i++){
            hesabfaItems.push({
                Code: stockData.data[i].hesabfa,
                Name: stockData.data[i].title,
                Barcode: stockData.data[i].sku,
                ProductCode: stockData.data[i].sku,
                ItemType: 0,
                Unit: 'عدد',
                BuyPrice: stockData.data[i].lenzPrice,
                SellPrice: normalPrice(purePrice(stockData.data[i].lenzPrice)*.8)
            })
           //console.log(data)
           
        //Object.assign(body);
        //const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify({url:"/item/batchsave",items:hesabfaItems})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/hesabfa/saveApi",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
    
}
    return(
        <div className="reyhamPanel">
            <div className="orderContinue" style={{display: "flex",alignItems:"center"}}>
                <small>{error}</small>
           
                {stockData?<input type="button" style={{margin: "10px"}} className="orderBtn" 
                    value="بروزرسانی" onClick={updateStock}/>:''}
                <input type="button" style={{margin: "10px"}} className="orderBtn" 
                    value="دریافت اطلاعات" onClick={getStock}/>
             </div>
            <div className="orderDataHolder">
                <table className="orderTable" style={{direction:"ltr"}}>
                    <tbody>
                        <tr>
                            {options.map((th,i)=>(
                            <th key={i}>{th}</th>))}
                        </tr>
                        {stockData&&stockData.data&&stockData.data.map((stock,i)=>(
                            i<2&&
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{stock.hesabfa}</td>
                                <td>{stock.sku}</td>
                                <td>{stock.brandName}</td>
                                <td>{stock.title}</td>
                                <td>{stock.lenzPrice}</td>
                                <td>{normalPrice(purePrice(stock.lenzPrice)*.8)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default HesabFaRXHolder