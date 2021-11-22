import styled from "styled-components";
import UserCardAvatar from "../Misc/UserAvatar";

const UserCardWrapper = styled.div`
  height: fit-content;
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
  cursor: pointer;
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

const UserCardJob = styled.p`
  color: #ff0aba;
`;

function UserCard({ user }) {
  return (
    <UserCardWrapper>
      <UserCardAvatar
        name={user?.name || null}
        url={user?.photoUrl || null}
      />
      <UserCardTextWrapper>
        <UserCardName>{user?.displayName || null}</UserCardName>
        <UserCardJob>{user?.jobTitle || null}</UserCardJob>
      </UserCardTextWrapper>
    </UserCardWrapper>
  );
}

export default UserCard;
