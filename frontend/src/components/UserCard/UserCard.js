import styled from 'styled-components'

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

const UserCardAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10000px;
    background-color: #35307E;
    color: white;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
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

function UserCard(props) {
    return (
        <UserCardWrapper>
            <UserCardAvatar>
                MB
                {/* initials from props */}
            </UserCardAvatar>
            <UserCardTextWrapper>
                <UserCardName>Maxim Buz{/* Name from props */}</UserCardName>
                <UserCardJob>Product Manager{/* Job from props */}</UserCardJob>
            </UserCardTextWrapper>
        </UserCardWrapper>
    )
}

export default UserCard
