// Components
import ProjectCard from "../components/Cards/ProjectCard";
import CounterBlob from "../components/Misc/CounterBlob";
import Modal from "../components/Modals/NewProjectModal";

// Handling State
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsInitiate } from "../redux/projects/projects.actions";

// Styling
import { UilPlusCircle } from "@iconscout/react-unicons";
import styled from "styled-components";

// Misc
import moment from "moment";

function ProjectsPage() {
  // Handling archived / unarchived state
  const [archived, setArchived] = useState(false);

  // Handling open and close of new project modal
  const [openModal, setOpenModal] = useState(false);

  // Reading current state from Redux
  const { projects, archivedProjects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.user);

  // If logged in, get projects from firestore
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) return dispatch(getProjectsInitiate(currentUser));
  }, [currentUser, dispatch]);

  // Count Projects
  let projectCount = projects.length;
  useEffect(() => {
    projectCount = projects.length;
  }, [projects]);

  // Count Archived Projects
  let archivedProjectCount = archivedProjects.length;
  useEffect(() => {
    archivedProjectCount = archivedProjects.length;
  }, [archivedProjects]);

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
        {archived ? (
          <>
            <h2>your archived projects</h2>
            <CounterBlob count={archivedProjectCount || 0} />
          </>
        ) : (
          <>
            <h2>your active projects</h2>
            <CounterBlob count={projectCount || 0} />
          </>
        )}
      </ProjectCounter>
      <SwitchWrapper>
        Active
        <Switch class="switch" onClick={() => setArchived(!archived)}>
          <input type="checkbox" checked={archived} />
          <Slider></Slider>
        </Switch>
        Archived
      </SwitchWrapper>
      <ProjectsWrapper>
        {archived
          ? archivedProjects &&
            archivedProjects.map((item, index) => {
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
            })
          : projects &&
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
        {!archived && (
          <CreateNewCard
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            <UilPlusCircle className="add-icon" size="50" color="#51515170" />
          </CreateNewCard>
        )}
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

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: -30px;
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

const Slider = styled.span``;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  ${Slider} {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    :before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 3px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }

  input:checked + ${Slider} {
    background-color: #2196f3;
  }

  input:focus + ${Slider} {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + ${Slider}:before {
    transform: translateX(13px);
  }

  ${Slider} {
    border-radius: 34px;
  }

  ${Slider}:before {
    border-radius: 50%;
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
