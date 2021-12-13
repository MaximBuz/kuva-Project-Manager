import React from "react";
import TaskRow from "../components/Cards/TaskRowNonDraggable";
import CounterBlob from "../components/Misc/CounterBlob";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getArchivedTasksInitiate } from "../redux/tasks/tasks.actions";
import TaskModal from "../components/Modals/TaskModal";

import styled from "styled-components";

function TaskArchivePage() {
  const [openModal, setOpenModal] = useState("");
  const { identifier } = useParams();
  const { archivedTasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArchivedTasksInitiate(identifier));
  }, []);

  return (
    <Wrapper>
      <Section>
        <TitleRow>
          <h2>Archived Tasks</h2>
          <CounterBlob count={archivedTasks.length} />
        </TitleRow>
        <TaskList>
          {archivedTasks.map((task, index) => {
            return (
              <TaskRow
                onClick={() => {
                  setOpenModal(task.id);
                }}
                key={task.id}
                index={index}
                id={task.id}
                identifier={task.identifier}
                authorId={task.userId}
                title={task.taskTitle}
                timestamp={task.timeStamp}
                summary={task.taskSummary}
                description={task.taskDescription}
                priority={task.taskPriority}
                status={task.status}
              />
            );
          })}
        </TaskList>
      </Section>
      {openModal && (
        <TaskModal
          closeModal={setOpenModal}
          task={archivedTasks.filter((item) => item.id === openModal)[0]}
        />
      )}
    </Wrapper>
  );
}

export default TaskArchivePage;

/* Styled Components */

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 30px 10px;
  background-color: white;
  border-style: solid;
  border-color: rgb(221, 221, 221);
  border-width: thin;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 45%;
  min-width: 400px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  h2 {
    font-size: 20px;
    font-weight: 500;
    color: #35307e;
    transition: 0.15s;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
