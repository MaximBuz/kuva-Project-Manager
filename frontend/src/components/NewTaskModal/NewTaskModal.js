import ReactDom from "react-dom";
import { useDispatch, useSelector} from "react-redux";
import {addTaskInitiate} from "../../redux/tasks/tasks.actions";
import {useState} from "react"
import image from "./dropDown.png";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const GreyBackground = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 100000;
`

const FormWrapper = styled.div`
    position: fixed;
    max-height: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    padding: 30px;
    z-index: 100000;
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 50px 10px rgba(0,0,0,0.45); 
    box-shadow: 0px 5px 50px 10px rgba(0,0,0,0.45);
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 20px;
`

const TitleRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Title = styled.h1`
    font-size: xx-large;
    font-weight: bold;
    color: #35307E;
`

const CloseButton = styled.svg.attrs({
    width: "24",
    height: "24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
})`
    cursor: pointer;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;

    button {
        border-radius: 10px;
        width: fit-content;
        border-style: none;
        padding: 10px 15px 10px 15px;
        font-size: medium;
        color: white;
        background-color: #35307E;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            transform: scale(1.1);
        }
    }
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;

    label {
        font-weight: bolder;
        margin-left: 10px;
    }

    input[type=text] {
        border-radius: 15px;
        width: 400px;
        border-style: solid;
        border-color: rgb(221, 221, 221);
        border-width: thin;
        padding: 10px 15px 10px 15px;
        font-size: large;
        color: grey;
    }

    textarea {
        border-radius: 15px;
        width: 400px;
        height: 150px;
        border-style: solid;
        border-color: rgb(221, 221, 221);
        border-width: thin;
        padding: 10px 15px 10px 15px;
        font-size: large;
        color: grey;
        overflow: hidden;
        resize: none;
        word-wrap:break-all;
    }

    select {
        border-radius: 15px;
        width: 432px;
        border-style: solid;
        border-color: rgb(221, 221, 221);
        border-width: thin;
        padding: 10px 15px 10px 15px;
        font-size: large;
        color: grey;
        -moz-appearance: none; 
        -moz-appearance: none; 
        -webkit-appearance: none; 
        appearance: none;
        background-position: right 10px center;
        background-repeat: no-repeat;
    }
`



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
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addTaskInitiate(state));
        setTimeout(function(){
            closeModal();
            history.push("backlog"); 
        }, 500);
        window.location.reload(true);
    }

    return ReactDom.createPortal(
        <>
            <GreyBackground onClick={() => closeModal()}>
                <FormWrapper onClick={e => {e.stopPropagation()}}>
                    <TitleRow>
                        <Title className="new-project-form-title">Create New Task</Title>
                        <CloseButton onClick={() => closeModal()} width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L16 18M16 1L1 18" stroke="black"/>
                        </CloseButton>
                    </TitleRow>
                    <Form className="new-project-form" onSubmit={handleSubmit}>

                        <Section>
                            <label htmlFor="taskTitle">Title</label>
                            <input type="text" name="taskTitle" onChange={handleInputChange}></input>
                        </Section>

                        <Section>
                            <label htmlFor="taskSummary">Summary</label>
                            <input type="text" name="taskSummary" onChange={handleInputChange}></input>
                        </Section>
                    
                        {/* ACHTUNG: Fix bug, when not selecting an option */}
                        <Section>
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
                        </Section>
                        
                        {/* ACHTUNG: Fix bug, when not selecting an option */}
                        <Section>
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
                        </Section>
                        
                        <Section>
                            <label htmlFor="taskDescription">Description</label>
                            <textarea cols="24" rows="4" wrap="soft" name="taskDescription" onChange={handleInputChange}></textarea>
                        </Section>

                        <button type="submit" value="Submit">Add Task to Backlog</button>

                    </Form>
                </FormWrapper>
            </GreyBackground> ,
        </>,
        document.getElementById("portal")
    );
}

export default Modal
