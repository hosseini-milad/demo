import env from "../env";

function ImagePart(props){
    const product = props.product;
    return(
        <div className="productImagePart">
            <h1>{product.title}</h1>
            <div className="productImageHolder">
                <img src={product.imageUrl?(env.siteApiUrl+product.imageUrl):
                    "/img/glass01.jpg"} alt={product.title} />
                <div className="imgBullet">
                        <div className="bullet">

                        </div>
                        <div className="bullet activeBullet">
                            
                        </div>
                        <div className="bullet">
                            
                        </div>
                    </div>
                    <hr/>
                    <div className="galleryPart">
                        <img src="/img/glass01.jpg" alt=""/>
                        <img src="/img/glass02.jpg" alt=""/>
                        <img src="/img/glass01.jpg" alt=""/>
                    </div>
            </div>
        </div>
    )
}
export default ImagePart