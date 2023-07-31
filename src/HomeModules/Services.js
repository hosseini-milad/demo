
function Services(props){
    const service = props.services;
    return(
        <div className="servicesHolder">
            <img className="serviceImg" src="/img/services.webp" alt="services" />
            <div className="serviceTextHolder">
                <h2>ویژگی و خدمات</h2>
                <div className="serviceText">
                    {service.map((serviceItem,i)=>(
                        <div className="serviceItem" key={i}>
                            <i className={"icon-size fas serviceIcon "+serviceItem.icon}></i>
                            <span>{serviceItem.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Services