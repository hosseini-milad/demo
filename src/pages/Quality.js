import {FormControlLabel, Checkbox } from '@material-ui/core';
import SimpleFetch from '../Components/simpleFetch';
import env from '../env';

function Quality(){
    const qualityRaw = SimpleFetch(env.siteApi+"/product/pages")
    return(
        <main className="pagesMain">
            <div className="contactBanner qualityBanner">
                <div className="bannerImg">
                <img src={qualityRaw&&(env.siteApiUrl+qualityRaw.pages.find(item=>item.url==="quality").imageUrl)} alt="Quality Control" />
                </div>
                <div className="bannerText">
                    <img src="/logo.png" alt="logo" />
                    <h1>گارانتی محصولات</h1>
                    <div className="breadCrumbContact">
                        <a href="" >خانه / </a>
                        <span>گارانتی محصولات</span>
                    </div>
                </div>
            </div>
            <div className="aboutText">
            <p dangerouslySetInnerHTML={{__html:qualityRaw&&qualityRaw.pages.find(item=>item.url==="quality").description}}>
                </p></div>
        </main>
    )
}
export default Quality