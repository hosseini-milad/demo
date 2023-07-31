function OrderData(props){
    const orderItem = props.order;
    console.log(orderItem)
    return(
        <table className="orderTable stockTable">
            <tbody>
                <tr className="orderUserTable">
                    <th>مصرف کننده</th>
                    <th>رنگ و میرور</th>
                    <th>وضعیت</th>
                    <th>لنز</th>
                    <th>تاریخ</th>
                </tr>
                {//orderItem&&orderItem.map((order,i)=>(
                    <tr>
                        <td>{orderItem.consumer}</td>
                        <td>{orderItem.colorCode}</td>
                        <td>{orderItem.status}</td>
                        <td>{orderItem.rxLenz}</td>
                        <td>{orderItem.date}</td>
                    </tr>
                //))
            }
                <tr>

                </tr>
            </tbody>
        </table>
    )
}
export default OrderData