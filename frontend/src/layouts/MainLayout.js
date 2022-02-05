import LeftMenu from '../components/Menus/LeftMenu/LeftMenu';
import TopMenu from '../components/Menus/TopMenu/TopMenu';

import styled from 'styled-components';

export default function MainLayout(props) {
 const { identifier } = props.match ? props.match.params : '';
 return (
  <div>
   <TopMenu projectId={identifier} />
   <LeftMenu items={props.menuContent} projectId={identifier} />
   <ContentWrapper>{props.children}</ContentWrapper>
   
  </div>
 );
}

const ContentWrapper = styled.div`
 position: fixed;
 overflow-x: scroll;
 overflow-y: scroll;
 top: 60px;
 right: 0;
 left: 100px;
 bottom: 0;
 padding: 50px 0 50px 50px;
 border-top-left-radius: 50px;
 -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
 box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
 background-color: #f8f9ff;
 overflow-x: scroll;

 /* Hide scrollbar for IE, Edge and Firefox */
 -ms-overflow-style: none;
 scrollbar-width: none;

 /* Hide scrollbar for Chrome, Safari and Opera */
 ::-webkit-scrollbar {
  display: none;
 }
`;
