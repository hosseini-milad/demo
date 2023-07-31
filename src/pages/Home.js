import Collection from "../HomeModules/Collection"
import HomeCatSlider from "../HomeModules/HomeCatSlider"
import SalesHome from "../HomeModules/Sales"
import Slider from "../HomeModules/Slider"
import Services from '../HomeModules/Services'
import SimpleFetch from '../Components/simpleFetch'
import env from "../env"
import BlogHome from "../HomeModules/BlogHome"

function Home(){
    const mainPage = SimpleFetch(env.siteApi+"/home");

    return(
        <main>
        <Slider mainSlider = {mainPage.slider}/>
        {mainPage&&mainPage.brandSlider.length&&<HomeCatSlider brandSlider = {mainPage.brandSlider}/>}
        <Collection />
        <div className="titles">
            <h2>پرفروش ترین محصولات</h2>
        </div>
        <SalesHome />
        {mainPage&&<Services services = {mainPage.services}/>}
        <div className="titles">
            <h2>مجله MGM</h2>
        </div>
        {mainPage&&mainPage.posts.length&&<BlogHome posts={mainPage.posts}/>}
        </main>
    )
}
export default Home