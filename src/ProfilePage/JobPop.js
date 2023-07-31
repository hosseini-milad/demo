import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
function JobPop(props){
    const data = props.data;
    const setParam=(e)=>{
        var updateQuery=props.userInfo;
        updateQuery[data.field] = e
        props.setUserInfo(previousState => {
           return { ...previousState, updateQuery }
        });
    }
    return(
        <div className="popHolder">
            <div className="popText">
                <div className="popHeader">
                    <i className="icon-size fas fa-close" onClick={()=>props.setPop(0)}></i>
                    <strong>اطلاعات شغلی</strong>
                </div>
                <p className="popP"> اطلاعات شناسایی وارد نمایید
                </p>
                <div className="popSection">
                <Autocomplete
                    options={props.data.options.map(item=>item.title)}
                    //style={{ width: "50%",direction:"rtl"}}
                    //value={frame}
                    defaultValue={props.userInfo.job}
                    onChange={(e,value)=>setParam(value)}
                    renderInput={(params) =>
                    <TextField {...params} label="شغل" variant="outlined" />}
                />
                </div>
                <input onClick={()=>props.setPop(0)} type="button" className="popBtn" value="تایید"/>
            </div>
        </div>
    )
}
export default JobPop