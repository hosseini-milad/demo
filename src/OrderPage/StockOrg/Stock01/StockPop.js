import env from '../../../env'
function StockPop(props){
    const data = props.data;
    var showData = '';
    try{showData=data.helps?data.helps.find(item=>item.title.toLowerCase()===props.iDisplay.toLowerCase()):'';}
    catch{}
    return(
        <div className="popHolder" style={{display:props.iDisplay===-1?"none":"block"}}>
            <div className="popText">
                <div className="popHeader">
                    <i className="icon-size fas fa-close" onClick={()=>props.setIDisplay(-1)}></i>
                    <strong>{showData&&showData.title}</strong>
                </div>
                <div className="popImage">
                    <img src={showData&&env.siteApiUrl+showData.imageUrl} alt={showData&&showData.title} />
                </div>
                <p className="popP" dangerouslySetInnerHTML={{__html:showData&&showData.description}}>
                </p>
            </div>
        </div>
    )
}
export default StockPop