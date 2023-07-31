import BreadCrumb from "../Components/BreadCrumb";
import SimpleFetch from "../Components/simpleFetch";
import env, { filterResult, normalPrice } from "../env";
import "../css/manage.css"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Filters from "./filters";
import Paging from "../CategoryPage/Paging";
import TotalPrice from "./ManageModules/TotalPrice";
import ManyPriceRX from "./ManageModules/ManyPriceRX";
import ChangePriceStatus from "./ManageModules/ChangePriceStatus";

function ManageManufacture(){
    //const manufactureList = SimpleFetch(env.siteApi+"/order/manufacture/list");
    const brandList = SimpleFetch(env.siteApi+"/product/brands");
    
    const [perPage , setperPage]= useState("10")
    const [copySelect,setCopySelect] = useState(-1)
    const [filteredResult , setFilteredResult]= useState("")
    const [selectedCopy,setSelectCopy] = useState('')
    const [manResult,setManResult] = useState("")
    const [refreshTable,setRefreshTable] = useState(0)
    const [priceSet,setPriceSet] = useState('')
    const [pageNumber,setPageNumber] = useState('')
    const [content,setContent] = useState('')
    const [error,setError] = useState('')
    const [changes,setChanges] = useState([])

    useEffect(() => {
        if(manResult.sku&&manResult.sku.length<3)return
        const body={
            page:pageNumber,
            facoryName:manResult.manufacture,
            brand:manResult.brandName,
            lenzType:manResult.lenzType,
            lenzDesign:manResult.lenzDesign,
            lenzIndex:manResult.lenzIndex,
            material:manResult.material,
            sku:manResult.sku,
            pageSize:perPage,
            access:"manager"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
        fetch(env.siteApi + "/order/manufacture/list",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent('')
          //console.log(result)
            setTimeout(()=> setContent(result),200)
        },
        (error) => {
            setError(error);
        }
        
    )},[pageNumber,manResult,perPage,refreshTable,priceSet])

    //console.log(changes)
    useEffect(() => {
        setFilteredResult('');
        content&&setTimeout(()=>
        setFilteredResult(filterResult(content,manResult)),200);
        },[manResult,content])

    const changeOption=(e)=>{
        //setBrandSelect(e);
        //setSelectBrand({brand:e&&e.enTitle})
    }
    
    const options=["عملیات","کپی","sku","lensCode","شرکت","برند","نوع عدسی","طراحی","ض.شکست",
            "متریال","قیمت واحد","وضعیت", "اعلامیه.قیمت","قیمت.خرید"];
    
    const saveThis = (elem)=>{
        const e = elem.childNodes
        //console.log(e[1].id,e[1].textContent);
        //if(!e[1].childNodes[0].value&&!e[1].textContent)
        //    {alert("شناسه محصول خالی است"); return}
        console.log(e)
        var activeItem = e[11].firstChild.firstChild.firstChild.firstChild.value;

        setError('')
        const bodyId=e[2].id?{id:e[2].id}:{};
        var body={
            sku:e[2].childNodes[0].value,
            lensCode:e[3].childNodes[0].value,
            facoryName:e[4].firstChild.firstChild.firstChild.firstChild.value,
            brandName:e[5].firstChild.firstChild.firstChild.firstChild.value,
            lenzType:e[6].firstChild.firstChild.firstChild.firstChild.value,
            lenzDesign:e[7].firstChild.firstChild.firstChild.firstChild.value,
            lenzIndex:e[8].firstChild.firstChild.firstChild.firstChild.value,
            material:e[9].firstChild.firstChild.firstChild.firstChild.value,
            
            lenzPrice:e[10].childNodes[0].value,
            lenzPrice1:e[12].childNodes[0].value,
            lenzPurchase:e[13].childNodes[0].value,
            active:activeItem?(activeItem==="فعال"?"true":"false"):""
        }
        //const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            //'x-access-token':token.token
            body:JSON.stringify({...body,...bodyId})
        }
        //console.log(postOptions)
       fetch(env.siteApi+"/order/manufacture/add",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                result.error?setError(result.error):
            //console.log(result);
            setTimeout(()=>setRefreshTable(refreshTable+1),200);
            },
            (error) => {
                console.log(error);
            
            }
        )
        .catch(error => {
            setError(error)
        })
    }
    const copy = (elem)=>{
        const e = elem.childNodes
        var body={
            lensCode:e[3].childNodes[0].value,
            facoryName:e[4].firstChild.firstChild.firstChild.firstChild.value,
            brandName:e[5].firstChild.firstChild.firstChild.firstChild.value,
            lenzType:e[6].firstChild.firstChild.firstChild.firstChild.value,
            lenzDesign:e[7].firstChild.firstChild.firstChild.firstChild.value,
            lenzIndex:e[8].firstChild.firstChild.firstChild.firstChild.value,
            material:e[9].firstChild.firstChild.firstChild.firstChild.value,
            
            lenzPrice:e[10].childNodes[0].value,
            lenzPrice1:e[12].childNodes[0].value,
            lenzPurchase:e[13].childNodes[0].value,
        }
        setSelectCopy(body)
    }
    return(
        <div className='orderTableHolder'>
            <div className="filters ltr">
                <Filters manufactureList={content} brandList={brandList} setManResult={setManResult}/>
            </div>
            <div className="perPage">
                <span>تعداد در صفحه: </span>
                <Autocomplete
                    options={["5","10","20","50"]} 
                    disableClearable freeSolo
                    style={{ width: "50px"}}
                    
                    value={perPage} 
                    onChange={(_event, Brand)=>{setperPage(Brand)}}
                    renderInput={(params) =>
                    <TextField {...params} />}
                />
            </div>
            {1?<></>:<TotalPrice content={changes}/>}
            {content&&<ManyPriceRX  content={content&&content} setPriceSet={setPriceSet}/>}
            <ChangePriceStatus rxStock={"rx"}/>
            <label className="errorMessage">{error}</label>
            <table className="orderTable stockTable">
            <tbody>
                <tr> 
                    {options.map((th,i)=>(
                    <th key={i}>{th}</th>))}
                </tr>
                
                <tr>
                    <td onClick={(e)=>saveThis(e.target.parentNode.parentNode)}>
                        <i className="icon-size fas fa-save"></i>
                    </td>
                    <td></td>
                    <td style={{width:"60px"}} ><input type="text" /></td>
                    <td style={{width:"60px"}} ><input type="text" /></td>
                    <td width={220}><Autocomplete
                        disableClearable freeSolo
                        options={content.manufacture||[]}
                        value={selectedCopy.facoryName||null}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td width={170}><Autocomplete
                        disableClearable freeSolo
                        options={content.brandList||[]}
                        value={selectedCopy.brandName||null}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td width={100}><Autocomplete
                        disableClearable freeSolo style={{width:"90%"}}
                        options={content.lenzType||[]}
                        value={selectedCopy.lenzType||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td  width={120}><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={content.lenzDesign&&content.lenzDesign.length>1?content.lenzDesign:[]||[]}
                        value={selectedCopy.lenzDesign||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td  width={80}><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={content.lenzIndex||[]}
                        value={selectedCopy.lenzIndex||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    
                    <td width={350}><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={content.material||[]}
                        value={selectedCopy.material||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td  width={120}><input style={{width:"90%"}} type="text" 
                        onChange={(e)=>e.target.value= normalPrice(e.target.value)}/></td>
                    <td width={150}><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={["فعال","غیرفعال"]}
                        value={selectedCopy.active||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td ><input style={{width:"90%"}} type="text" 
                        onChange={(e)=>e.target.value= normalPrice(e.target.value)}/></td>
                    <td ><input style={{width:"90%"}} type="text" 
                        onChange={(e)=>e.target.value= normalPrice(e.target.value)}/></td>       
                    
                </tr>
                {content&&brandList&&content.manData.map((manItem,i)=>(
                    //console.log(manItem)||
                <tr key={i} onClick={()=>{}} style={{backgroundColor:copySelect===i?"var(--tab-color)":"initial"}}>
                    <td onClick={(e)=>saveThis(e.target.parentNode.parentNode)}
                    className="saveManager"><i className="icon-size fas fa-save"></i></td>
                    <td className="copyRow" onClick={(e)=>{copy(e.target.parentNode.parentNode);setCopySelect(i)}}>
                    <i className="icon-size fas fa-copy"></i>
                    </td>
                    <td id={manItem._id}>{manItem.sku}</td>
                    <td style={{width:"60px"}} ><input type="text" defaultValue={manItem.lensCode}/></td>
                    <td id="brandName">
                    <Autocomplete
                        options={content.manufacture||[]} 
                        disableClearable freeSolo
                        style={{ width: "100%"}}
                        
                        defaultValue={manItem.facoryName||""} 
                        onChange={(_event, Brand)=>changeOption(Brand)}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    />
                    </td>
                    <td id="brandName" >
                    <Autocomplete
                        options={content.brandList||{}} 
                        disableClearable freeSolo
                        style={{ width: "100%"}}
                        defaultValue={manItem.brandName||""} 
                        //defaultValue={manItem.brandName||[]} 
                        onChange={(_event, Brand)=>changeOption(Brand)}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    />
                    </td>
                    <td >
                    <Autocomplete
                        options={content.lenzType||[]} 
                        disableClearable freeSolo
                        style={{ width: "100%"}}
                        
                        defaultValue={manItem.lenzType||""} 
                        onChange={(_event, Brand)=>changeOption(Brand)}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td >
                    <Autocomplete
                        options={content.lenzDesign&&content.lenzDesign.length>1?content.lenzDesign:[]||[]}
                        disableClearable freeSolo
                        style={{ width: "100%"}}
                        
                        defaultValue={manItem.lenzDesign||[]} 
                        onChange={(_event, Brand)=>changeOption(Brand)}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={content.lenzIndex||[]}
                        defaultValue={manItem.lenzIndex||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={content.material||[]}
                        defaultValue={manItem.material||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    {/*<td><input style={{width:"90%"}} type="text" defaultValue={manItem.coridor}/></td>*/}
                    <td><input style={{width:"90%"}} type="text" defaultValue={normalPrice(manItem.lenzPrice)}
                            onChange={(e)=>{e.target.value= normalPrice(e.target.value);
                                setChanges(cItems => {
                                    return [
                                    ...cItems.slice(0, changes.length),
                                    [manItem.sku,e.target.value,manItem.hesabfa,manItem.brandName],
                                    ...cItems.slice(changes.length + 1),
                                    ]
                                })
                            }}/></td>
                            <td width={150}><Autocomplete
                        disableClearable freeSolo style={{width:"100%"}}
                        options={["فعال","غیرفعال"]}
                        //value={selectedCopy.active||""}
                        defaultValue={!manItem.active?"":
                            (manItem.active==="true"?"فعال":"غیرفعال")||""}
                        onChange={()=>{}}
                        renderInput={(params) =>
                        <TextField {...params}/>}
                    /></td>
                    <td><input style={{width:"90%"}} type="text" defaultValue={normalPrice(manItem.lenzPrice1)}
                            onChange={(e)=>e.target.value= normalPrice(e.target.value)}/></td>
                    <td><input style={{width:"90%"}} type="text" defaultValue={normalPrice(manItem.lenzPurchase)}
                            onChange={(e)=>e.target.value= normalPrice(e.target.value)}/></td>
                    
                </tr>
                ))}
                
            </tbody>
        </table>
        {content&&
        <Paging content={content} setPageNumber={setPageNumber} 
            pageNumber={pageNumber} perPage={perPage}/>}
        </div>)
}
export default ManageManufacture