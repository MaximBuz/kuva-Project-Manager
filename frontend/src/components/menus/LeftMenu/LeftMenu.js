import MenuItem from './MenuItem';
import styled from 'styled-components';

const LeftMenuWrapper = styled.div`
 position: absolute;
 margin: 35px;
 padding-top: 80px;
 display: flex;
 flex-direction: column;
 justify-content: start;
 gap: 30px;
 z-index: 100;
`;

function LeftMenu(props) {
 return (
  <LeftMenuWrapper>
   {props.items &&
    props.items.map((item, index) => {
     if (item.link === '/') {
      return <MenuItem key={index} icon={item.icon} text={item.text} url={item.link} active={item.active} />;
     } else {
      let newLink = item.link.replace(/{CHANGETHIS}/i, props.projectId);
      return <MenuItem key={index} icon={item.icon} text={item.text} url={newLink} active={item.active} />;
     }
    })}

  </LeftMenuWrapper>
 );
}

export default LeftMenu;
