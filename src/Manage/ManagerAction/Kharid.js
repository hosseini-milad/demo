import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState ,useEffect} from 'react';
import env, { normalPrice, purePrice } from '../../env';
const token = JSON.parse(localStorage.getItem('token-lenz'))
var done = 0;

function Kharid(props){
    const [faktorValue,setFaktorValue] = useState('');
    const [faktorNo,setFaktorNo] = useState('')
    const [faktorName,setFaktorName] = useState('')
    const [error,setError] = useState('')
    const [status,setStatus] = useState(0)
    const [faktorList,setFaktorList] = useState([])
    const [doJob,setDoJob] = useState(0)
    const [purchasePercent,setPurchasePercent]= useState([])
    const [orderValue,setOrderValue] = useState()
    console.log(faktorList)
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'}
        }
        fetch(env.siteApi+"/product/brand",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setPurchasePercent(result);
            //setTimeout(()=>window.location.reload(),200)
            },
            (error) => {
            console.log(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
        fetch(env.siteApi+"/order/rxSuspend",postOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setFaktorList(
                        result.map((item,i)=>(
                        {value:item.rxOrderNo,
                        price:item.price,
                        sku:item.sku.sku,
                        hesab:item.sku.hesabfa,
                        brand:"brand",
                        discount:"5%",
                        factory:item.factory,
                        fCode:item.fCode,
                        desc:item.status}
                    )))
                //console.log(result)
                }
            )
            .catch((error)=>{
                console.log(error)
            })
    //console.log(purchasePercent)
    },[])
    useEffect(()=>{
        console.log(orderValue)
        if(!orderValue) return
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
            'userId':token.userId},
            body:JSON.stringify({search:orderValue})
          }
          console.log(postOptions)
          fetch(env.siteApi+"/order/rxKharid/search",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                if(result.error){
                    setError(result.error)
                    return;}
                setError('')
                const rep = faktorList.find(item=>item.value===(result[0]&&result[0].rxOrderNo))
                if(!rep) 
                setFaktorList(existingItems => {
                    return [
                    ...existingItems.slice(0, faktorList.length),
                    {value:result[0]&&result[0].rxOrderNo,
                        price:purePrice(result[0]&&result[0].rxLenz&&result[0]&&result[0].rxLenz.split(',')[0])*92/100,
                        brand:result[0]&&result[0].brand,
                        discount:purchasePercent.find(item=>item.enTitle===result[0]&&result[0].brand),
                        factory:faktorName,fCode:faktorNo},
                    ...existingItems.slice(faktorList.length + 1),
                    ]
                })
                if(result)setFaktorValue('')
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
              //console.log(postOptions)
            
    },[orderValue])
    {/*const findRXOrderNo= async(orderNo)=>{
        if(!faktorNo){
            setError('لطفا شماره فاکتور را وارد کنید')
            return;}
        for(var i=0;i<props.orderData.length;i++)
            if(props.orderData[i].rxOrderNo.includes(orderNo)){
                const result = await findPrice(orderNo)
                return(props.orderData[i])
            }
        return(false)
    }
    const findPrice=(orderNo)=>{
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({rxOrderNo:orderNo})
        }
        fetch(env.siteApi+"/order/fetch-order",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            //console.log({...props.orderData[index],price:result.coverPrice});
            return(result.coverPrice)
            //setTimeout(()=>window.location.reload(),200)
            },
            (error) => {
            console.log(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }*/}
    const printFaktor=(faktorInfo)=>{
        //console.log(faktorInfo.Reference)
        window.open((token.phone==="09123778619"?"/hesabfishprint/":"/hesabprint/")
                  +faktorInfo.Reference, "_blank")
    }
    const changeOrderStatus=(rxOrderNo)=>{
        //const acceptStatus = !reason&&window.confirm("تایید سفارش؟");
        if(!faktorNo){
            setError('لطفا شماره فاکتور را وارد کنید')
            return;}
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({rxOrderNo:rxOrderNo,
                status:"delivered"})
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/order/manage/addrx",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                    setError(result.error);
                    delayFunction()
                    return;}
                else{
                    setStatus(result.setFaktor.Success);
                    if(result.setFaktor.Success===true){
                        printFaktor(result.setFaktor.Result)
                        delayFunction()
                    }
                    else{setError(`مشکلی در ثبت سفارش ${rxOrderNo} رخ داده است`);
                        delayFunction()
            }}
            //setTimeout(()=>window.location.reload(),200)
            },
            (error) => {
                setStatus(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }
    const delayFunction=async()=>{
        //console.log(faktorList)
        if(done === faktorList.length){
            setError("سفارشات تایید شدند");
            setTimeout(()=>window.location.reload(),2000)
            return
        }
        setTimeout(()=>{//setError('سفارش '+faktorList[done].value +'تایید شد ');
            const statusTemp = changeOrderStatus(faktorList[done].value);
            done+= 1;
            
        },3000)
    }
    const saveState=async()=>{
        done = 0;
        var iterate = faktorList.length
        if(!faktorList.length){
            setError('سفارشی موجود نیست'); return
        }
        if(!faktorNo){
            setError('شماره فاکتور وارد نشده است'); return
        }
        setDoJob(1)
        setError("در حال ثبت سفارش")
        await delayFunction()
        
        
        //setTimeout(()=>window.location.reload(),2000)
    }
    const setFaktorFunction=async(e)=>{
        setFaktorValue(e.target.value);
        var orderNo = '';
        if(e.target.value.length>5){
        orderNo = setOrderValue(e.target.value)//await findRXOrderNo(e.target.value)
        /*if(orderNo){
            //console.log(orderNo)
        setFaktorList(existingItems => {
            return [
            ...existingItems.slice(0, faktorList.length),
            {value:orderNo.rxOrderNo,price:purePrice(orderNo.rxLenz&&orderNo.rxLenz.split(',')[0])*92/100,
                brand:orderNo.brand,
                discount:purchasePercent.find(item=>item.enTitle===orderNo.brand),
                factory:faktorName,fCode:faktorNo},
            ...existingItems.slice(faktorList.length + 1),
            ]
        })}*/


        }
    }
    return(
        <div className="kharidHolder">
            <div className="kharidInput">
                <TextField label="شماره فاکتور" variant="outlined"
                    onChange={(e)=>setFaktorNo(e.target.value)}
                    />
                <Autocomplete disableClearable
                    options={["عادل لنز","MGM Lens"]}
                    defaultValue="MGM Lens"
                    onChange={(e,value)=>setFaktorName(value)}
                    style={{ width: "100%"}}
                    renderInput={(params) =>
                    <TextField {...params} label="تولید کننده" variant="outlined"/>}
                />
                
                <TextField label="شماره سفارش" variant="outlined"
                value={faktorValue} inputProps={{ style: { textTransform: "uppercase" } }}
                onChange={(e)=>setFaktorFunction(e)}/>
            </div>
            <div className="orderTable">
                <table>
                    <tbody>
                        <tr><th>ردیف</th>
                            <th>شماره سفارش</th>
                            <th>تولید کننده</th>
                            <th>شماره فاکتور</th>
                            <th>شناسه محصول</th>
                            <th>کد حسابداری</th>
                            <th>قیمت خرید</th>
                            <th>توضیحات</th>
                        </tr>
                        {faktorList.map((fl,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td style={{minWidth:"200px"}}>{fl.value}</td>
                                <td>{fl.factory}</td>
                                <td>{fl.fCode}</td>
                                <td>{fl.sku}<br/><sub>ح: </sub>{fl.hesab}</td>
                                <td>{fl.hesab}</td>
                                {/*<td>{fl.discount?fl.discount.purchase:10}</td>*/}
                                <td style={{direction:"rtl"}}>{normalPrice(fl.price)} ریال </td>
                                <td>{fl.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!doJob?<input className='profileBtn' type="button" 
            onClick={saveState} value="تحویل انبار"/>:
            <input className='disableBtn' value="در حال ثبت" type="button" />}
            <small style={{color: "brown"}}>{error}</small>
        </div>
    )
}
export default Kharid