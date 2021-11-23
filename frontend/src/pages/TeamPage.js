import styled from "styled-components";
import UserCard from "../components/Cards/UserCard";
import CounterBlob from "../components/Misc/CounterBlob";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMembersInitiate} from "../redux/team/team.actions";
import { useParams } from "react-router-dom";
import { localeData } from "moment";

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
`

function TeamPage(props) {

  const { identifier } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getMembersInitiate(identifier));
  }, []);

  const { members } = useSelector((state) => state.team);

  let memberCount = members.length;
  
  return (
    <div>
      <FilterSection>
        <p>
          Search For Team Members: {" "}
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
        {members.map((member) => {
          return <UserCard user={member}></UserCard>
        })}
      </UserList>              
      
    </div>
  );
}

export default TeamPage;
