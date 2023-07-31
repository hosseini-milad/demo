import { useEffect, useState } from "react";
import env from "../env";
import HelpOrder from "../OrderPage/OrderModules/helpOrder";
import OrderStep01 from "../OrderPage/OrderStep01"
import OrderStep02 from "../OrderPage/OrderStep02";
import OrderStep03 from "../OrderPage/OrderStep03";
import OrderStep04 from "../OrderPage/OrderStep04";
import OrderStep05 from "../OrderPage/OrderStep05";
import OrderStep06 from "../OrderPage/OrderStep06";
import OrderTab from "../OrderPage/orderTab"
import PreViewOrder from "../OrderPage/PreView";
import PreViewForm from "../OrderPage/PreViewForm";
import Login from "./Login";

const token = JSON.parse(localStorage.getItem('token-lenz'))

function Order(){
  const [allParams,setAllParams] = useState('')
    //const brands=SimpleFetch(env.siteApi+"/product/brands")
    //const params = SimpleFetch(env.siteApi+"/order/params")
    //const helps=SimpleFetch(env.siteApi+"/helplist")
    const [rxData,setRXData]= useState('');
    const [error,setError]= useState('');
    const [tabIndex,setTabIndex] = useState(-1);
    const [userData,setUserData] = useState(token&&token.mobile)
    const [userRaw,setUserRaw] = useState()
    //console.log(tabIndex)
    useEffect(() => {
      const getOptions={
        method:'get',
        headers: {'Content-Type': 'application/json'}
      }
      const postSimple={
        method:'post',
        headers: {'Content-Type': 'application/json'}
      }
      fetch(env.siteApi+"/report/customers",postSimple)
      .then(res => res.json())
      .then(
        (result) => {
          setAllParams(pState => {
            return { ...pState, consumers: result }
          });
        },
        (error) => {
          console.log({error:error});
        }
      )

      fetch(env.siteApi+"/product/brands",getOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setAllParams(pState => {
                return { ...pState, brands: result }
              });
            },
            (error) => {
              console.log({error:error});
            }
          )
        fetch(env.siteApi+"/order/params",getOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setAllParams(pState => {
              return { ...pState, params: result }
            });
          },
          (error) => {
            console.log({error:error});
          }
        )
        fetch(env.siteApi+"/helplist",getOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setAllParams(pState => {
              return { ...pState, helps: result }
            });
          },
          (error) => {
            console.log({error:error});
          }
        ) 
        const loginCheck={
          method:'get',
          headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        }
        fetch(env.siteApi+'/auth/welcome',loginCheck)
        .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
            },
            (error) => {
              
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
      const data = [];//allParams.manufacture.rxLenz?props.def.rxLenz.split(','):[];
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({sku:data[2]})
        }
        fetch(env.siteApi+"/order/manufacture/find",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              //console.log(result,data)
              setAllParams(pState => {
                return { ...pState, manufacture: result }
              });
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
      
  },[])

    useEffect(() => {
      if(!token){
        localStorage.removeItem('token-lenz');
        window.location="/login";
      }
        const postOptions={
          method:'get',
          headers: { 
            'Content-Type': 'application/json',
            'x-access-token':token.token,
            'userId':token.userId}
        }
        fetch(env.siteApi+"/order/rxlist",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              result.userRaw&&setUserRaw(result.userRaw)
              result.userInfo&&setUserData(result.userInfo)
              var initialResult = result&&result.rxData.find(item=>item.status==="initial");
              result&&initialResult?setRXData(initialResult):setRXData({})
              tabIndex===-1&&setTabIndex(initialResult?initialResult.lastIndex:0)
              setAllParams(pState => {
                return { ...pState, manufacture: initialResult }
              });
              //result?:setRXData({})
            },
            (error) => {
              setRXData({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
        window.scrollTo(0, 170);
    },[tabIndex])
    const saveState=(items)=>{
        
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'manageId':token.access&&token.access!=="customer"?
                (token.mobile):'',
              'userId':token.userId},
              body:JSON.stringify(items)
          }
          //console.log(postOptions)
          fetch(env.siteApi+"/order/addrx",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result)
                if(result.message!=="done"){
                  setTabIndex(result.message)
                  if(result.message===1)
                  window.location.href="/order/rx#lenzDetail"
                  if(result.message===2)
                  window.location.href="/order/rx#odOsDetail"
                }
                if(result.new&&result.message=="done")
                  setTimeout(()=>window.location.href="/order/rx",3000)
              },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })
    }
    return(
    <main className="pagesMain">
        {/*<BreadCrumb data={[
            {link:"/",label:" خانه / "},
            {link:"/order",label:"سفارش آنلاین / "},
            {link:"#",label:" عدسی سفارشی RX "},
            ]}/>*/}
        {allParams.params&&<div className="mainOrder">
          {tabIndex!==10&&<OrderTab index={tabIndex} setTabIndex={setTabIndex} />}
          {token&&(token.access==="customer"||token.access==="manager"||token.access==="sale")&&
            !rxData.error?rxData?<div className="orderHolder">
            {tabIndex === 0&&<OrderStep01 setTabIndex={setTabIndex} def={rxData} saveState={saveState} 
              userInfo={userData} params={allParams.consumers} token={token} userRaw={userRaw}/>}
            {tabIndex === 1&&<OrderStep02 setTabIndex={setTabIndex} brands={allParams.brands} def={allParams.manufacture} saveState={saveState}/>}
            {tabIndex === 2&&<OrderStep03 setTabIndex={setTabIndex} def={rxData} saveState={saveState} params={allParams}/>}
            {tabIndex === 3&&<OrderStep04 setTabIndex={setTabIndex} def={rxData} saveState={saveState} helps={allParams.helps} params={allParams.params}/>}
            {tabIndex === 4&&<OrderStep05 setTabIndex={setTabIndex} def={rxData} saveState={saveState}/>}
            {tabIndex === 5&&<OrderStep06 setTabIndex={setTabIndex} def={rxData} saveState={saveState} token={token}/>}
            {tabIndex === 10&&<PreViewForm setTabIndex={setTabIndex} def={rxData} saveState={saveState}
              token={token} 
            />}
        </div>:<div className="loginText">Loading...</div>:''}
        {(!token||rxData.error)&&<div className="loginText"><Login /></div>}
        {token&&(token.access!=="customer"&&token.access!=="manager"&&token.access!=="sale")&&
          <HelpOrder />
        }
        </div>}
    </main>
    )
}
export default Order