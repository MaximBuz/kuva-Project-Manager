import './ProjectDetail.css';
import { useHistory, useParams } from 'react-router-dom';
import TaskCard from "../TaskCard/TaskCard";
import CounterBlob from "../CounterBlob/CounterBlob"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTasksInitiate, getTasks, updateTaskInitiate} from '../../redux/tasks/tasks.actions';
import {DragDropContext} from "react-beautiful-dnd";
import {Droppable} from "react-beautiful-dnd";
import TaskModal from "../TaskModal/TaskModal"

function ProjectDetail() {

    /* Handle opening modal for viewing a tasks
       ------------------------------------------------
       - setOpenModal wird als prop zum Modal selbst runtergeschickt 
       ------------------------------------------------ */
    const [openModal, setOpenModal] = useState("");

    
    const { identifier } = useParams();

    const {tasks} = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getTasksInitiate(identifier));
    }, [])

    // Population of Selected for development Column
    const [tasksSelected, setTasksSelected] = useState(tasks.filter((element) => element.column === "selected-for-development-column"))
    const countSelected = tasksSelected.length

    // Population of In Progress Column
    const [tasksInProgress, setTasksInProgress] = useState(tasks.filter((element) => element.column === "in-progress-column"))
    const countInProgress = tasksInProgress.length
    /* useEffect(() => {
        console.log(tasksInProgress)
    }, [tasksInProgress]) */

    // Population of In Review Column
    const [tasksInReview, setTasksInReview] = useState(tasks.filter((element) => element.column === "in-review-column"))
    const countInReview = tasksInReview.length

    // Population of Completed Column
    const [tasksCompleted, setTasksCompleted] = useState(tasks.filter((element) => element.column === "completed-column"))
    const countCompleted = tasksCompleted.length


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
                case "selected-for-development-column":
                    newTaskArr = [...tasksSelected]
                    break;
                case "in-progress-column":
                    newTaskArr = [...tasksInProgress]
                    break;
                case "in-review-column":
                    newTaskArr = [...tasksInReview]
                    break;
                case "completed-column":
                    newTaskArr = [...tasksCompleted]
                    break;
            }
            // change the task order within that column
            let temp = newTaskArr.splice(source.index, 1);
            newTaskArr.splice(destination.index, 0, ...temp)
            
            // persist in current state
            switch(source.droppableId){
                case "selected-for-development-column":
                    setTasksSelected(newTaskArr)
                    break;
                case "in-progress-column":
                    setTasksInProgress(newTaskArr)
                    break;
                case "in-review-column":
                    setTasksInReview(newTaskArr)
                    break;
                case "completed-column":
                    setTasksCompleted(newTaskArr)
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
                case "selected-for-development-column":
                    startSourceTasks = [...tasksSelected]
                    break;
                case "in-progress-column":
                    startSourceTasks = [...tasksInProgress]
                    break;
                case "in-review-column":
                    startSourceTasks = [...tasksInReview]
                    break;
                case "completed-column":
                    startSourceTasks = [...tasksCompleted]
                    break;
            }

            // delete the tasks within the startSourceTasks
            let temp = startSourceTasks.splice(source.index, 1)[0];

            // save the deletion in source column to current state
            switch(source.droppableId){
                case "selected-for-development-column":
                    setTasksSelected(startSourceTasks)
                    break;
                case "in-progress-column":
                    setTasksInProgress(startSourceTasks)
                    break;
                case "in-review-column":
                    setTasksInReview(startSourceTasks)
                    break;
                case "completed-column":
                    setTasksCompleted(startSourceTasks)
                    break;
            }

            // populate the startDestinationTasks with a copy of current state
            switch(destination.droppableId){
                case "selected-for-development-column":
                    startDestinationTasks = [...tasksSelected]
                    temp.column = destination.droppableId;
                    temp.status = "Selected for Development"
                    dispatch(updateTaskInitiate(temp))
                    break;
                case "in-progress-column":
                    startDestinationTasks = [...tasksInProgress]
                    temp.column = destination.droppableId;
                    temp.status = "In Progress"
                    dispatch(updateTaskInitiate(temp))
                    break;
                case "in-review-column":
                    startDestinationTasks = [...tasksInReview]
                    temp.column = destination.droppableId;
                    temp.status = "In Review"
                    dispatch(updateTaskInitiate(temp))
                    break;
                case "completed-column":
                    startDestinationTasks = [...tasksCompleted]
                    temp.column = destination.droppableId;
                    temp.status = "Completed"
                    dispatch(updateTaskInitiate(temp))
                    break;
            }

            // add the previously deleted task from startSourcetask to the new column
            startDestinationTasks.splice(destination.index, 0, temp);

            // save the addition in destination column to current state
            switch(destination.droppableId){
                case "selected-for-development-column":
                    setTasksSelected(startDestinationTasks)
                    break;
                case "in-progress-column":
                    setTasksInProgress(startDestinationTasks)
                    break;
                case "in-review-column":
                    setTasksInReview(startDestinationTasks)
                    break;
                case "completed-column":
                    setTasksCompleted(startDestinationTasks)
                    break;
            }
        }
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div className="task-filter-section">
                    <p>Search Tasks <span><input type="text" className="search-field"></input></span></p>
                    <div className="filter-checkbox">
                    </div>
                </div>
                <div className="status-columns">

                    <div className="selected-for-development column">
                        <div className="column-title-row">
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
                                        .sort((a, b) => {
                                            if (a.taskPriority === "high") return -1
                                            if (a.taskPriority === "medium" && b.taskPriority === "high") return 1
                                            if (a.taskPriority === "medium" && b.taskPriority === "low") return -1
                                            if (a.taskPriority === "low") return 1
                                        })
                                        .map((task, index) => {
                                            return (
                                            <TaskCard
                                                onClick={ () => {
                                                    setOpenModal(task.id)
                                                }}
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

                    <div className="in-progress column">
                        <div className="column-title-row">
                            <h2>In Progress</h2>
                            <CounterBlob count={countInProgress}/>
                        </div>
                        <Droppable droppableId={"in-progress-column"}>
                            {(provided, snapshot) => (
                                <div 
                                    className="task-list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {tasksInProgress
                                        .map((task, index) => {
                                            return (
                                            <TaskCard
                                                onClick={ () => {
                                                    setOpenModal(task.id)
                                                }}
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

                    <div className="in-review column">
                        <div className="column-title-row">
                            <h2>In Review</h2>
                            <CounterBlob count={countInReview}/>
                        </div>
                        <Droppable droppableId={"in-review-column"}>
                            {(provided, snapshot) => (
                                <div 
                                    className="task-list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {tasksInReview
                                        .map((task, index) => {
                                            return (
                                            <TaskCard
                                                onClick={ () => {
                                                    setOpenModal(task.id)
                                                }}
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

                    <div className="completed column">
                        <div className="column-title-row">
                            <h2>Completed</h2>
                            <CounterBlob count={countCompleted}/>
                        </div>
                        <Droppable droppableId={"completed-column"}>
                            {(provided, snapshot) => (
                                <div 
                                    className="task-list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {tasksCompleted
                                        .map((task, index) => {
                                            return (
                                            <TaskCard
                                                onClick={ () => {
                                                    setOpenModal(task.id)
                                                }}
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
                        {openModal && <TaskModal closeModal={setOpenModal} task={tasks.filter(item => item.id === openModal)[0] }/>}
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

// Idee: Hinter completed ein "create new column" erstellen und auch alle draggable machen

export default ProjectDetail
