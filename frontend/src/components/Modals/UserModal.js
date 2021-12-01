import ReactDom from "react-dom";
import UserAvatar from "../Misc/UserAvatar";

import styled from "styled-components";

export default function UserModal({ closeModal, user }) {
  /* const dispatch = useDispatch();
  const deleteTask = async () => {
    closeModal();
    await dispatch(deleteTaskInitiate(task.id));
    window.location.reload(true);
  }; */

  return ReactDom.createPortal(
    <>
      <GreyBackground onClick={() => closeModal()}>
        <ModalWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Header>
            <HeaderPills>
              <DeleteButton /* onClick={deleteTask} */>
                <p>Remove from Team</p>
              </DeleteButton>
            </HeaderPills>
            <CloseButton onClick={() => closeModal()} viewBox="0 0 17 19">
              <path d="M1 1L16 18M16 1L1 18" stroke="black" />
            </CloseButton>
          </Header>
          <Content>
            <UserAvatar
              name={user.name}
              url={user?.photoUrl || null}
              size={150}
            />
            <UserName>{user.displayName}</UserName>
            <Attribute>Title: {user.jobTitle}</Attribute>
            <Attribute>Email: {user.email}</Attribute>
            <Attribute>Role on Project: {user.projectRole}</Attribute>
          </Content>
        </ModalWrapper>
      </GreyBackground>
    </>,
    document.getElementById("portal")
  );
}

/* Styled Components */

const GreyBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
`;

const ModalWrapper = styled.div`
  width: 70%;
  max-width: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 100000;
  border-radius: 25px;
  -webkit-box-shadow: 0px 5px 50px 10px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 5px 50px 10px rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderPills = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const DeleteButton = styled.div`
  background-color: #e96262;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
  cursor: pointer;
`;

const CloseButton = styled.svg.attrs({
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
})`
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const UserName = styled.div`
  
`

const Attribute = styled.div`

`