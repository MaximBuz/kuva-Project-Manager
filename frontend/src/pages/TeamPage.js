import styled from "styled-components";
import UserCard from "../components/Cards/UserCard";
import CounterBlob from "../components/Misc/CounterBlob";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembersInitiate } from "../redux/projects/projects.actions";
import { useParams } from "react-router-dom";
import { UilPlusCircle } from "@iconscout/react-unicons";
import NewModal from "../components/Modals/NewTeamMemberModal";
import UserModal from "../components/Modals/UserModal";

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 20px;
`;

const SearchField = styled.input`
  border-radius: 1000px;
  width: 200px;
  border-style: solid;
  border-color: rgb(221, 221, 221);
  border-width: thin;
  padding: 6px 15px 6px 15px;
  font-size: large;
  color: grey;
`;

const MemberCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  h2 {
    text-transform: uppercase;
    color: #35307e;
    font-size: larger;
    font-weight: 500;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 20px 20px 0px;
  gap: 10px;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: fit-content;
  min-height: 72px;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  box-sizing: border-box;
  padding: 10px;

  margin: 5px 0px 5px 0px;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #d3d3d3;

  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: #35307e;
    transform: scale(1.05);
    > * {
      fill: white;
    }
  }
`;

function TeamPage(props) {
  // Get project id from url
  const { identifier } = useParams();

  // Get collaborators in that project from firestore
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMembersInitiate(identifier));
  }, []);
  const { members } = useSelector((state) => state.projects);

  // Handling opening and closing of modals
  const [openUserModal, setOpenUserModal] = useState("");
  const [openNewModal, setOpenNewModal] = useState(false);

  // Counting team members
  let memberCount = members?.length;

  return (
    <div>
      <FilterSection>
        <p>
          Search For Team Members:{" "}
          <span>
            <SearchField type="text"></SearchField>
          </span>
        </p>
        {/* <div className="filter-checkbox">
                    </div> */}
      </FilterSection>
      <MemberCounter>
        <h2>Your Team-Members</h2>
        {memberCount && <CounterBlob count={memberCount} />}
      </MemberCounter>
      <UserList>
        {members?.map((member) => {
          return (
            <UserCard
              onClick={() => {
                setOpenUserModal(member);
              }}
              user={member}
            ></UserCard>
          );
        })}
        <AddButton
          onClick={() => {
            setOpenNewModal(!openNewModal);
          }}
        >
          <UilPlusCircle className="add-icon" size="50" color="#51515170" />
        </AddButton>
      </UserList>

      {openNewModal && (
        <NewModal closeModal={setOpenNewModal} projectId={identifier} />
      )}
      {openUserModal && (
        <UserModal closeModal={setOpenUserModal} user={openUserModal} />
      )}
    </div>
  );
}

export default TeamPage;
