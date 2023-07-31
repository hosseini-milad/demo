function CancelHeader(props){
    const orderData = props.orderData;
    console.log(orderData.status)
    return(
        <>
        {<div className='rxButton'>
                <button onClick={()=>props.setAlertShow(pState => {
                        return { ...pState, show: true,title:"تایید لغو",text:"آیا از تایید لغو و حذف سفارش اطمینان دارید؟" ,
                        part:"",status:orderData.status.replace('factory','accept|factory'),reason:""}
                        })} className='editOrderButton acceptBtn'>تایید لغو</button>
                {/*<button onClick={()=>props.setAlertShow(pState => {
                        return { ...pState, show: true,title:"",text:"دلیل لغو سفارش را ذکر کنید:",
                            part:"کارخانه",status:"cancel",reason:"دلیل لغو" }
                        })} className='cancelBtnHolder cancelBtn'>لغو</button>*/}
                </div>}</>
    )
}
export default CancelHeader