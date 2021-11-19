import ReactDom from "react-dom";
import moment from 'moment';
import {useState, useEffect} from "react";
import "./TaskModal.css"
import UserCard from "../UserCard/UserCard";
import UserAvatar from "../UserCard/UserAvatar";
import { useDispatch, useSelector} from "react-redux";
import {deleteTaskInitiate, addTaskCommentInitiate, getTaskCommentsInitiate} from "../../redux/tasks/tasks.actions";

import styled from 'styled-components';

const CommentHistory = styled.div`
    width: 100%;
    height: 260px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`

const ForeignComment = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: left;
    gap: 10px;
    margin-bottom: 12px;
    box-sizing: border-box;
`

const OwnComment = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: right;
    gap: 10px;
    margin-bottom: 12px;
    margin-right: 12px;
    box-sizing: border-box;
`

const OwnCommentBubble = styled.div`
    background-color: #eeedfa;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 57%;
    height: fit-content;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ForeignUserName = styled.div`
    text-align: left;
    width: 100%;
    height: fit-content;
    color: #35307E;
    font-weight: bold;
`

const ForeignCommentBubble = styled.div`
    border-style: solid;
    border-radius: 10px;
    border-width: 1px;
    border-color: #D3D3D3;
    box-sizing: border-box;
    padding: 10px;
    width: 57%;
    height: fit-content;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const ChatTimeStamp = styled.div`
    font-size: 0.6rem;
    color: grey;
`
const Input = styled.input`
    border-radius: 15px;
    width: 100%;
    margin-top: 11px;
    box-sizing: border-box;
    border-style: solid;
    border-color: rgb(221, 221, 221);
    border-width: thin;
    padding: 10px 15px 10px 15px;
    font-size: small;
    color: grey;
`

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
        await dispatch(addTaskCommentInitiate(task.id, currentUser, comment));
        setComment("");
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
                                    <CommentHistory>
                                        {taskComments && taskComments.sort((a,b) => {
                                            if (a.timeStamp < b.timeStamp) {
                                                return -1
                                            } else {
                                                return 1
                                            }
                                        }).map((comment, index) => {
                                            if (comment.user.id === currentUser.uid) {
                                                return(
                                                    <OwnComment>
                                                        <OwnCommentBubble>
                                                            {comment.comment}
                                                            <ChatTimeStamp>
                                                                {moment(new Date(comment.timeStamp.seconds*1000)).fromNow().toString()}
                                                            </ChatTimeStamp>
                                                        </OwnCommentBubble>
                                                    </OwnComment>
                                                )
                                            } else {
                                                return(
                                                    <ForeignComment>
                                                        <ForeignCommentBubble>
                                                            <ForeignUserName>
                                                                {comment.user.displayName}
                                                            </ForeignUserName>
                                                            {comment.comment}
                                                            <ChatTimeStamp>
                                                                {moment(new Date(comment.timeStamp.seconds*1000)).fromNow().toString()}
                                                            </ChatTimeStamp>
                                                        </ForeignCommentBubble>
                                                    </ForeignComment>
                                                )
                                            }
                                        })}
                                    </CommentHistory>
                                    <div>
                                        <form onSubmit={handleChatSubmit}>
                                            <Input type="text" placeholder="Add a comment..." onChange={handleInputChange} value={comment}></Input>
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
