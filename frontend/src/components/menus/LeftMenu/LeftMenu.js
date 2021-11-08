import "./LeftMenu.css"
import MenuItem from "./MenuItem/MenuItem";
 

function LeftMenu(props) {
    return (
        <div className="menu-left-wrapper">
            {props.items && props.items.map((item, index) => {
                if(item.link === "/"){
                    return (
                    <MenuItem 
                        key={index} 
                        icon={item.icon} 
                        text={item.text} 
                        url={item.link} 
                    />)
                } else {
                    let newLink = item.link.replace(/{CHANGETHIS}/i, props.projectId)
                    return (
                        <MenuItem 
                            key={index} 
                            icon={item.icon} 
                            text={item.text} 
                            url={newLink} 
                        />)
                }
                
                })}
        </div>
    )
}

export default LeftMenu
