import env from '../env'
import Footer from './Footer'
import Header from './Header'
import SimpleFetch from './simpleFetch'
//const token = JSON.parse(localStorage.getItem('token-lenz'))

function Layout(props){
    const layout = SimpleFetch(env.siteApi+"/layout");
    const url = document.location.pathname.split('/')[1];
    //const access = token&&token.access==="factory"
    return(
        <>
            {!url.includes("print")&&<Header data={layout}/>}
            {props.children}
            {!url.includes("print")&&<Footer data={layout}/>}
        </>
    )
}
export default Layout