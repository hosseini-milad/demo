import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react"
import SimpleAlert from "../Components/SimpleAlert";
import SimpleAuth from "../Components/simpleAuth";
import env, { isMobile, standardPassword } from "../env";
import JobPop from "./JobPop";
import ProfileEditPop from "./ProfileEditPop";
const token = JSON.parse(localStorage.getItem('token-lenz'))
function ProfileSection6(props){
    const [pop,setPop] = useState(0);
    const [data,setData] = useState({});
    const userTemp = {...props.userData,...props.user};
    const [alertShow,setAlertShow] = useState(0)
    
    const [userInfo , setUserInfo] = useState(userTemp?userTemp:{});
    //console.log(userTemp)
    const updateInfo =()=>{
        
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json',
            'x-access-token':token.token,
            'userId':token.userId},
            body:JSON.stringify(
            {
                phone:token.mobile?token.mobile:userInfo.phone,
                userName: userInfo&&userInfo.userName?userInfo.userName:
                userInfo.cName,
                meliCode:userInfo.meliCode,
                birthDate:userInfo.birthDate,
                email:userInfo.email,
                hesab:userInfo.hesab,
                mobile:userInfo.mobile,
                job:userInfo.job,
                userId:Object(token.userId)
            }
            )
        }
        
        console.log(postOptions)
         fetch(env.siteApi+"/auth/userInfo/set",postOptions)
            .then(res => res.json())
            .then( 
              (result) => {
                console.log(result);
                setAlertShow({ show: true, action:0})
                //setTimeout( ()=>window.location.reload(),3000);
              },
              (error) => {
                console.log(error);
                
              }
            )
            .catch(error => {
                console.log(error)
            })
    }
    const updatePassword =(e)=>{
        const password = standardPassword(e.target.previousSibling.value);
        //console.log(password)
        if(!password.error){
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json',
            'x-access-token':token.token,
            'userId':token.userId},
            body:JSON.stringify( {password:password})
        }
        
        console.log(e.target.previousSibling.value)
        fetch(env.siteApi+"/user/password",postOptions)
            .then(res => res.json())
            .then( 
              (result) => {
                console.log(result);
                window.alert("اطلاعات با موفقیت ثبت شد")
                //window.location.reload();
              },
              (error) => {
                console.log(error);
                
              }
            )
            .catch(error => {
                console.log(error)
            })
        }
        else{
            window.alert(password.error)
        }
    } 
    useEffect(()=>{
        if(alertShow.action) window.location.reload()
    },[alertShow])
    return(
        <div className="favHolder">
            <div className="" style={{alignItems: "baseline",display:"flex"}}>
                <h2 className="profileTitle">اطلاعات حساب کاربری</h2>
                <div className="userPassHolder">
                    <div className="userData">
                        <span>تغییر رمز عبور</span>
                        
                    </div>
                    <div className="userIcon">
                        <input type="password" defaultValue={''}/>
                        <input type="button" value="اعمال" className="passBtn"
                            onClick={(e)=>updatePassword(e)}/>
                    </div>
                </div>
            </div>
            {pop===1?<ProfileEditPop setPop={setPop} userInfo={userInfo}
                setUserInfo={setUserInfo} data={data}/>:''}
            {pop===2?<JobPop setPop={setPop} userInfo={userInfo}
                setUserInfo={setUserInfo} data={data}/>:''}
            <hr/>
            <div className="userHolder">
                <div className="userDataHolder">
                    <div className="userData">
                        <span>نام و نام خانوادگی *</span>
                        <strong>{userInfo&&userInfo.userName?userInfo.userName:
                        userInfo.cName?userInfo.cName:''}</strong>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"نام و نام خانوادگی",
                            field:"userName",
                            value:(userInfo&&userInfo.userName)?userInfo.userName:
                            props.user?props.user.cName:''
                        })
                        setPop(1)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                </div>
                <div className="userDataHolder">
                    <div className="userData">
                        <span>شماره تلفن همراه *</span>
                        <strong>{userInfo&&userInfo.mobile?userInfo.mobile:
                            isMobile(userInfo.phone)?userInfo.phone:""}</strong>
                        
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"شماره تلفن همراه",
                            field:"mobile",
                            value:userInfo&&userInfo.mobile?userInfo.mobile:
                            isMobile(userInfo.phone)?userInfo.phone:""
                        })
                        setPop(1)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                </div>
                <div className="userDataHolder">
                    <div className="userData">
                        <span>شهر *</span>
                        <strong>{userInfo&&userInfo.birthDate}</strong>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"شهر",
                            field:"birthDate",
                            value:userInfo&&userInfo.birthDate
                        })
                        setPop(1)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                </div>
                <div className="userDataHolder">
                    <div className="userData">
                        <span>آدرس اصلی *</span>
                        <strong>{userInfo&&userInfo.meliCode?userInfo.meliCode:
                        props.user?props.user.activity:''}</strong>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({title:"آدرس اصلی",
                        field:"meliCode",
                        value:userInfo&&userInfo.meliCode?userInfo.meliCode:
                            props.user?props.user.activity:''})
                        setPop(1)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                </div>
                {/*<div className="userDataHolder">
                    <div className="userData">
                        <span>تلفن ثابت</span>
                        <strong>{userInfo&&userInfo.email}</strong>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"تلفن ثابت",
                            field:"email",
                            value:userInfo&&userInfo.email
                        })
                        setPop(1)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                    </div>*/}
                
                {/*<div className="userDataHolder">
                    <div className="userData">
                        <span>بازگرداندن پول من</span>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"ثبت شماره حساب",
                            field:"hesab",
                            value:userInfo&&userInfo.hesab
                        })
                        setPop(1)}}>
                        <span>ثبت شماره حساب</span>
                        <i className="icon-size fas fa-plus"></i>
                    </div>
                    </div>*/}
                <div className="userDataHolder">
                    <div className="userData">
                        <span>شغل</span>
                        <strong>{userInfo&&userInfo.job}</strong>
                    </div>
                    <div className="userIcon" onClick={()=>{
                        setData({
                            title:"شغل",
                            field:"job",
                            options:props.jobData,
                            value:userInfo&&userInfo.job
                        })
                        setPop(2)}}>
                        <span>ویرایش</span>
                        <i className="icon-size fas fa-edit"></i>
                    </div>
                </div>
            </div>
            {alertShow.show?<SimpleAlert setAlertShow={setAlertShow}
                 data={
                    {text:"اطلاعات با موفقیت ثبت شد",
                    nocancel:1,
                    title:"تایید"}} />:''}
            <div className="orderContinue" style={{float:"none"}}>
                {(userInfo.mobile||isMobile(userInfo.phone))&&userInfo.meliCode&&
                    userInfo.birthDate&&(userInfo.userName||props.user.cName)?
                    
                    <input type="button" onClick={()=>updateInfo()} className="orderBtn" value="ذخیره اطلاعات" />:
                    <><input type="button" className="disBtn"/>
                    <small className="errorPreview">موارد ستاره دار را پر کنید</small></>
                }
            </div>
        </div>
    )
}
export default ProfileSection6