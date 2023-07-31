import { useState } from "react"
import CustomerHolder from "./Customer"
import ExportExcel from "./ExportExcel"
import HesabFaRXHolder from "./HesabFaRX"
import SepidarStockHolder from "./SepidarStock"

function HesabFaHolder(){
    
        const [tabIndex,setTabIndex] = useState(0)
    return(
        <div className="settingHolder">
            <div className="settingTabHolder">
                <div className={tabIndex===0?"settingTab settingTabActive":"settingTab"}
                     onClick={()=>setTabIndex(0)}>
                    اطلاعات دسترسی
                </div>
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
                    بروزرسانی کاربران
                </div>
                <div className={tabIndex===5?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(5)}>
                    اعلامیه قیمت
                </div>
                <hr/>
            </div>
            <div className="settingTabPlace">
                {tabIndex===0?<div />:''}
                {tabIndex===1?<SepidarStockHolder />:''}
                {tabIndex===2?<HesabFaRXHolder />:''}
                {tabIndex===3?<div />:''}
                {tabIndex===4?<CustomerHolder/>:''}
                {tabIndex===5?<ExportExcel/>:''}
            </div>
        </div>
    )
}
export default HesabFaHolder