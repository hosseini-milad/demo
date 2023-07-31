import { useEffect, useState } from "react";
import env from "../../env";
function SepidarRXHolder(){
    const [stockData,setStockData]= useState();
    const [error,setError] = useState('')
    const options=["ردیف","ID","شناسه محصول","توضیح محصول"];
    console.log(stockData)
    const getStock = () => {
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify({api:"product",type:"RX"})
        }
        //console.log(postOptions)
        setError("در حال دریافت اطلاعات سپیدار")
        fetch(env.siteApi+"/sepidar/update-sepidar",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            setError(result.notIn.length?(result.notIn.length + " محصول جدید پیدا شد.")
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
        var insertItem = 0;
        for(var i =0;i<stockData.notIn.length;i++){
           const data = stockData.notIn[i];
           //console.log(data)
           const property = [
            data.PropertyValues.find(item=>item.PropertyRef===1),
            data.PropertyValues.find(item=>item.PropertyRef===2),
            data.PropertyValues.find(item=>item.PropertyRef===3),
            data.PropertyValues.find(item=>item.PropertyRef===4),
            data.PropertyValues.find(item=>item.PropertyRef===5),
            data.PropertyValues.find(item=>item.PropertyRef===6),
            data.PropertyValues.find(item=>item.PropertyRef===7),
            data.PropertyValues.find(item=>item.PropertyRef===8)]

        var body={
            sku:data.Code,
            facoryName:"MGM Lens",
            brandName:data.Title.split('_')[0],
            sph: property[0]&&property[0].Value,
            cyl: property[1]&&property[1].Value,
            lenzIndex:property[2]&&property[2].Value,
            material:property[3]&&property[3].Value,
            coating:property[4]&&property[4].Value,
            lenzType:property[5]&&property[5].Value,
            lenzDesign:property[4]&&property[4].Value,
            
            dia: property[7]&&property[7].Value,
            //add: e[11].firstChild.firstChild.firstChild.firstChild.value,
            //design: e[12].firstChild.firstChild.firstChild.firstChild.value,
            
        }
        //Object.assign(body);
        const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify(body)
        }
        console.log(postOptions)
        fetch(env.siteApi+"/order/manufacture/add",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                insertItem++;
                setError(insertItem + " item inserted")
            //console.log(result);
             if(insertItem ===stockData.notIn.length) {
                setTimeout(()=>window.location.reload(),2000);}
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
                        {stockData&&stockData.notIn&&stockData.notIn.map((stock,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{stock.ItemID}</td>
                                <td>{stock.Code}</td>
                                <td>{stock.Title}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default SepidarRXHolder