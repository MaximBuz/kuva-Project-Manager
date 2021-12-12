import React from "react";
import TaskRow from "../components/Cards/TaskRowDraggable";
import CounterBlob from "../components/Misc/CounterBlob";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getTasksInitiate,
  updateTaskInitiate,
} from "../redux/tasks/tasks.actions";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import TaskModal from "../components/Modals/TaskModal";

import styled from "styled-components";

function BacklogPage() {
  const [openModal, setOpenModal] = useState("");
  const { identifier } = useParams();
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksInitiate(identifier));
  }, []);

  // Population of Selected for development Column
  const [tasksSelected, setTasksSelected] = useState(
    tasks.filter(
      (element) => element.column === "selected-for-development-column"
    )
  );
  const countSelected = tasksSelected.length;

  const [tasksBacklog, setTasksBacklog] = useState(
    tasks.filter((element) => element.column === "backlog-column")
  );
  const countBacklog = tasksBacklog.length;

  // Drag and drop functionality (TODO: Move to seperate file, way to big a function)
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // check if item has been dropped
    if (!destination) return;

    // check if item has changed its position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //handle item drop in the same column (no status change, only index change)
    if (source.droppableId === destination.droppableId) {
      // determine in which column the task order is being changed
      let newTaskArr;
      switch (source.droppableId) {
        case "backlog-column":
          newTaskArr = [...tasksBacklog];
          break;
        case "selected-for-development-column":
          newTaskArr = [...tasksSelected];
          break;
      }
      // change the task order within that column
      let temp = newTaskArr.splice(source.index, 1);
      newTaskArr.splice(destination.index, 0, ...temp);

      // persist in current state
      switch (source.droppableId) {
        case "backlog-column":
          setTasksBacklog(newTaskArr);
          break;
        case "selected-for-development-column":
          setTasksSelected(newTaskArr);
          break;
      }
      // TODO: State persistance with database (save the index to the task document)
      return;
    }

    // Handle item drop in a different column ( with status and index change )
    if (source.droppableId != destination.droppableId) {
      let startSourceTasks, startDestinationTasks;
      // populate the startSourceTasks with a copy of current state
      switch (source.droppableId) {
        case "backlog-column":
          startSourceTasks = [...tasksBacklog];
          break;
        case "selected-for-development-column":
          startSourceTasks = [...tasksSelected];
          break;
      }

      // delete the tasks within the startSourceTasks
      let temp = startSourceTasks.splice(source.index, 1)[0];

      // save the deletion in source column to current state
      switch (source.droppableId) {
        case "backlog-column":
          setTasksBacklog(startSourceTasks);
          break;
        case "selected-for-development-column":
          setTasksSelected(startSourceTasks);
          break;
      }

      // populate the startDestinationTasks with a copy of current state
      switch (destination.droppableId) {
        case "backlog-column":
          startDestinationTasks = [...tasksBacklog];
          temp.column = destination.droppableId;
          temp.status = "Backlog";
          dispatch(updateTaskInitiate(temp));
          break;
        case "selected-for-development-column":
          startDestinationTasks = [...tasksSelected];
          temp.column = destination.droppableId;
          temp.status = "Selected for Development";
          dispatch(updateTaskInitiate(temp));
          break;
      }

      // add the previously deleted task from startSourcetask to the new column
      startDestinationTasks.splice(destination.index, 0, temp);

      // save the addition in destination column to current state
      switch (destination.droppableId) {
        case "backlog-column":
          setTasksBacklog(startDestinationTasks);
          break;
        case "selected-for-development-column":
          setTasksSelected(startDestinationTasks);
          break;
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Section>
          <TitleRow>
            <h2>Tasks in Backlog</h2>
            <CounterBlob count={countBacklog} />
          </TitleRow>
          <Droppable droppableId={"backlog-column"}>
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasksBacklog
                  .sort((a, b) => {
                    if (a.taskPriority === "high") return -1;
                    if (
                      a.taskPriority === "medium" &&
                      b.taskPriority === "high"
                    )
                      return 1;
                    if (a.taskPriority === "medium" && b.taskPriority === "low")
                      return -1;
                    if (a.taskPriority === "low") return 1;
                  })
                  .map((task, index) => {
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
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Section>

        <Section>
          <TitleRow>
            <h2>Selected For Development</h2>
            <CounterBlob count={countSelected} />
          </TitleRow>
          <Droppable droppableId={"selected-for-development-column"}>
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasksSelected
                  .sort((a, b) => {
                    if (a.taskPriority === "high") return -1;
                    if (
                      a.taskPriority === "medium" &&
                      b.taskPriority === "high"
                    )
                      return 1;
                    if (a.taskPriority === "medium" && b.taskPriority === "low")
                      return -1;
                    if (a.taskPriority === "low") return 1;
                  })
                  .map((task, index) => {
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
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          {openModal && (
            <TaskModal
              closeModal={setOpenModal}
              task={tasks.filter((item) => item.id === openModal)[0]}
            />
          )}
        </Section>
      </Wrapper>
    </DragDropContext>
  );
}

export default BacklogPage;

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
  width: 50%;
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
