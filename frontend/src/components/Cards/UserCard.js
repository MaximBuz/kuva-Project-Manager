import styled from "styled-components";
import UserAvatar from "../Misc/UserAvatar";

const UserCardWrapper = styled.div`
  height: fit-content;
  min-height: 72px;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin: 5px 0px 5px 0px;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #d3d3d3;
  box-sizing: border-box;
  padding: 10px;
  background-color: white;
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

`;

const UserCardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UserCardName = styled.p`
  font-weight: bolder;
  color: #515151;
`;

const UserCardRole = styled.p`
  color: #ff0aba;

`;

function UserCard({ user, onClick}) {
  return (
    <UserCardWrapper onClick={onClick}>
      <UserAvatar
        name={user.name}
        url={user?.photoUrl || null}
        size={50}
      />
      <UserCardTextWrapper>
        <UserCardName>{user.displayName}</UserCardName>
        <UserCardRole>{user.projectRole}</UserCardRole>
      </UserCardTextWrapper>
    </UserCardWrapper>
  );
}

export default UserCard;
