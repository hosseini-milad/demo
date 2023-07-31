import env from "../env"

function CatBanner(props){
    const banner = props.banner;
    return(
        <div className="catBanner">
            <img src={env.siteApiUrl+banner.imageUrl} alt="catBanner"/>
            <div className="catBannerText">
                <img src={env.siteApiUrl+banner.brandData[0].imageUrl} />
                <h3 dangerouslySetInnerHTML={{__html:banner.slogon}} ></h3>
            </div>
        </div>
    )
}
export default CatBanner