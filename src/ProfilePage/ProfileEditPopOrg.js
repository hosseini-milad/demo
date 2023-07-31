import { TextField } from "@material-ui/core"
function ProfileEditPop(props){
    const data = props.data;
    console.log(data) 
    return(
        <div className="popHolder">
            <div className="popText">
                <div className="popHeader">
                    <i className="icon-size fas fa-close" onClick={()=>props.setPop(0)}></i>
                    <strong>اطلاعات حساب کاربری</strong>
                </div>
                <p className="popP"> اطلاعات شناسایی وارد نمایید  اطلاعات شناسایی وارد نمایید
                    اطلاعات شناسایی وارد نمایید اطلاعات شناسایی وارد نمایید
                </p>
                <div className="popSection">
                <TextField variant="standard"
                    label="نام و نام خانوادگی"
                    style={{width:"100%"}}/>
                    <TextField variant="standard"
                    label="کدملی"
                    style={{width:"100%"}}/>
                </div>
                <input onClick={()=>props.setPop(0)} type="button" className="popBtn" value="بازگشت"/>
            </div>
        </div>
    )
}
export default ProfileEditPop