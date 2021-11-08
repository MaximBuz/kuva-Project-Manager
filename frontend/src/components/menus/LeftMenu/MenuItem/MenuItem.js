import "./MenuItem.css";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MenuItem(props) {


    return (
        <Link to={props.url}>
            <div className="menu-item">
                <div className="icon-wrapper">{props.icon}</div>
                <div className="menu-text-wrapper">{props.text}</div>
            </div>
        </Link>
        
    )
}

export default MenuItem
