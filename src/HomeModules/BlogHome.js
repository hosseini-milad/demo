import env from "../env";

function BlogHome(props){
    const posts = props.posts;
    return(
        <div className="blogHolder">
            <div className="blogLarge">
                <img src={env.siteApiUrl+posts[0].imageUrl} alt="blog" />
                <div className="blogLargeText">
                        <h3>{posts[0].title}</h3>
                        <p dangerouslySetInnerHTML={{__html:posts[0].description}}></p>
                    </div>
            </div>
            <div className="blogList">
                {posts.map((post,i)=>(
                    i>0&&
                    <div key={i}><div className="blogItem">
                        <img className="blogImg" src={env.siteApiUrl+post.imageUrl} alt="blog2" />
                        <div className="blogText">
                            <strong>{post.title}</strong>
                            <p dangerouslySetInnerHTML={{__html:post.description}}></p>
                        </div>
                    </div>
                    {i<3&&<hr/>}</div>
                ))}
            </div>
        </div>
    )
}
export default BlogHome