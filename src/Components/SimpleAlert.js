import TextField from '@material-ui/core/TextField';

function SimpleAlert(props){
    const alertData = props.data
    //console.log(alertData)
    return(
        <div className="alertHolder">
            <div className='alertPlace'>
                <div className="alertTitle">
                    <h3>{alertData.title}</h3>
                </div>
                <div className="alertText">
                    {alertData.text}
                </div>
                <div className='alertBtn'>
                    <input type="button" className='acceptBtn' value="تایید" onClick={
                        ()=>props.setAlertShow(pState => {
                                return { ...pState, show: false, action:1}
                              })}/>
                    {alertData.nocancel?'':<input type="button" className='cancelBtn' value="انصراف" onClick={
                        ()=>props.setAlertShow(pState => {
                                return { ...pState, show: false, action:0}
                              })}/>}
                </div>
            </div>
        </div>
    )
}
export default SimpleAlert