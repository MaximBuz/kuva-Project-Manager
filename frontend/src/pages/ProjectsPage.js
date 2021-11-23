import ProjectCard from "../components/Cards/ProjectCard";
import CounterBlob from "../components/Misc/CounterBlob";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modals/NewProjectModal";
import { getProjectsInitiate } from "../redux/projects/projects.actions";
import moment from "moment";
import { UilPlusCircle } from "@iconscout/react-unicons";

import styled from "styled-components";

function ProjectsPage() {

  const [openModal, setOpenModal] = useState(false);

  const { projects } = useSelector((state) => state.projects);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) return dispatch(getProjectsInitiate(currentUser));
  }, [currentUser, dispatch]);

  let projectCount = projects?.length;
  useEffect(() => {
    projectCount = projects?.length;
  }, [projects]);

  return (
    <Wrapper>
      <WelcomeWrapper>
        <h1 className="greeting">
          Hello {currentUser && currentUser.displayName.split(" ")[0]}
        </h1>
        <p className="sub-greeting">
          An overview over all of your projects. Click on them to view related
          tasks, or create a new project.
        </p>
      </WelcomeWrapper>
      <ProjectCounter>
        <h2>your projects</h2>
        {projectCount && <CounterBlob count={projectCount} />}
      </ProjectCounter>
      <ProjectsWrapper>
        {projects &&
          projects.map((item, index) => {
            return (
              <ProjectCard
                index={index}
                id={item.id}
                projectKey={item.projectKey}
                projectTitle={item.projectTitle}
                timeStamp={moment(new Date(item.timeStamp.seconds * 1000))
                  .fromNow()
                  .toString()}
                projectSummary={item.projectSummary}
              />
            );
          })}
        <CreateNewCard
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <UilPlusCircle className="add-icon" size="50" color="#51515170" />
        </CreateNewCard>
      </ProjectsWrapper>

      {openModal && <Modal closeModal={setOpenModal} />}
    </Wrapper>
  );
}

export default ProjectsPage;


/* Styled Components */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1  {
    font-size: xx-large;
    font-weight: bolder;
    color: #35307e;
  }
`;

const ProjectCounter = styled.div`
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

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const CreateNewCard = styled.div`
  background-color: rgba(255, 255, 255, 0);
  border-radius: 25px;
  -webkit-box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
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