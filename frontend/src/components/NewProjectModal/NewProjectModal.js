import ReactDom from "react-dom";
import "./NewProjectModal.css"
import { useDispatch, useSelector} from "react-redux";
import {addProjectInitiate} from "../../redux/projects/projects.actions";
import {useState} from "react"

const initialState = {
        projectKey: "",
        userId: "",
        collaboratorIds: [],
        projectTitle: "",
        timeStamp: "",
        projectSummary: ``,
}

function Modal({ closeModal }) {

    //holding the input values provided by user
    const [state, setState] = useState(initialState) 

    const dispatch = useDispatch();

    const {currentUser} = useSelector(state => state.user)
    const userUID = currentUser.uid

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value, ["userId"]: userUID});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProjectInitiate(state));
        setTimeout(function(){ closeModal(); }, 500);
    }

    return ReactDom.createPortal(
        <>
            <div className="new-project-modal-backdrop" onClick={() => closeModal()}>
                <div className="new-project-form-wrapper" onClick={e => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
                }}>
                    <div className="new-project-form-title-row">
                        <h1 className="new-project-form-title">Create New Project</h1>
                        <svg className="new-project-form-close" onClick={() => closeModal()} width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L16 18M16 1L1 18" stroke="black"/>
                        </svg>
                    </div>
                    <form className="new-project-form" onSubmit={handleSubmit}>

                        <div className="form-section-container">
                            <label htmlFor="projectTitle">Name</label>
                            <input type="text" name="projectTitle" onChange={handleInputChange}></input>
                        </div>

                        <div className="form-section-container">
                            <label htmlFor="projectKey">Key</label>
                            <input type="text" name="projectKey" onChange={handleInputChange}></input>
                        </div>
                        
                        <div className="form-section-container">
                            <label htmlFor="projectSummary">Summary</label>
                            <textarea cols="24" rows="4" wrap="soft" name="projectSummary" onChange={handleInputChange}></textarea>
                        </div>

                        <button type="submit" value="Submit">Create New Project</button>

                    </form>
                </div>
            </div> ,
        </>,
        document.getElementById("portal")
    );
}

export default Modal
