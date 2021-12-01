import styled from "styled-components";

const UserCardAvatar = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 10000px;
  background-color: #35307e;
  color: white;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const UserProfilePicture = styled.img`
  object-fit: contain;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
`;

function UserAvatar({ inComments, name, url, size }) {
  return (
    <UserCardAvatar inComments={inComments} url={url} size={size}>
      {url ? (
        <UserProfilePicture inComments={inComments} src={url} />
      ) : (
        name
          ?.split(" ")
          .map((n) => n[0])
          .join(" ")
      )}
    </UserCardAvatar>
  );
}

export default UserAvatar;
