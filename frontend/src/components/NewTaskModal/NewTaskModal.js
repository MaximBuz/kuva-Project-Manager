import ReactDom from "react-dom";
import "./NewTaskModal.css"
import { useDispatch, useSelector} from "react-redux";
import {addTaskInitiate} from "../../redux/tasks/tasks.actions";
import {useState} from "react"
import image from "./dropDown.png";
import { useHistory } from "react-router-dom";

const initialState = {};

function Modal({ closeModal, projectId }) {

    //holding the input values provided by user
    const [state, setState] = useState(initialState) 

    const dispatch = useDispatch();

    let history = useHistory();
    const {currentUser} = useSelector(state => state.user)
    const userUID = currentUser.uid
    const userName = currentUser.displayName

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({
            ...state,
            [name]: value,
            ["userId"]: userUID,
            ["userName"]: userName,
            ["status"]: "backlog",
            ["projectId"]: projectId,
            ["identifier"]: "test",
        });
    }

    /* STOP!! Change this to TASKS handler!! */
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTaskInitiate(state));
        setTimeout(function(){
            closeModal();
            history.push("backlog"); 
        }, 500);
    }

    return ReactDom.createPortal(
        <>
            <div className="new-project-modal-backdrop" onClick={() => closeModal()}>
                <div className="new-project-form-wrapper" onClick={e => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
                }}>
                    <div className="new-project-form-title-row">
                        <h1 className="new-project-form-title">Create New Task</h1>
                        <svg className="new-project-form-close" onClick={() => closeModal()} width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L16 18M16 1L1 18" stroke="black"/>
                        </svg>
                    </div>
                    <form className="new-project-form" onSubmit={handleSubmit}>

                        <div className="form-section-container">
                            <label htmlFor="taskTitle">Title</label>
                            <input type="text" name="taskTitle" onChange={handleInputChange}></input>
                        </div>

                        <div className="form-section-container">
                            <label htmlFor="taskSummary">Summary</label>
                            <input type="text" name="taskSummary" onChange={handleInputChange}></input>
                        </div>
                    
                        {/* ACHTUNG: Fix bug, when not selecting an option */}
                        <div className="form-section-container">
                            <label htmlFor="taskAssignedTo">Assigned To</label>
                            <select 
                                name="taskAssignedTo" 
                                onChange={handleInputChange}
                                style={{ 
                                    backgroundImage: `url("${image}")` 
                                  }}
                                >
                                    <option value="user1">user1</option>
                                    <option value="user2">user2</option>
                                    <option value="user3">user3</option>
                            </select>
                        </div>
                        
                        {/* ACHTUNG: Fix bug, when not selecting an option */}
                        <div className="form-section-container">
                            <label htmlFor="taskPriority">Summary</label>
                            <select 
                                name="taskPriority" 
                                onChange={handleInputChange}
                                style={{ 
                                    backgroundImage: `url("${image}")` 
                                  }}
                                >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        
                        <div className="form-section-container">
                            <label htmlFor="taskDescription">Description</label>
                            <textarea cols="24" rows="4" wrap="soft" name="taskDescription" onChange={handleInputChange}></textarea>
                        </div>

                        <button type="submit" value="Submit">Add Task to Backlog</button>

                    </form>
                </div>
            </div> ,
        </>,
        document.getElementById("portal")
    );
}

export default Modal
