function StoreHeader(props){
    const orderData = props.orderData;
    return(
        <>
        {(orderData.status==="storeSent"||props.manager==="saleStock")?
            <button onClick={()=>props.setAlertShow(pState => {
                return { ...pState, show: true,title:"تحویل مشتری",text:"" ,
                part:"",status:"completed",reason:""}
                })} 
            className='editOrderButton acceptBtn'>تحویل مشتری</button>:''}</>
    )
}
export default StoreHeader