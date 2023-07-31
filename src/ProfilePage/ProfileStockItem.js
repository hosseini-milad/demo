
import { useEffect, useState } from 'react';
import env from '../env';
import OrderHeader from '../Manage/ManageModules/OrderHeader'
import StockHeader from '../Manage/ManageModules/StockHeader';
import StockPreview from '../OrderPage/Stock/Stock02/StockPreview';
function ProfileStockItem(props){
    const orderData = props.orderData;
    const userLog =orderData&&orderData.logData
    const [brandData,setBrandData] = useState(orderData&&orderData.rxData)
    const [userInfo , setUserInfo] = useState(orderData&&orderData.userDetail&&
        orderData.userDetail[0])
    const [showDetail,setShowDetail] = useState(props.open);
  //console.log(props)
    /*useEffect(() => {
        const data = orderData&&orderData.rxLenz?orderData.rxLenz.split(','):[];
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data[2]})
          }
          fetch(env.siteApi+"/order/manufacture/find",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result,data)
                setBrandData(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
            
            postOptions={
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({userId:orderData.userId})
              }
              fetch(env.siteApi+"/userInfo",postOptions)
                .then(res => res.json())
                .then(
                  (result) => {
                    //console.log(result,data)
                    setUserInfo(result)
                  },
                  (error) => {
                    console.log({error:error});
                  }
                )
                .catch((error)=>{
                  console.log(error)
                })
    },[])*/
    
    //console.log(props)
    var userRow=[orderData.consumer];
    userRow=brandData&&[orderData.consumer,brandData.facoryName,brandData.brandName,
        brandData.lenzType,brandData.lenzDesign,brandData.lenzIndex,brandData.material,
        brandData.coridor
    ]
    
    
    //console.log(orderData)
    if(orderData.status.includes("cancel")&&
        (props.manager!=="manager"&&
        props.manager!==orderData.status.split('|')[2]))
        return
    return(
        <>{orderData&&orderData.status==="sending"?
              <StockHeader manager={props.manager} orderData={orderData} setRefreshRate={props.setRefreshRate}
                 userInfo={userInfo}  setShowDetail={setShowDetail} showDetail={showDetail}/>:

            <div className="profileOrderList">
            <div className="profileOrder">
                <StockHeader manager={props.manager} orderData={orderData} setRefreshRate={props.setRefreshRate}
                 userInfo={userInfo}  setShowDetail={setShowDetail} showDetail={showDetail} userLog={userLog}/>
                
                <div style={{display:showDetail?"block":"none"}}>
                {orderData&&<StockPreview lenzDetail={brandData} defData={orderData} />}
            <br/>
              </div>
            </div>
        </div>
        } 
        </>
    )
}
export default ProfileStockItem