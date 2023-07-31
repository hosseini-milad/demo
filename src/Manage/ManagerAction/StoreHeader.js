function StoreHeader(props){
    const orderData = props.orderData;
    return(
        <>
        {orderData.status==="delivered"?
            <button onClick={()=>props.setAlertShow(pState => {
                return { ...pState, show: true,title:"ارسال به فروشگاه ",text:"" ,
                part:"",status:"storeSent",reason:""}
                })} 
            className='editOrderButton acceptBtn'>ارسال به فروشگاه </button>:''}
            
            </>
    )
}
export default StoreHeader