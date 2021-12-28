import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addMembersInitiate } from "../../redux/projects/projects.actions";
import { collection, query, getDocs, where, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

const initialState = {};

export default function Modal({ closeModal, projectId }) {
  // State holding the user-input values of the form
  const [state, setState] = useState(initialState);

  // State holding successfully found users by their email
  const [collaborators, setCollaborators] = useState([]);

  // State holding an error message when no user could be found by the provided email
  const [queryError, setQueryError] = useState("");

  // The currently logged in user (to send dynamically filled invitiation mails)
  const { currentUser } = useSelector((state) => state.user);

  // for page refresh
  let history = useHistory();

  // for redux actions
  const dispatch = useDispatch();

  // updates the state with form inputs provided by the user
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // searches for users by email adress in firestore
  const handleUserSearch = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "users"),
      where("email", "==", state.userEmail || "no@name.com")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setQueryError("No user with this email adress found!");
    } else {
      setQueryError("");
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        setCollaborators([...collaborators, data]);
      });
    }
  };

  // handles deletion of successfully found users in the pipeline
  const handleDeleteCollaborator = (emailToDelete) => () => {
    setCollaborators(
      collaborators.filter(
        (collaborator) => collaborator.email !== emailToDelete
      )
    );
  };

  // sends out an invitation email to non-existing user
  const handleInvitation = async () => {
    const mailRef = await addDoc(collection(db, "mail"), {
      to: [state.userEmail],
      message: {
        subject: `${currentUser.displayName} invited you to use kuva!`,
        text: `
        Hey there! Your coworker ${currentUser.displayName} just send you an invite to join kuva!
        Follow this link to sign up: http://localhost:3000/ !
        `,
        html: `
        <h1>Hey there!</h1>
        <br>
        <p>Your coworker ${currentUser.displayName} just send you an invite to join <b>kuva</b>!</p>
        Follow this <a href="http://localhost:3000/">link</a> to sign up!
        `,
      },
    });

    // resets the form when invitation has been sent
    setQueryError("");
    setState(initialState);
  };

  // adds the chosen team members to the project in firestore and reloads the page with new redux state
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addMembersInitiate(projectId, collaborators, currentUser)).then(() => {
      closeModal();
      history.push("team");
    });
  };

  return ReactDom.createPortal(
    <>
      {/* Grey background behind modal, closes modal on click */}
      <GreyBackground onClick={() => closeModal()}>
        <FormWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TitleRow>
            <Title>Add New Team Member</Title>
            <CloseButton onClick={() => closeModal()} viewBox="0 0 17 19">
              <path d="M1 1L16 18M16 1L1 18" stroke="black" />
            </CloseButton>
          </TitleRow>
          <Form>
            <Section>
              <label htmlFor="userEmail">Search by User Email</label>
              <SearchField>
                <input
                  type="text"
                  name="userEmail"
                  onChange={handleInputChange}
                ></input>
                <button onClick={handleUserSearch}>Add</button>
              </SearchField>
              {queryError && <ErrorMessage>{queryError}</ErrorMessage>}
              {queryError && (
                <InviteLink onClick={handleInvitation}>
                  Invite your team member to kuva!
                </InviteLink>
              )}
              {collaborators && (
                <Collaborators>
                  {collaborators.map((collaborator) => {
                    return (
                      <CollaboratorPill>
                        {collaborator.displayName.split(" ")[0]} (
                        {collaborator.email})
                        <div
                          onClick={handleDeleteCollaborator(collaborator.email)}
                        >
                          &#10005;
                        </div>
                      </CollaboratorPill>
                    );
                  })}
                </Collaborators>
              )}
            </Section>
            {/* When no email in pipeline, disable button */}
            {collaborators.length > 0 ? (
              <button onClick={handleSubmit} type="submit" value="Submit">
                Add Team Members
              </button>
            ) : (
              <button disabled={true} value="Submit">
                Add Team Members
              </button>
            )}
          </Form>
        </FormWrapper>
      </GreyBackground>{" "}
      ,
    </>,
    document.getElementById("portal")
  );
}

/* 
-----------------
Styled Components
-----------------
*/

const GreyBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
`;

const FormWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 100000;
  border-radius: 25px;
  -webkit-box-shadow: 0px 5px 50px 10px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 5px 50px 10px rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  color: #35307e;
`;

const CloseButton = styled.svg.attrs({
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
})`
  cursor: pointer;
`;

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
    background-color: #35307e;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.1);
    }

    &:disabled {
      background-color: grey;
      cursor: not-allowed;

      &:hover {
        transform: scale(1);
      }
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-weight: bolder;
    margin-left: 10px;
  }

  input[type="text"] {
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
    word-wrap: break-all;
  }
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  button  {
    border-radius: 15px;
    font-size: large;
    transition: 0.3s;

    &:focus {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }
  }

  input {
    flex-grow: 1;
    transition: 0.3s;

    &:focus {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
      border-color: #35307e;
    }
  }
`;

const Collaborators = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const CollaboratorPill = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #c6c6c6;
  border-radius: 10px;
  padding: 10px;
  color: white;
  font-size: small;
  gap: 10px;

  div {
    position: relative;
    top: 1px;
    font-size: large;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-left: 10px;
`;

const InviteLink = styled.p`
  color: blue;
  font-weight: bold;
  color: #35307e;
  cursor: pointer;
  margin-left: 10px;
`;

const EmailSuccessPopUp = styled.div`
  color: white;
  background-color: #6ccd10;
  border-radius: 10px;
  padding: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000000000;
`;
