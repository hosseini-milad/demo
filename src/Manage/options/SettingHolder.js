import { useState } from "react"
import BlogHolder from "./BlogHolder"
import CategoryHolder from "./CategoryHolder"
import ColorHolder from "./ColorHolder"
import MirrorHolder from "./MirrorHolder"
import ProductHolder from "./ProductHolder"
import SliderHolder from "./sliderHolder"
import PagesHolder from "./StaticHolder"
import XtraHolder from "./XtraHolder"
import StockServiceHolder from "./StockServices"
import CoverHolder from "./CoverHolder"

function SettingHolder(){
    const [tabIndex,setTabIndex] = useState(0)
    return(
        <div className="settingHolder">
            <div className="settingTabHolder">
                <div className={tabIndex===0?"settingTab settingTabActive":"settingTab"}
                     onClick={()=>setTabIndex(0)}>
                    color
                </div>
                <div className={tabIndex===1?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(1)}>
                    mirror
                </div>
                <div className={tabIndex===11?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(11)}>
                    cover
                </div>
                <div className={tabIndex===10?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(10)}>
                    خدمات
                </div>
                <div className={tabIndex===2?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(2)}>
                    اسلایدرها
                </div>
                <div className={tabIndex===3?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(3)}>
                    صفحات
                </div>
                <div className={tabIndex===4?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(4)}>
                    بلاگ
                </div>
                <hr/>
                <div className={tabIndex===5?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(5)}>
                    دسته بندی محصولات
                </div>
                <div className={tabIndex===6?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(6)}>
                    لیست محصولات
                </div>
                <hr/>
                <div className={tabIndex===7?"settingTab settingTabActive":"settingTab"} 
                    onClick={()=>setTabIndex(7)}>
                    خدمات استوک
                </div>
            </div>
            <div className="settingTabPlace">
                {tabIndex===0?<ColorHolder />:''}
                {tabIndex===1?<MirrorHolder />:''}
                {tabIndex===2?<SliderHolder />:''}
                {tabIndex===3?<PagesHolder />:''}
                {tabIndex===4?<BlogHolder />:''}
                {tabIndex===5?<CategoryHolder />:''}
                {tabIndex===6?<ProductHolder />:''}
                {tabIndex===7?<StockServiceHolder />:''}
                
                {tabIndex===10?<XtraHolder />:''}
                {tabIndex===11?<CoverHolder />:''}
            </div>
        </div>
    )
}
export default SettingHolder