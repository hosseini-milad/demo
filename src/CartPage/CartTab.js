function CartTab(props){
    const tabIndex = props.index;
    const tabsOption=["سبد خرید"," ارسال","پرداخت"]
    return(
        <div className="orderTabHolder">
            <div className="horizonCircle"></div>
            <div className="horizonLine"></div>
            {tabsOption.map((tab,i)=>(
                <div className="orderTab" key={i}>
                    <div className={tabIndex===i?"circleTab circleTabActive":"circleTab"}>
                        <span>{tab}</span>
                    </div>
                </div>
            ))}
              
        </div>
    )
}
export default CartTab