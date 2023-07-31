function AlertNewChanges(props){
    const changes = props.data
    console.log(changes)
    return(
        <div className="alertHolder">
            <div className="alertPlace">
                <div className="alertTitle">
                    <h3>آخرین تغییرات</h3>
                </div>
                {changes&&changes.map((changes,i)=>(
                <ul key={i} className="alertText">
                    <li>{changes.title}</li>
                    <small>{changes.message}</small>
                </ul>
                ))}
                <div className="alertBtn" style={{textAlign: "center"}}>
                    <input type="button" className="acceptBtn" value="تایید"
                    onClick={()=>props.acceptFunction(1)}/>
                </div>
            </div>
        </div>
    )
}
export default AlertNewChanges