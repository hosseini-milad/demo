import TextField from '@material-ui/core/TextField';

function Alert(props){
    const alertData = props.data
    return(
        <div className="alertHolder">
            <div className='alertPlace'>
                <div className="alertTitle">
                    <h3>{alertData.title}</h3>
                </div>
                <div className="alertText">
                    {alertData.text}
                </div>
                {alertData.reason?<TextField label={alertData.reason} variant="outlined" onChange={(e)=>
                    props.setAlertShow(pState => {
                        return { ...pState, reason:e.target.value?e.target.value:'دلیل لغو'}
                      })}
                    style={{marginTop:"30px",width:"100%"}}
                />:<></>}
                <div className='alertBtn'>
                    {(alertData.reason!=="دلیل لغو")?
                    <input type="button" className='acceptBtn' value="تایید" onClick={
                        ()=>props.setAlertShow(pState => {
                                return { ...pState, show: false, action:alertData.action+1}
                              })}/>:<></>}
                    
                    <input type="button" className='cancelBtn' value="انصراف" onClick={
                        ()=>props.setAlertShow(pState => {
                                return { ...pState, show: false}
                              })}/>
                </div>
            </div>
        </div>
    )
}
export default Alert