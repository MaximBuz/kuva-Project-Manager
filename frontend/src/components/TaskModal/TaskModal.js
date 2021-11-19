import ReactDom from "react-dom";
import {useState, useEffect} from "react";
import "./TaskModal.css"
import UserCard from "../UserCard/UserCard"
import { useDispatch, useSelector} from "react-redux";
// import {useState} from "react"
import {deleteTaskInitiate, addTaskCommentInitiate, getTaskCommentsInitiate} from "../../redux/tasks/tasks.actions";

function Modal({ closeModal, task }) {

    const {currentUser} = useSelector(state => state.user)

    let priority = task.taskPriority || ""
    let priorityColor;
    if (priority == "low") {priorityColor = "green";}
    else if (priority == "medium") {priorityColor = "yellow";}
    else {priorityColor = "red";}

    const dispatch = useDispatch();
    const deleteTask = async () => {
        closeModal()
        await dispatch(deleteTaskInitiate(task.id));
        window.location.reload(true);
    }


    /* 
    ----------------------------
    Handling the comment section 
    ----------------------------
    */

    // getting previous comments
    const {taskComments} = useSelector(state => state.tasks)
    useEffect( () => {
        return dispatch(getTaskCommentsInitiate(task.id));
    }, [task.id])

    // adding new comments
    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const handleChatSubmit = async (e) => {
        console.log("enter funzt")
        e.preventDefault();
        await dispatch(addTaskCommentInitiate(task.id, currentUser.uid, comment))
    }

    return ReactDom.createPortal(
        <>
            <div className="task-modal-backdrop" onClick={() => closeModal()}>
                <div className="task-modal-wrapper" onClick={e => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
                }}>
                    <div className="task-modal-header">

                        <div className="task-modal-header-pills">
                            <div className="identifier-pill">
                                <p>{task.identifier}</p>
                            </div>
                            <div onClick={deleteTask} className="delete-pill">
                                <p>delete</p>
                            </div>
                        </div>
                        <svg className="task-modal-close" onClick={() => closeModal()} width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L16 18M16 1L1 18" stroke="black"/>
                        </svg>
                    </div>

                    <div className="task-header-title-row">
                            <h1 className="task-modal-title">{task.taskTitle}</h1>
                            <p>Created REPLACE hours ago</p>
                    </div>
                    <div className="task-modal-content">

                        <div className="task-modal-section left">
                            <div className="text-area">
                                <div className="summary section">
                                    <h3>Summary</h3>
                                    <p>{task.taskSummary}</p>
                                </div>
                                <div className="description section">
                                    <h3>Description</h3>
                                    <p>{task.taskDescription}</p>
                                </div>
                            </div>
                            <div className="comments-area section">
                                <h3>Activity</h3>
                                <div>
                                    <div>
                                        {taskComments && taskComments.map((comment, index) => {
                                            if (comment.userId == currentUser.uid) {
                                                return(
                                                    <div>{comment.comment} von User</div>
                                                )
                                            } else {
                                                return(
                                                    <div>{comment.comment} von Anderen</div>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div>
                                        <form onSubmit={handleChatSubmit}>
                                            <input type="text" placeholder="Add a comment..." onChange={handleInputChange}></input>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="task-modal-section right">
                            <div className="priority section">
                                <h3>Priority</h3>
                                <div className={"priority-pill" + " " + priorityColor}>
                                    <p>{task.taskPriority}</p>
                                </div>
                            </div>
                            
                            <div className="status section">
                                <h3>Status</h3>
                                <div className="status-pill">
                                    <p>{task.status}</p>
                                </div>
                            </div>
                            
                            <div className="assigned-to section">
                                <h3>Assigned To</h3>
                                <UserCard taskAuthor={task.author || ""}></UserCard>
                                <UserCard taskAuthor={task.author || ""}></UserCard>
                            </div>
                            
                            <div className="author section">
                                <h3>Author</h3>
                                <UserCard taskAuthor={task.author || ""}></UserCard>
                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default Modal
