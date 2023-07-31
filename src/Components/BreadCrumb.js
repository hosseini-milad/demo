function BreadCrumb(props){
    const address=props.data
    return(<>
        {address?<div className="breadCrumb">
            {address.map((bread,i)=>(
                <a href={bread.link} key={i}> {bread.label} </a>
            ))}
            
        </div>:<div className="breadCrumb"></div>}</>
    )
}
export default BreadCrumb