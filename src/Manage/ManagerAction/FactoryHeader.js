function FactoryHeader(props){
    const orderData = props.orderData;
    return(
        <>
        {orderData.status==="accept"?<div className='rxButton'>
            <button onClick={()=>props.setAlertShow(pState => {
                    return { ...pState, show: true,title:"تایید سفارش",text:"آیا از تایید سفارش اطمینان دارید؟" ,
                    part:"",status:"qc",reason:""}
                    })} className='editOrderButton acceptBtn'>تایید اولیه</button>
            <button onClick={()=>props.setAlertShow(pState => {
                    return { ...pState, show: true,title:"لغو سفارش",text:"دلیل لغو سفارش را ذکر کنید:",
                part:"کارخانه", status:"cancel",reason:"دلیل لغو" }
                    })} className='cancelBtnHolder cancelBtn'>لغو سفارش</button>
            </div>:

        orderData.status==="qc"?<div className='rxButton'>
            <button onClick={()=>props.changeOrderStatus("inproduction")} className='editOrderButton acceptBtn'>ارسال برای تولید</button>
            <button onClick={()=>props.setAlertShow(pState => {
            return { ...pState, show: true,title:"لغو سفارش",text:"دلیل لغو سفارش را ذکر کنید:",
        part:"کارخانه", status:"cancel",reason:"دلیل لغو" }
            })} className='cancelBtnHolder cancelBtn'>لغو سفارش</button>
            </div>:

        orderData.status==="inproduction"?<div className='rxButton'>
            <button onClick={()=>props.changeOrderStatus("faktor")} className='editOrderButton acceptBtn'>تولید شده </button>
            <button onClick={()=>props.setAlertShow(pState => {
            return { ...pState, show: true,title:"لغو سفارش",text:"دلیل لغو سفارش را ذکر کنید:",
        part:"کارخانه", status:"cancel",reason:"دلیل لغو" }
            })} className='cancelBtnHolder cancelBtn'>لغو سفارش</button>

        </div>:
        orderData.status==="faktor"?<button onClick={()=>props.changeOrderStatus("sending")} className='editOrderButton acceptBtn'>ارسال سفارش</button>:''}</>
    )
}
export default FactoryHeader