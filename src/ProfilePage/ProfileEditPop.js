import { TextField } from "@material-ui/core"
import { isMobile } from "../env";
function ProfileEditPop(props){
    const data = props.data;
    //console.log(data) 
    const setParam=(e)=>{
        if(data.field === "mobile"&&!/^\d+$/.test(e))return;
        if(data.field === "email"&&!/^\d+$/.test(e))return;
        var updateQuery=props.userInfo;
        updateQuery[data.field] = e
        props.setUserInfo(previousState => {
           return { ...previousState, ...updateQuery }
        });
    }
    return(
        <div className="popHolder">
            <div className="popText">
                <div className="popHeader">
                    <i className="icon-size fas fa-close" onClick={()=>props.setPop(0)}></i>
                    <strong>اطلاعات حساب کاربری</strong>
                </div>
                <p className="popP"> اطلاعات شناسایی وارد نمایید 
                </p>
                <div className="popSection">
                <TextField variant="standard"
                    label={data.title}
                    value={ data.field === "userName"?
                        (props.userInfo.userName?props.userInfo.userName:props.userInfo.cName):
                            data.field === "meliCode"?props.userInfo.meliCode:
                            data.field === "email"?props.userInfo.email:
                            data.field === "mobile"?
                        (props.userInfo.mobile?props.userInfo.mobile:isMobile(props.userInfo.phone)?props.userInfo.phone:''):
                            data.field === "birthDate"?props.userInfo.birthDate:
                            data.field === "hesab"?props.userInfo.hesab:
                            ''}
                    onChange={(e)=>setParam(e.target.value)}
                    style={{width:"100%"}}/>
                    
                </div>
                <input onClick={()=>props.setPop(0)} type="button" className="popBtn" value="تایید"/>
            </div>
        </div>
    )
}
export default ProfileEditPop