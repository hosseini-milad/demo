import { useEffect, useState } from "react";
import CatBanner from "../CategoryPage/CatBanner";
import CategorySideBar from "../CategoryPage/CategorySideBar";
import MainProductList from "../CategoryPage/MainProducts";
import Paging from "../CategoryPage/Paging";
import BreadCrumb from "../Components/BreadCrumb";
import SimpleFetch from "../Components/simpleFetch"
import env from "../env"

function Category(){
    const [filterShow , setFilterShow] = useState(0);
    const [categoryList,setCategoryList] = useState();
    const [product,setProduct]= useState();
    //console.log(product)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
            },
            
        }
        //console.log(postOptions)
        fetch(env.siteApi+"/setting/product",postOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setProduct(result)
                
            },
            (error) => {
                console.log(error);
            }
            )
            .catch((error)=>{
            console.log(error)
            })

        },[])
    return(
        <main className="pagesMain">
            <BreadCrumb data={[
            {link:"/",label:" خانه / "},
            {link:"/category",label:"دسته بندی  "},
            {link:"#",label:""},
            ]}/>
            {categoryList&&categoryList.brandBanner[0]&&
                <CatBanner banner={categoryList.brandBanner[0]}/>}
                <div className="catFilterButton" onClick={()=>setFilterShow((filterShow+1)%2)}>
                    لیست محصولات
                </div>
            <div className="categoryHolder">
                <div className="categorySideBar" style={{display:filterShow?"block":"none"}}>
                    {categoryList&&<CategorySideBar brands={categoryList.brands}/>}
                </div>
                {product?<MainProductList product={product}/>:''}
            </div>
            {/*<Paging />*/}
            <div className="categorySeo">
                <h1>عدسی های طبی اسنس</h1>
                <p>
ترکیبی از طراحی اپتوتک آلمان به همراه تکنولوژی پیشرفته و نوآورانه و ماشین‌آلات به‌روز اشنایدر، دید مناسبی را در تمامی نواحی (دور، میانی، نزدیک) برای شما به ازمغان می‌آورد. این طراحی با تطبیق آسان بین دید نزدیک و دور  با حرکت طبیعی سر و چشم برای هر فعالیتی پیشنهاد می‌شود و در صورت تمایل امکان شخصی‌سازی نیز وجود دارد.ترکیبی از طراحی اپتوتک آلمان به همراه تکنولوژی پیشرفته و نوآورانه و ماشین‌آلات به‌روز اشنایدر، دید مناسبی را در تمامی نواحی (دور، میانی، </p>
            </div>
        </main>
    )
}
export default Category