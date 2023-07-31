import { useEffect, useState } from "react";
import env from "../../env";
function ExportExcel(){
    const [url,setUrl]= useState();
    const [error,setError] = useState('')
    const options=["ردیف","ID","شناسه محصول","توضیح محصول"];
    console.log(url)
    const getExport = () => {
        const postOptions={
            method:'get',
            headers: { 
            'Content-Type': 'application/json'}
        }
        //console.log(postOptions)
        setError("در حال دریافت اطلاعات")
        fetch(env.siteApi+"/sepidar/sepidar-export",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            setError("فایل خروجی ایجاد شد")
                setUrl(result.url)
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })

        }

    return(
        <div className="reyhamPanel">
            <div className="orderContinue" style={{display: "flex",alignItems:"center"}}>
                <small>{error}</small>
           
                {url?<input type="button" style={{margin: "10px"}} className="orderBtn" 
                    value="دریافت فایل اکسل" onClick={()=>window.location.href=env.siteApiUrl+"/"+url}/>:''}
                <input type="button" style={{margin: "10px"}} className="orderBtn" 
                    value="جمع آوری اطلاعات" onClick={getExport}/>
             </div>
            {/*<div className="orderDataHolder">
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
                        </div>*/}
        </div>
    )
}
export default ExportExcel