import ReactDom from "react-dom";
import "./TaskModal.css"
// import { useDispatch, useSelector} from "react-redux";
// import {useState} from "react"

function Modal({ closeModal, task }) {


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
                            <div className="delete-pill">
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

                    <div className="task-modal-left-section">
                        <div className="text-area">
                            <div className="summary">

                            </div>
                            <div className="description">

                            </div>
                        </div>
                        <div className="comments-area">
                            TO BE CONTINUED
                        </div>
                    </div>

                    <div className="task-modal-right-section">
                        <div className="priority">
                        </div>
                        
                        <div className="status">

                        </div>
                        
                        <div className="assigned-to">

                        </div>
                        
                        <div className="author">

                        </div>
                        
                    </div>

                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default Modal
