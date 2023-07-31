import persianDate from 'persian-date';

function DateShow(props){
    persianDate.toCalendar('persian');
    const pDate = new persianDate(new Date(props.date)).format();
    const date = pDate.split(' ')
    const pWeek = new persianDate(new Date(props.date)).format('dddd');
    return(<>
        <span> {pWeek} 
            <strong style={{direction:"ltr",margin:"auto 10px"}}>
                {date[0].replaceAll('-','/')} 
                <small style={{margin:"auto 10px"}}>{props.second?date[1]:''}</small>
            </strong>
        </span>
        </>
    )
}
export default DateShow