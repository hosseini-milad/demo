import env from "../../env";

function GuranteeHeader(props){
    const orderData = props.orderData;
    const acceptPrint = () => {
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({orderNo:orderData.stockOrderNo,
                state:"printed"})
          }
          fetch(env.siteApi+"/order/stockGurantee/update",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                window.location.reload()
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
            
    }
    return(
        <>
        <button onClick={()=>{window.open('/print-guarantee/'+orderData.stockOrderNo)}} 
            className='editOrderButton acceptBtn'>چاپ گارانتی</button>
        <button onClick={()=>acceptPrint()} 
            className='editOrderButton acceptBtn'>تایید چاپ</button></>
    )
}
export default GuranteeHeader