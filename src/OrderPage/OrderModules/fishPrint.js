import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env from "../../env";
import Preview from "./Preview";
import PreviewStock from "./PreviewStock";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function FishPrint(props){
    const rxOrderNo = document.location.pathname.split('/')[2];
    const [orderInfo, setOrderInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    const [userInfo , setUserInfo] = useState('')
    const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
    persianDate.toCalendar('persian');
    const[pDate,setPDate] = useState('');
    const[pWeek,setPWeek] = useState('');
    const[color,setColor] = useState('');
    //console.log(orderInfo)
    useEffect(() => {
      if(rxOrderNo!=="temp"&&type==="RX"){
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({'rxOrderNo':rxOrderNo})
          }
          fetch(env.siteApi+"/order/fetch-order",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setOrderInfo(result.data);
                setUserInfo(result.user)
                setPDate(new persianDate(new Date(result.data.date)).format());
                setPWeek(new persianDate(new Date(result.data.date)).format().split(' ')[1].split(':'));
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
      }
      if(rxOrderNo==="temp"&&type==="RX"){
        const postOptions={
          method:'get',
          headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
        }
        fetch(env.siteApi+"/order/rxList",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setOrderInfo(result.rxData.find(item=>item.status==="initial"));
            setPDate(new persianDate(Date.now()).format());
            setPWeek(new persianDate(new Date(result.date)).format().split(' ')[1].split(':'));
          },
          (error) => {
            console.log({error:error});
          }
        )
        .catch((error)=>{
          console.log(error)
        })
        
      }
      if(type==="Stock"){
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
          body:JSON.stringify({'stockOrderNo':rxOrderNo})
        }
        fetch(env.siteApi+"/order/fetch-stock",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setOrderInfo(result);
              setPDate(new persianDate(new Date(result.date)).format());
              setPWeek(new persianDate(new Date(result.date)).format().split(' ')[1].split(':'));
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
      }
      fetch(env.siteApi+"/order/color")
      .then(res => res.json())
      .then(
      (result) => {
          //console.log(result)
          setColor(result)
      },
      (error) => {
          console.log(error);
      }
      )
      .catch((error)=>{
      console.log(error)
      })
          //window.scrollTo(0, 170);
      },[])
    useEffect(() => {
        if(!orderInfo) return
        const data = orderInfo.rxLenz?orderInfo.rxLenz.split(',')[2]:'';
        
        if(!data)return
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data})
        }
        fetch(env.siteApi+"/order/manufacture/find",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setRxInfo(result)
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
        //window.scrollTo(0, 170);
    },[orderInfo])
    //console.log(rxInfo)
    const printNow=()=>{
        window.print();
    }
    return(
        <div className="printArea fishPrintArea">
          {orderInfo&&orderInfo.status.includes('cancel')?
            <img className="bluePrint" src={"/img/cancel.png"}/>
            :<></>}
            <div className="userInfo fishSection">
              <div className="userSection">
                <strong>سفارش نسخه ای</strong>
              </div>
              <div className="userSection">
                <strong>MGM Lens</strong>
              </div>
              
            </div>
            <div className="userSection fishSection">
                <small>شماره سفارش: {rxOrderNo}</small>
                <small className="fishDate">تاریخ: 
                  {pDate&&pDate.split(' ')[0].replaceAll('-','/')}</small>
                
            </div>
            <div className="userSection fishSection">
                <small>نام مشتری: {userInfo.cName?
                userInfo.cName:userInfo.phone}</small>
                
            </div>
            {type==="RX"?<Preview defData={orderInfo} lenzDetail={rxInfo} 
              colorList={color} print="1"/>:
              <PreviewStock defData={orderInfo} lenzDetail={rxInfo}/>}
              
              <small>ساعت ثبت سفارش: <b>{`${pWeek[0]}:${pWeek[1]}`}</b></small><br/>
              <small style={{textAlign:"left",display:"block"}}>امضای مشتری</small><br/><hr/>

            <button onClick={()=>printNow()}>چاپ</button>
        </div>
    )
}
export default FishPrint