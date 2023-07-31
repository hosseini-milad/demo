import { useEffect, useState } from "react"
import BreadCrumb from "../Components/BreadCrumb"
import Login from "../pages/Login"
import ManageCustomers from "./ManageCustomers"
import ManageManufacture from "./ManageManufacture"
import ManageMessages from "./ManageMessages"
import ManageOffers from "./ManageOff"
import ManagePrice from "./ManagePrice"
import ManageReport from "./ManageReport"
import ManageSection1 from "./ManageSection1"
import ManageTab from "./manageTab"
import SettingHolder from "./options/SettingHolder"
import env from '../env'
import SepidarHolder from "./sepidar/SepidarHolder"
import ProfileSection6 from "../ProfilePage/profileSection6"
import SimpleAuth from "../Components/simpleAuth"
import HesabFaHolder from "./hesabfa/hesabFaHolder"
const token = JSON.parse(localStorage.getItem('token-lenz'))

function ManagerHolder(){
    
    const [tabIndex,setTabIndex] = useState(0);
    const [logs,setLogs] = useState('')
    const userData= SimpleAuth(env.siteApi+"/auth/userInfo")
    //console.log(tabIndex)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({status:"unread",kind:token&&token.access})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/setting/log",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setLogs(result)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    return(<>
       {token?
       (token.access&&token.access!=="customer")?<main className="pagesMain">
            <BreadCrumb />
            <ManageTab index={tabIndex} setTabIndex={setTabIndex} logs={logs&&logs.log}/>
            {tabIndex===1&&<ManageSection1 />}
            {tabIndex===2&&<ManagePrice />}
            {tabIndex===3&&<ManageManufacture />}
            {tabIndex===4&&<ManageReport />}
            {tabIndex===5&&<ManageOffers />}
            {tabIndex===6&&<ManageMessages logs={logs}/>}
            {tabIndex===7&&<SettingHolder />}
            {tabIndex===8&&<HesabFaHolder />/*<SepidarHolder />*/}
            {(tabIndex===10&&userData)&&<ProfileSection6 jobData={userData.jobData}
            user={userData.user} userData={userData.userInfo}/>}
        </main>:<main style={{textAlign:"center",height:"100px",paddingTop:"250px"}}>شما دسترسی به این بخش ندارید</main>:
        <main><Login /></main>}
    </>
    )
}
export default ManagerHolder