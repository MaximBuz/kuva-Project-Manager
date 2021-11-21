import { Link } from 'react-router-dom';
import styled from "styled-components";

const MenuItemIcon = styled.div`
    svg {
        transition: 0.2s;
        width: 30px;
        height: 30px;
        path {
            fill: ${props => props.active ? "#FF0ABA" : "#929292"};
        }
    }
`

const MenuItemText = styled.div`
    font-size: larger;
    transform: scale(0);
    transform-origin: left;
    transition: 0.3s;

    color: white;
    background-color: #FF0ABA;
    padding: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.15); 
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.15);
`

const MenuItemWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        transform: scale(1);
        ${MenuItemText} {
            transform: scale(1)
        }
        ${MenuItemIcon} {
            svg {
                transform: scale(1.1);
            }

            path {
                fill: #FF0ABA;
            }
        }
    }
`

function MenuItem(props) {

    return (
        <Link to={props.url}>
            <MenuItemWrapper>
                <MenuItemIcon active={props.active}>{props.icon}</MenuItemIcon>
                <MenuItemText>{props.text}</MenuItemText>
            </MenuItemWrapper>
        </Link>        
    )
}

export default MenuItem;
