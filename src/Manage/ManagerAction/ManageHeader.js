function ManageHeader(props){
    const orderData = props.orderData;
    return(
        <>
        {orderData.status==="inprogress"?<div className='rxButton'>
                <button onClick={()=>props.setAlertShow(pState => {
                        return { ...pState, show: true,title:"تایید سفارش",text:"آیا از تایید سفارش و تایید موجودی اطمینان دارید؟" ,
                        part:"",status:"accept",reason:""}
                        })} className='editOrderButton acceptBtn'>تایید</button>
                <button onClick={()=>props.setAlertShow(pState => {
                        return { ...pState, show: true,title:"لغو سفارش",text:"دلیل لغو سفارش را ذکر کنید:",
                            part:"کارخانه",status:"cancel",reason:"دلیل لغو" }
                        })} className='cancelBtnHolder cancelBtn'>لغو</button>
                </div>:''}</>
    )
}
export default ManageHeader