import env from "../../env";

function MegaMenuProduct(props){
    const menuData = props.data;
    const menu =[]// menuData.menu.filter(item=>item.parent==="62f3d60188c406641bbf030b");
    //console.log(menu)
    return(
        <div className="megaMenu">
            <div className="megaMenuHolder">
                {menu.map((menuItem,i)=>(
                <div className="megaMenuCol" >
                    <img src={env.siteApiUrl+menuItem.imageUrl} alt="RX"/>
                    <span>{menuItem.title}</span>
                    <div className="menuItems">
                        {menuData.menu.filter(item=>item.parent===menuItem._id).map((subItem,i)=>(
                            <small>{subItem.title}</small>
                        ))}

                    </div>
                </div>))}
            </div>
        </div>
    )
}
export default MegaMenuProduct