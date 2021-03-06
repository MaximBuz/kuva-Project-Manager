import ReactDom from "react-dom";
import { useState } from "react";

import UserAvatar from "../Misc/UserAvatar";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteMemberInitiate,
  editMemberInitiate,
} from "../../redux/projects/projects.actions";

import styled from "styled-components";

export default function UserModal({ closeModal, user, projectId, members }) {
  // Handle deletion of team member from project
  const dispatch = useDispatch();
  const deleteMember = async () => {
    const newMembers = members.filter((member) => member.id !== user.id);
    const newMemberIds = newMembers.map((member) => member.id);
    closeModal();
    await dispatch(deleteMemberInitiate(projectId, newMembers, newMemberIds, user));
  };

  // The currently logged in user (to send dynamically filled invitiation mails)
  const { currentUser } = useSelector((state) => state.user);

  // Turn on editable field
  const [projectRoleEditMode, setProjectRoleEditMode] = useState(false);
  const editModeOnClick = (e) => {
    setProjectRoleEditMode(true);
  };

  // Handle edits on Project Role Field
  const [projectRoleInput, setProjectRoleInput] = useState(
    user.projectRole || "No role added yet"
  );
  const onProjectRoleChange = (e) => {
    setProjectRoleInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMembers = members.map((member) => {
      if (member.id === user.id) {
        member["projectRole"] = projectRoleInput;
      }
      return member;
    });
    dispatch(editMemberInitiate(projectId, newMembers, currentUser));
    setProjectRoleEditMode(false);
  };

  return ReactDom.createPortal(
    <>
      <GreyBackground onClick={() => closeModal()}>
        <ModalWrapper
          onClick={(e) => {
            /* Closing editable fields on click outside of them */
            projectRoleEditMode &&
              e.target.localName !== "input" &&
              setProjectRoleEditMode(false);
            e.stopPropagation();
          }}
        >
          <Header>
            <HeaderPills>
              {!user.projectRole?.toLowerCase().includes("owner") ? (
                <DeleteButton onClick={deleteMember}>
                  <p>Remove from Team</p>
                </DeleteButton>
              ) : (
                <DeleteButton disabled>
                  <p>Remove from Team</p>
                  <span className="tooltiptext">Cannot delete owners</span>
                </DeleteButton>
              )}
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

            <AttributeName>Title:</AttributeName>
            <AttributeValue>{user.jobTitle}</AttributeValue>

            <AttributeName>Role On Project:</AttributeName>
            {projectRoleEditMode ? (
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <AttributeValueEdit
                  defaultValue={projectRoleInput}
                  onChange={onProjectRoleChange}
                ></AttributeValueEdit>
                <input
                  type="submit"
                  style={{
                    visibility: "hidden",
                    display: "none",
                    width: "0",
                    height: "0",
                  }}
                />
              </form>
            ) : (
              <AttributeValue editable={true} onClick={editModeOnClick}>
                {user.projectRole || "No role added yet"}
              </AttributeValue>
            )}

            <AttributeName>Email:</AttributeName>
            <AttributeValue>{user.email}</AttributeValue>
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
  width: 30%;
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px 30px 60px 30px;
  z-index: 100000;
  border-radius: 25px;
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
  background-color: ${({ disabled }) => (disabled ? "lightgrey" : "#e96262")};
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: relative;

  .tooltiptext {
    visibility: hidden;
    position: absolute;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s;
    width: 120px;
    top: 140%;
    left: 50%;
    margin-left: -60px;

    ::after {
      content: " ";
      position: absolute;
      bottom: 100%; /* At the top of the tooltip */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #555 transparent;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `
    :hover {
      .tooltiptext {
        visibility: visible;
        opacity: 1;
      }
    }
  `};
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
  gap: 25px;
`;

const UserName = styled.div`
  font-weight: bolder;
  font-size: 2em;
  margin-bottom: 25px;
`;

const AttributeName = styled.div`
  font-size: small;
  margin-bottom: -22px;
  color: #ff0aba;
`;

const AttributeValue = styled.div`
  font-size: large;
  padding: 5px;
  :hover {
    outline: ${(props) => {
      if (props.editable) {
        return "solid";
      } else {
        return "none";
      }
    }};
    border-radius: 5px;
    outline-width: 1.5px;
  }
`;

const AttributeValueEdit = styled.input`
  font-size: large;
  padding: 5px;
  border-radius: 5px;
  outline-width: 1.5px;
`;
