import SimpleFetch from "../Components/simpleFetch";
import env from "../env";
import BlogHome from "../HomeModules/BlogHome";

function Blog(){
    const postsRaw = SimpleFetch(env.siteApi+"/bloglist");
    //console.log(postsRaw)
    var posts='';
    var fPost = '';
    if(postsRaw&&!fPost){
        posts = postsRaw.posts;
        fPost = Object.values(posts).shift();
        console.log(posts)
    }
        //console.log(posts)
    return(
        <main className="pagesMain">
            {posts&&<div className="contactBanner blogBanner">
                <div className="bannerImg">
                    <img src={env.siteApiUrl+fPost.imageUrl} alt="about us" />
                </div>
                <div className="bannerText">
                    <img src="/logo.png" alt="logo" />
                    <h2>{fPost.title}</h2>
                    <p style={{fontSize: "13px"}} dangerouslySetInnerHTML={{__html:fPost.description}}></p>
                    <div className="breadCrumbContact">
                        <a href="" >خانه / </a>
                        <span>درباره ما</span>
                    </div>
                </div>
            </div>}
            
            <div className="aboutText"><p>
            </p></div>
    {posts&&<BlogHome posts={postsRaw.posts} />}
        </main>
    )
}
export default Blog