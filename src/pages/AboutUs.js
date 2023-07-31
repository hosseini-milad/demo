import SimpleFetch from '../Components/simpleFetch'
import env from '../env'

function AboutUs(){
    const aboutRaw = SimpleFetch(env.siteApi+"/product/pages")
    return(
        <main className="pagesMain">
            <div className="contactBanner aboutBanner">
                <div className="bannerImg">
                    <img src={aboutRaw&&(env.siteApiUrl+aboutRaw.pages.find(item=>item.url==="about").imageUrl)} alt="about us" />
                </div>
                <div className="bannerText">
                    <img src="/logo.png" alt="logo" />
                    <h1>درباره ما</h1>
                    <div className="breadCrumbContact">
                        <a href="" >خانه / </a>
                        <span>درباره ما</span>
                    </div>
                </div>
            </div>
            
            <div className="aboutText">
                <p dangerouslySetInnerHTML={{__html:aboutRaw&&aboutRaw.pages.find(item=>item.url==="about").description}}>
                </p></div>
        </main>
    )
}
export default AboutUs