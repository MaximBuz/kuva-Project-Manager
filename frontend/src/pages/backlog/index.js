import React from 'react'
import TaskRow from "../../components/TaskRow/TaskRow";
import CounterBlob from "../../components/CounterBlob/CounterBlob";
import "./styles.css";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTasksInitiate, updateTaskInitiate } from '../../redux/tasks/tasks.actions';
import {DragDropContext} from "react-beautiful-dnd";
import {Droppable} from "react-beautiful-dnd";

function BacklogPage() {

    const { identifier } = useParams();

    const {tasks} = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getTasksInitiate(identifier));
    }, [])


    // Population of Selected for development Column
    const [tasksSelected, setTasksSelected] = useState(tasks.filter((element) => element.column === "selected-for-development-column"))
    const countSelected = tasksSelected.length
    
    const [tasksBacklog, setTasksBacklog] = useState(tasks.filter((element) => element.column === "backlog-column")) 
    const countBacklog = tasksBacklog.length

    // Drag and drop functionality (TODO: Move to seperate file, way to big a function)
    const onDragEnd = result => {
        const {destination, source, draggableId} = result;

        // check if item has been dropped
        if (!destination) return;

        // check if item has changed its position
        if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
        ) return;

        //handle item drop in the same column (no status change, only index change)
        if (source.droppableId === destination.droppableId) {
            // determine in which column the task order is being changed
            let newTaskArr
            switch(source.droppableId){
                case "backlog-column":
                    newTaskArr = [...tasksBacklog]
                    break;
                case "selected-for-development-column":
                    newTaskArr = [...tasksSelected]
                    break;
            }
            // change the task order within that column
            let temp = newTaskArr.splice(source.index, 1);
            newTaskArr.splice(destination.index, 0, ...temp)
            
            // persist in current state
            switch(source.droppableId){
                case "backlog-column":
                    setTasksBacklog(newTaskArr)
                    break;
                case "selected-for-development-column":
                    setTasksSelected(newTaskArr)
                    break;
            }
            // TODO: State persistance with database (save the index to the task document)
            return
        }

        // Handle item drop in a different column ( with status and index change )
        if (source.droppableId != destination.droppableId) {
            let startSourceTasks, startDestinationTasks
            // populate the startSourceTasks with a copy of current state
            switch(source.droppableId){
                case "backlog-column":
                    startSourceTasks = [...tasksBacklog]
                    break;
                case "selected-for-development-column":
                    startSourceTasks = [...tasksSelected]
                    break;
            }

            // delete the tasks within the startSourceTasks
            let temp = startSourceTasks.splice(source.index, 1)[0];

            // save the deletion in source column to current state
            switch(source.droppableId){
                case "backlog-column":
                    setTasksBacklog(startSourceTasks)
                    break;
                case "selected-for-development-column":
                    setTasksSelected(startSourceTasks)
                    break;
            }

            // populate the startDestinationTasks with a copy of current state
            switch(destination.droppableId){
                case "backlog-column":
                    startDestinationTasks = [...tasksBacklog]
                    temp.column = destination.droppableId;
                    temp.status = "Backlog"
                    dispatch(updateTaskInitiate(temp))
                    break;
                case "selected-for-development-column":
                    startDestinationTasks = [...tasksSelected]
                    temp.column = destination.droppableId;
                    temp.status = "Selected for Development"
                    dispatch(updateTaskInitiate(temp))
                    break;
            }

            // add the previously deleted task from startSourcetask to the new column
            startDestinationTasks.splice(destination.index, 0, temp);

            // save the addition in destination column to current state
            switch(destination.droppableId){
                case "backlog-column":
                    setTasksBacklog(startDestinationTasks)
                    break;
                case "selected-for-development-column":
                    setTasksSelected(startDestinationTasks)
                    break;
            }
        }
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>

        
        <div className="BacklogPage-wrapper">

            <div className="backlog-section">
                <div className="title-row-backlog">
                    <h2>Tasks in Backlog</h2>
                    <CounterBlob count={countBacklog}/>
                </div>
                <Droppable droppableId={"backlog-column"}>
                    {(provided, snapshot) => (
                        <div 
                            className="task-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {tasksBacklog
                                .map((task, index) => {
                                    return (
                                    <TaskRow
                                        key={task.id}
                                        index={index}
                                        id={task.id}
                                        identifier={task.identifier}
                                        authorId={task.userId}
                                        assigned={task.taskAssignedTo}
                                        title={task.taskTitle}
                                        timestamp={task.timeStamp}
                                        summary={task.taskSummary}
                                        description={task.taskDescription}
                                        priority={task.taskPriority}
                                        status={task.status}
                                    /> )
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </div>

            <div className="backlog-section">
                <div className="title-row-backlog">
                    <h2>Selected For Development</h2>
                    <CounterBlob count={countSelected}/>
                </div>
                <Droppable droppableId={"selected-for-development-column"}>
                    {(provided, snapshot) => (
                        <div 
                            className="task-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {tasksSelected
                                .map((task, index) => {
                                    return (
                                    <TaskRow
                                        key={task.id}
                                        index={index}
                                        id={task.id}
                                        identifier={task.identifier}
                                        authorId={task.userId}
                                        assigned={task.taskAssignedTo}
                                        title={task.taskTitle}
                                        timestamp={task.timeStamp}
                                        summary={task.taskSummary}
                                        description={task.taskDescription}
                                        priority={task.taskPriority}
                                        status={task.status}
                                    /> )
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>

        </div>
        </DragDropContext>
    )
}

export default BacklogPage
