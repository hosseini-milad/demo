import BreadCrumb from "../Components/BreadCrumb";
import SimpleFetch from "../Components/simpleFetch";
import env from "../env";
import "../css/manage.css"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";

function Manage(){
    const stockList = SimpleFetch(env.siteApi+"/order/stock/list");
    const brandList = SimpleFetch(env.siteApi+"/product//brands");
    console.log(stockList)
    const [brandSelect , setBrandSelect]= useState("")
    const [selectedBrand,setSelectBrand] = useState({})
    const changeOption=(e)=>{
        setBrandSelect(e);
        setSelectBrand({brand:e&&e.enTitle})
    }
    //console.log(brandList)
    const options=["عملیات","sku","برند","طراحی","OD","OS","قیمت واحد(راست)",
            "قیمت واحد(چپ)","تخفیف"];
    const rowSpan=["2","2","1","2","1","1","2","2","2"]
    const colSpan=["1","1","4","1","3","3","1","1","1"]
    const subOptions=["نام برند","ض.شکست","متریال",
            "پوشش","SPH","CYL","ϕ",
            "SPH","CYL","ϕ",];              
    const design=["Aspheric","Spheric"];
    
    const saveThis = (e)=>{
        var mySku = '';
        for(var i=2;i<e.length-3;i++){
            mySku+= e[i].childNodes[0].value+"-";
        }
        var body={
            id:e[1].id,
            brandName:e[2].firstChild.firstChild.firstChild.firstChild.value,
            lenzIndex:e[3].firstChild.firstChild.firstChild.firstChild.value,
            material:e[4].firstChild.firstChild.firstChild.firstChild.value,
            coating:e[5].firstChild.firstChild.firstChild.firstChild.value,
            design:e[6].firstChild.firstChild.firstChild.firstChild.value,

            sphOD: e[7].childNodes[0].value,
            cylOD: e[8].childNodes[0].value,
            od: e[9].childNodes[0].value,
            sphOS: e[10].childNodes[0].value,
            cylOS: e[11].childNodes[0].value,
            os: e[12].childNodes[0].value,
            priceOS:e[13].childNodes[0].value,
            priceOD:e[14].childNodes[0].value,
        }
        Object.assign(body , {sku:
        body.brandName+"-"+body.lenzIndex+"-"+body.material+"-"+
        body.coating+"-"+body.design+"-"+body.os+"-"+body.od
        });
        //const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify(body)
        }
        console.log(postOptions)
        fetch(env.siteApi+"/order/stock/add",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result);
            setTimeout(()=>window.location.reload(),200);
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
        <main className="pagesMain">
            <BreadCrumb data={[
            {link:"/",label:" خانه / "},
            {link:"/category",label:"دسته بندی  "},
            {link:"#",label:""},
            ]}/>
            <div className='orderTableHolder'>
                <table className="orderTable stockTable">
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
                    {stockList&&brandList&&stockList.stock.map((stockItem,i)=>(
                    <tr key={i} onClick={()=>{}}>
                        <td onClick={(e)=>saveThis(e.target.parentNode.children)}
                        class="saveManager">ذخیره</td>
                        <td style={{display:"none"}} id={stockItem._id}>{stockItem.sku}</td>
                        <td id="brandName" width={320}>
                        <Autocomplete
                            options={brandList.brands} 
                            disableClearable freeSolo
                            getOptionLabel={option => option.enTitle|| ""}
                            style={{ width: "100%"}}
                            defaultValue={
                                brandList.brands.find(item=>item.enTitle === stockItem.brandName)
                                ||[]} 
                            //defaultValue={stockItem.brandName||[]} 
                            onChange={(_event, Brand)=>changeOption(Brand)}
                            renderInput={(params) =>
                            <TextField {...params}/>}
                        />
                        </td>
                        <td id="lenzindex" width={100}>
                        {brandList&& <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.lenzIndex:[]}
                            style={{ width: "100%"}}
                            defaultValue={stockItem.lenzIndex}
                            //value={selectedBrand.lenzIndex|| null}
                            renderInput={(params) =>
                            <TextField {...params}    />}
                        />}
                        </td>
                        <td id="material" width={140}>
                        {brandList&& <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.material:[]}
                            style={{ width: "100%"}}
                            defaultValue={stockItem.material}
                            //value={selectedBrand.material|| null}
                            renderInput={(params) =>
                            <TextField {...params}    />}
                        />}
                        </td>
                        <td id="coating" width={220}>
                        {brandList&& <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.Coating:[]}
                            style={{ width: "100%"}}
                            defaultValue={stockItem.coating}
                            renderInput={(params) =>
                            <TextField {...params} />}
                        />} 
                        </td>
                        <td id="design" width={200}>
                        {brandList&& <Autocomplete
                            options={design}
                            disableClearable freeSolo
                            defaultValue={stockItem.design}
                            renderInput={(params) =>
                            <TextField {...params} />}
                        />} 
                        </td>
                        <td width={40}><input type="text" defaultValue={stockItem.sphOD}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.cylOD}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.od}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.sphOS}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.cylOS}/></td>
                        <td width={40}><input type="text" defaultValue={stockItem.os}/></td>
                        <td><input style={{width:"90%"}} type="text" defaultValue={stockItem.priceOD}/></td>
                        <td><input style={{width:"90%"}} type="text" defaultValue={stockItem.priceOS}/></td>
                        <td >{stockItem.discountOS}</td>

                    </tr>
                    ))}
                    
                    <tr>
                        <td onClick={(e)=>saveThis(e.target.parentNode.children)}>ذخیره</td>
                        <td style={{display:"none"}} id={"41224d776a326fb40f000001"}>{"sku"}</td>
                        <td><Autocomplete
                            disableClearable freeSolo
                            options={brandList.brands}
                            getOptionLabel={option => option.enTitle|| ""}
                            onChange={(_event, Brand)=>changeOption(Brand)}
                            renderInput={(params) =>
                            <TextField {...params}/>}
                        /></td>
                        <td>
                        <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.lenzIndex:[]}
                            renderInput={(params) =>
                            <TextField {...params}    />}
                        /></td>
                        <td>
                        <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.material:[]}
                            renderInput={(params) =>
                            <TextField {...params}    />}
                        /></td>
                        <td>
                        <Autocomplete
                            disableClearable freeSolo
                            options={brandSelect?brandSelect.Coating:[]}
                            renderInput={(params) =>
                            <TextField {...params} />}
                        /></td>
                        <td>
                        <Autocomplete
                            disableClearable freeSolo
                            options={design}
                            renderInput={(params) =>
                            <TextField {...params} />}
                        /></td>
                        <td width={40}><input type="text" /></td>
                        <td width={40}><input type="text" /></td>
                        <td width={40}><input type="text" /></td>
                        <td width={40}><input type="text" /></td>
                        <td width={40}><input type="text" /></td>
                        <td width={40}><input type="text" /></td>
                        <td ><input style={{width:"90%"}} type="text" /></td>
                        <td ><input style={{width:"90%"}} type="text" /></td>
                        <td >تخفیف</td>

                    </tr>
                </tbody>
            </table>
            </div>
        </main>)
}
export default Manage