import styled from 'styled-components';
import UserCardAvatar from "../UserCard/UserAvatar"

const UserCardWrapper = styled.div`
    height: fit-content;
    width: 100%;
    min-width: 200px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin: 5px 0px 5px 0px;
    border-style: solid;
    border-radius: 10px;
    border-width: 1px;
    border-color: #D3D3D3;
    box-sizing: border-box;
    padding: 10px;
`

const UserCardTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const UserCardName = styled.p`
    font-weight: bolder;
    color: #515151;
`

const UserCardJob = styled.p`
    color: #FF0ABA;
`

function UserCard({taskAuthor}) {
    return (
        <UserCardWrapper>
            <UserCardAvatar name={taskAuthor?.name || null} url={taskAuthor?.photoUrl || null}/>
            <UserCardTextWrapper>
                <UserCardName>{taskAuthor?.name || null}</UserCardName>
                <UserCardJob>{taskAuthor?.jobTitle || null}</UserCardJob>
            </UserCardTextWrapper>
        </UserCardWrapper>
    )
}

export default UserCard
