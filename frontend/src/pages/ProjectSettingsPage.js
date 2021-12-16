// React
import { useParams } from "react-router-dom";

// Components
import ProjectAvatar from "../components/Misc/ProjectAvatar";

// Styling
import styled from "styled-components";

// Routing
import { useHistory } from "react-router-dom";

// State Management
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  editProjectFieldInitiate,
  deleteProjectInitiate,
  archiveProjectInitiate
} from "../redux/projects/projects.actions";

export default function ProjectSettingsPage() {
  // Get Project from identifier in URL
  const { identifier } = useParams();

  // Handle deleting project
  const deleteProject = async () => {
    await dispatch(deleteProjectInitiate(identifier));
    history.push("/");
  };

  // Handle archiving project
  const archiveProject = async () => {
    await dispatch(archiveProjectInitiate(identifier));
    history.push("/");
  };

  // Get the project from state
  const { projects } = useSelector((state) => state.projects);
  const project = projects?.filter((project) => project.id === identifier)[0];

  // Initializing Redux dispatching
  const dispatch = useDispatch();

  // Initializing rerouting (after deletion or archivation of project)
  let history = useHistory();

  /* 
  ----------------------------
  Handling editable fields 
  ----------------------------
  */

  // Handle Title Editing
  const [projectTitleEditMode, setProjectTitleEditMode] = useState(false);
  const editTitleModeOnClick = (e) => {
    setProjectTitleEditMode(true);
  };
  const [projectTitleInput, setProjectTitleInput] = useState(
    project?.projectTitle
  );
  const onProjectTitleChange = (e) => {
    setProjectTitleInput(e.target.value);
  };
  const handleTitleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProjectFieldInitiate(project?.id, "projectTitle", summaryInput)
    );
    setProjectTitleEditMode(false);
  };

  // Handle Summary Editing
  const [summaryEditMode, setSummaryEditMode] = useState(false);
  const editSummaryModeOnClick = (e) => {
    setSummaryEditMode(!summaryEditMode);
  };
  const [summaryInput, setSummaryInput] = useState(
    project?.projectSummary || "No summary added yet"
  );
  const onSummaryChange = (e) => {
    setSummaryInput(e.target.value);
  };
  const handleSummarySubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProjectFieldInitiate(project?.id, "projectSummary", summaryInput)
    );
    setSummaryEditMode(false);
  };

  // Handle Description Editing
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const editDescriptionModeOnClick = (e) => {
    setDescriptionEditMode(!descriptionEditMode);
  };
  const [descriptionInput, setDescriptionInput] = useState(
    project?.projectDescription || "No description added yet"
  );
  const onDescriptionChange = (e) => {
    setDescriptionInput(e.target.value);
  };
  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProjectFieldInitiate(
        project?.id,
        "projectDescription",
        descriptionInput
      )
    );
    setDescriptionEditMode(false);
  };

  return (
    <>
      <Wrapper
        onClick={(e) => {
          /* Closing editable fields on click outside of them */
          projectTitleEditMode &&
            e.target.localName !== "input" &&
            setProjectTitleEditMode(false);

          summaryEditMode &&
            e.target.localName !== "input" &&
            setSummaryEditMode(false);

          descriptionEditMode &&
            e.target.localName !== "textarea" &&
            setDescriptionEditMode(false);
        }}
      >
        <WelcomeWrapper>
          <ProjectAvatar
            projectKey={project?.projectKey}
            url={project?.photoUrl || null}
            size={150}
          />
          <WelcomeMessage>
            <div style={{display: "flex", gap: "10px"}}>
              <DeleteButton onClick={deleteProject}>
                <p>Delete Project</p>
                <span className="tooltiptext">
                  Caution: Cannot undo this action!
                </span>
              </DeleteButton>
              <ArchiveButton onClick={archiveProject}>
                <p>Archive</p>
              </ArchiveButton>
            </div>
            {/* Editable Project Title */}

            {projectTitleEditMode ? (
              <form
                onSubmit={handleTitleSubmit}
                style={{ textAlign: "center" }}
              >
                <TitleEdit
                  defaultValue={projectTitleInput}
                  onChange={onProjectTitleChange}
                ></TitleEdit>
                <input
                  type="submit"
                  style={{
                    visibility: "hidden",
                    display: "none",
                    width: "0",
                    height: "0",
                  }}
                />
              </form>
            ) : (
              <Title editable={true} onClick={editTitleModeOnClick}>
                {project?.projectTitle || "No Title added yet"}
              </Title>
            )}

            {/* Editable Project Summary */}

            {summaryEditMode ? (
              <form
                onSubmit={handleSummarySubmit}
                style={{ textAlign: "center" }}
              >
                <SummaryEdit
                  defaultValue={summaryInput}
                  onChange={onSummaryChange}
                ></SummaryEdit>
                <input
                  type="submit"
                  style={{
                    visibility: "hidden",
                    display: "none",
                    width: "0",
                    height: "0",
                  }}
                />
              </form>
            ) : (
              <Summary editable={true} onClick={editSummaryModeOnClick}>
                {project?.projectSummary || "No Summary added yet"}
              </Summary>
            )}
          </WelcomeMessage>
        </WelcomeWrapper>
        {/* Editable Project Description */}

        {descriptionEditMode ? (
          <form
            onSubmit={handleDescriptionSubmit}
            style={{ textAlign: "center" }}
          >
            <DescriptionEdit
              defaultValue={descriptionInput}
              onChange={onDescriptionChange}
            ></DescriptionEdit>
            <input
              type="submit"
              style={{
                visibility: "hidden",
                display: "none",
                width: "0",
                height: "0",
              }}
            />
          </form>
        ) : (
          <Description editable={true} onClick={editDescriptionModeOnClick}>
            {project?.projectDescription || "Add a project description"}
          </Description>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: flex-start;
  width: 95%;
  min-height: 100vh;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  h2  {
    font-size: xx-large;
    font-weight: bolder;
    color: #35307e;
  }

  h2 {
    font-size: large;
    font-weight: normal;
    color: #515151;
  }
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  color: #35307e;
  :hover {
    outline: ${(props) => {
      if (props.editable) {
        return "solid";
      } else {
        return "none";
      }
    }};
    border-radius: 5px;
    outline-width: 1.5px;
  }
`;

const TitleEdit = styled.input`
  width: 100%;
  font-size: xx-large;
  font-weight: bold;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  color: #35307e;
  border-radius: 5px;
  outline-width: 1.5px;
  outline-color: #35307e;
`;

const Summary = styled.h1`
  font-size: large;
  font-weight: normal;
  color: #515151;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  :hover {
    outline: ${(props) => {
      if (props.editable) {
        return "solid";
      } else {
        return "none";
      }
    }};
    border-radius: 5px;
    outline-width: 1.5px;
  }
`;

const SummaryEdit = styled.input`
  width: 100%;
  font-size: large;
  font-weight: normal;
  color: #515151;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  border-radius: 5px;
  outline-width: 1.5px;
  outline-color: #35307e;
`;

const DeleteButton = styled.div`
  background-color: #e96262;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
  cursor: pointer;
  position: relative;

  .tooltiptext {
    position: absolute;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s;
    width: 120px;
    bottom: 125%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */

    ::after {
      content: " ";
      position: absolute;
      top: 100%; /* At the bottom of the tooltip */
      left: 10%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }

  :hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const ArchiveButton = styled(DeleteButton)`
  background-color: #f8b965;
`

const Description = styled.h1`
  font-size: large;
  font-weight: normal;
  color: #515151;
  min-width: 70%;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  :hover {
    outline: ${(props) => {
      if (props.editable) {
        return "solid";
      } else {
        return "none";
      }
    }};
    border-radius: 5px;
    outline-width: 1.5px;
  }
`;

const DescriptionEdit = styled.textarea`
  font-size: large;
  font-weight: normal;
  color: #515151;
  margin: 0;
  min-width: 800px;
  padding: 5px 5px 5px 5px;
  margin: -5px;
  border-radius: 5px;
  outline-width: 1.5px;
  outline-color: #35307e;
`;
