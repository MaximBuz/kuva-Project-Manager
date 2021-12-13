import { Link } from "react-router-dom";

import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  gap: 15px;
  transition: background-color 0.05s;
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const KeyPill = styled.div`
  background-color: #35307e;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 23px;
  font-weight: 500;
  color: #35307e;
  transition: 0.15s;
`;

const TimeStamp = styled.p`
  font-size: small;
  font-weight: 400;
  color: #ff0aba;
  transition: 0.15s;
`;

const Summary = styled.p`
  color: #515151;
  transition: 0.15s;
  flex-grow: 1;
`;

/* const UrgentPill = styled.div`
    background-color: #FCDDEC;
    color: #FF0ABA;
    border-radius: 6px;
    padding: 10px 15px 10px 15px;
    margin: 0px;
    width:fit-content;
    height: fit-content;
    font-size: medium;
    font-weight: 400;
    font-size: smaller;
    transition: 0.15s;
    margin-top: auto;
` */

function ProjectCard(props) {
  const id = props.id;
  const projectKey = props.projectKey;
  const projectTitle = props.projectTitle;
  const timeStamp = props.timeStamp;
  const projectSummary = props.projectSummary;
  // const countUrgent = props.countUrgent;

  return (
    <Link to={"/project/" + id + "/"}>
      <Card id={"project-card-" + parseInt(projectKey)}>
        <TopRow>
          <KeyPill>
            <p>{projectKey}</p>
          </KeyPill>
          <svg
            width="11"
            height="19"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L9.5 9.5L1 18" className="arrow-path" stroke="black" />
          </svg>
        </TopRow>

        <Content>
          <TitleRow>
            <Title>{projectTitle}</Title>
            <TimeStamp>{timeStamp}</TimeStamp>
          </TitleRow>
          <Summary>{projectSummary}</Summary>
        </Content>
        {/* <UrgentPill>
            <p className="count-urgent-content"> {countUrgent.toString()} URGENT</p>
        </UrgentPill> */}
      </Card>
    </Link>
  );
}

export default ProjectCard;
