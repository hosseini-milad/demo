function MegaMenuOrder(){
    return(
        <div className="megaMenu">
            <div className="megaMenuHolder">
                <a className="megaMenuCol" href="/order/stock">
                    <img src="/img/lenz02.jpg" alt="RX"/>
                    <span>عدسی های آماده (Stock)</span>
                </a>
                <a className="megaMenuCol" href="/order/rx">
                    <img src="/img/lenz01.jpg" alt="RX"/>
                    <span>عدسی های سفارشی (RX)</span>
                </a>
            </div>
        </div>
    )
}
export default MegaMenuOrder