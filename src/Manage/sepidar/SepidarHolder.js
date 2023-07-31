import { useState } from "react"
import ExportExcel from "./ExportExcel"
import SepidarRXHolder from "./SepidarRX"
import SepidarStockHolder from "./SepidarStock"

function SepidarHolder(){
    
        const [tabIndex,setTabIndex] = useState(0)
    return(
        <div className="settingHolder">
            <div className="settingTabHolder">
                {/*<div className={tabIndex===0?"settingTab settingTabActive":"settingTab"}
                     onClick={()=>setTabIndex(0)}>
                    اتصال به سرور سپیدار
    </div>*/}
                <div className={tabIndex===1?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(1)}>
                    بروزرسانی استوک
                </div>
                <div className={tabIndex===2?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(2)}>
                    بروزرسانی RX
                </div>
                <div className={tabIndex===3?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(3)}>
                    بروزرسانی موجودی
                </div>
                <div className={tabIndex===4?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(4)}>
                    اعلامیه قیمت
                </div>
                <hr/>
            </div>
            <div className="settingTabPlace">
                {tabIndex===0?<div />:''}
                {tabIndex===1?<SepidarStockHolder />:''}
                {tabIndex===2?<SepidarRXHolder />:''}
                {tabIndex===3?<div />:''}
                {tabIndex===4?<ExportExcel/>:''}
            </div>
        </div>
    )
}
export default SepidarHolder