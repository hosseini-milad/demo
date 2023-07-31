
function CategorySideBar(props){
    const brands= props.brands;
    //console.log(brands)
    return(
        <div className="sideBar">
            <h4 style={{textAlign:"center"}}>فیلتر محصولات</h4>
            <hr/>
            <div className="filterPart">
                <div className="orderHeader">
                    <strong>برند</strong>
                    <b className="filterArrow">-</b>
                </div>
                <div className="filterHolder">
                    {brands.map((brand,i)=>(
                        <div className='filterList' key={i}>
                            {brand.title}
                        </div>
                    ))}
                </div>
                <div className="orderHeader">
                    <strong>تایپ</strong>
                    <b className="filterArrow">-</b>
                </div>
                <div className="filterHolder">
                    {brands.map((brand,i)=>(
                        <div className='filterList' key={i}>
                            {brand.title}
                        </div>
                    ))}
                </div>
                <div className="orderHeader">
                    <strong>ضریب شکست</strong>
                    <b className="filterArrow">+</b>
                </div>
                <div className="filterHolder"></div>
                <div className="orderHeader">
                    <strong>دسته بندی ها</strong>
                    <b className="filterArrow">+</b>
                </div>
                <div className="filterHolder"></div>
                <div className="orderHeader">
                    <strong>بازه قیمت</strong>
                    <b className="filterArrow">+</b>
                </div>
                <div className="filterHolder"></div>
            </div>
        </div>
    )
}
export default CategorySideBar