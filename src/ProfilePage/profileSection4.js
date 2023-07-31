import { useState } from "react"
import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import env from "../env";
import states from "../state";
import cities from "../city";

function ProfileSection4(props){
    const userAddress = props.addressData;
    const [newAdd,setNewAdd] = useState(0);
    const [newData,setData] = useState({});
    const [error,setError] = useState()
    const [cityList,setCityList] = useState([])
    const [citySelect,setCitySelect]= useState('');
    const [state,StateSelect] = useState('');
    
    const StateChange=(state_id)=>{
        const tempCity = cities.filter(city=>city.province_id==state_id);
        setCityList(tempCity)
        setCitySelect({})
    }

    //console.log(newData)
    const updateNewAdd = (state,e)=>{
        //console.log(state,e)
        var updateQuery=newData;
        updateQuery[state] = e
        setData(previousState => {
            return { ...previousState, updateQuery }
         })
    }
    const createNewAddress=(e)=>{
        const token = JSON.parse(localStorage.getItem('token-lenz'))
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json',
            'x-access-token':token.token,"userId":token.userId},
            body:JSON.stringify(
            {
                phone:token.mobile,
                userId:token.userId,
                addressUserName: newData.addressUserName,
                address:newData.address,
                state: newData.state,
                city: newData.city,
                addressPhone:newData.addressPhone,
                postalCode:newData.postalCode,
                location:newData.location,
            }
            )
        }
        //console.log(postOptions)
          fetch(env.siteApi+"/auth/userAddress/set",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setError("آدرس ثبت شد");
                setTimeout(()=>window.location.reload(),2000);
              },
              (error) => {
                console.log(error);
                
              }
            )
            .catch(error => {
                console.log(error)
            })
    }
    //console.log(newData)
    return(
        <div className="favHolder">
            <h2 className="profileTitle">آدرس ها</h2>
            <small className="more">{"مشاهده همه ->"}</small>
            <hr/>
            <input type="button" className="orderBtn profileAddress" value="ثبت آدرس جدید +" 
                onClick={()=>setNewAdd(1)}/>
            <div className="addressHolder" style={{display:newAdd?"block":"none"}}>
                <div className="addressItem">
                    <div className="addressTop">
                    <div className="addressDetail">
                        
                        <div className="addressIconDataHolder">
                            <div className="addressIcon">
                                <i className="icon-size fas fa-map-o"></i>
                                <Autocomplete
                                    options={states||[]}
                                    value={state||null}
                                    getOptionLabel={item=>item.name}
                                    onChange={(e,value)=>{StateChange(value.id);
                                        updateNewAdd("state",value.name);
                                      }}
                                    style={{ width: 200, marginLeft: "10px"}}
                                    renderInput={(params) =>
                                    <TextField {...params} label="استان" variant="standard" />}
                                />
                                <Autocomplete
                                    value={citySelect|| null}
                                    options={cityList}
                                    getOptionLabel={city=>city.name||""}
                                    onChange={(event, newValue) => {
                                        updateNewAdd("city",newValue.name);
                                      }}
                                    style={{ width: 200}}
                                    renderInput={(params) =>
                                    <TextField {...params} label="شهرستان" variant="standard" />}
                                />
                            </div>
                            <hr/>
                            <TextField variant="outlined"
                            label="آدرس پستی"
                            //value={newData.address}
                            onChange={(e)=>updateNewAdd("address",e.target.value)}
                            style={{width:"100%"}}/>
                            <hr/>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-phone"></i>
                                <TextField variant="outlined"
                                    label="شماره تماس"
                                    //value={newData.addressPhone}
                                    onChange={(e)=>updateNewAdd("addressPhone",e.target.value)}
                                    style={{width:"100%"}}/>
                            </div>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-envelope-o"></i>
                                <TextField variant="outlined"
                                    label="کدپستی"
                                    //value={newData.postalCode}
                                    onChange={(e)=>updateNewAdd("postalCode",e.target.value)}
                                    style={{width:"100%"}}/>
                            </div>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-user-o"></i>
                                <TextField variant="outlined"
                                    label="نام گیرنده"
                                    //value={newData.addressUserName}
                                    onChange={(e)=>updateNewAdd("addressUserName",e.target.value)}
                                    style={{width:"100%"}}/>
                            </div>
                        </div>
                    </div>
                    <div className="addressMap">
                        <img src="/img/map.jpg" alt="map" />
                    </div>
                    </div>
                    <div className="addressBottom">
                        <div className="orderContinue">
                            <input type="button" className="orderBtn" value="ثبت آدرس" onClick={(e)=>createNewAddress(e)}/>
                        </div>
                        <small>{error}</small>
                    </div>
                </div>
            </div>
            <div className="addressHolder">
                {userAddress&&userAddress.map((address,i)=>(
                <div className="addressItem" key={i}>
                    <div className="addressTop">
                    <div className="addressDetail">
                        <h3>{address.address}</h3>
                        <div className="addressIconDataHolder">
                            <div className="addressIcon">
                                <i className="icon-size fas fa-map-o"></i>
                                <span>{address.state + " - "+ address.city}</span>
                            </div>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-phone"></i>
                                <span>{address.addressPhone}</span>
                            </div>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-envelope-o"></i>
                                <span>{address.postalCode}</span>
                            </div>
                            <div className="addressIcon">
                                <i className="icon-size fas fa-user-o"></i>
                                <span>{address.addressUserName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="addressMap">
                        <img src="/img/map.jpg" alt="map" />
                    </div>
                    </div>
                    <div className="addressBottom">
                        <div className="addressIconHolder">
                            <div className="addressIcon">
                                <span>ویرایش آدرس</span>
                                <i className="icon-size fas fa-edit"></i>
                            </div>
                            <div className="addressIcon">
                                <span>حذف آدرس</span>
                                <i className="icon-size fas fa-remove"></i>
                            </div>
                        </div>

                    </div>
                </div>))}
            </div>
        </div>
    )
}
export default ProfileSection4