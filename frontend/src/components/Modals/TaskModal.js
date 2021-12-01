import ReactDom from "react-dom";
import moment from "moment";
import { useState, useEffect } from "react";
import UserCard from "../Cards/UserCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskInitiate,
  addTaskCommentInitiate,
  getTaskCommentsInitiate,
} from "../../redux/tasks/tasks.actions";

import styled from "styled-components";
import { UilCommentAltSlash } from '@iconscout/react-unicons'

function Modal({ closeModal, task }) {
  const { currentUser } = useSelector((state) => state.user);
  let priority = task.taskPriority || "";

  const dispatch = useDispatch();
  const deleteTask = async () => {
    closeModal();
    await dispatch(deleteTaskInitiate(task.id));
    window.location.reload(true);
  };

  /* 
    ----------------------------
    Handling the comment section 
    ----------------------------
    */

  // getting previous comments
  const { taskComments } = useSelector((state) => state.tasks);
  useEffect(() => {
    return dispatch(getTaskCommentsInitiate(task.id));
  }, [task.id]);

  // adding new comments
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };


  const handleChatSubmit = async (e) => {
    console.log("enter funzt");
    e.preventDefault();
    await dispatch(addTaskCommentInitiate(task.id, currentUser, comment));
    setComment("");
  };

  return ReactDom.createPortal(
    <>
      <GreyBackground onClick={() => closeModal()}>
        <ModalWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Header>
            <HeaderPills>
              <IdentifierPill>
                <p>{task.identifier}</p>
              </IdentifierPill>
              <DeleteButton onClick={deleteTask}>
                <p>delete</p>
              </DeleteButton>
            </HeaderPills>
            <CloseButton onClick={() => closeModal()} viewBox="0 0 17 19">
              <path d="M1 1L16 18M16 1L1 18" stroke="black" />
            </CloseButton>
          </Header>

          <TitleRow>
            <Title>{task.taskTitle}</Title>
            <p>Created REPLACE hours ago</p>
          </TitleRow>
          <Content>
            <LeftSection>
              <TextArea>
                <SubSection>
                  <h3>Summary</h3>
                  <p>{task.taskSummary}</p>
                </SubSection>
                <SubSection>
                  <h3>Description</h3>
                  <p>{task.taskDescription}</p>
                </SubSection>
              </TextArea>
              <div className="comments-area">
                <h3>Activity</h3>
                <div>
                  <CommentHistory>
                    {taskComments.length > 0 ?
                      taskComments
                        .sort((a, b) => {
                          if (a.timeStamp < b.timeStamp) {
                            return -1;
                          } else {
                            return 1;
                          }
                        })
                        .map((comment, index) => {
                          if (comment.user.id === currentUser.id) {
                            return (
                              <OwnComment>
                                <OwnCommentBubble>
                                  {comment.comment}
                                  <ChatTimeStamp>
                                    {moment(
                                      new Date(comment.timeStamp.seconds * 1000)
                                    )
                                      .fromNow()
                                      .toString()}
                                  </ChatTimeStamp>
                                </OwnCommentBubble>
                              </OwnComment>
                            );
                          } else {
                            return (
                              <ForeignComment>
                                <ForeignCommentBubble>
                                  <ForeignUserName>
                                    {comment.user.displayName}
                                  </ForeignUserName>
                                  {comment.comment}
                                  <ChatTimeStamp>
                                    {moment(
                                      new Date(comment.timeStamp.seconds * 1000)
                                    )
                                      .fromNow()
                                      .toString()}
                                  </ChatTimeStamp>
                                </ForeignCommentBubble>
                              </ForeignComment>
                            );
                          }
                        }) :
                        <NoCommentText>
                          <UilCommentAltSlash size="50"/>
                          <p> No comments yet.</p>
                          <p>Be the first one to post something!</p>
                        </NoCommentText>
                        }
                  </CommentHistory>
                  <div>
                    <form onSubmit={handleChatSubmit}>
                      <Input
                        type="text"
                        placeholder="Add a comment..."
                        onChange={handleInputChange}
                        value={comment}
                      ></Input>
                    </form>
                  </div>
                </div>
              </div>
            </LeftSection>

            <RightSection>
              <SubSection>
                <h3>Priority</h3>
                <PriorityPill priority={priority}>
                  <p>{task.taskPriority}</p>
                </PriorityPill>
              </SubSection>

              <SubSection>
                <h3>Status</h3>
                <StatusPill>
                  <p>{task.status}</p>
                </StatusPill>
              </SubSection>

              <SubSection>
                <h3>Assigned To</h3>
                <UserCard user={task.displayName || ""}></UserCard>
                <UserCard user={task.displayName || ""}></UserCard>
              </SubSection>

              <SubSection>
                <h3>Author</h3>
                <UserCard user={task.author}></UserCard>
              </SubSection>
            </RightSection>
          </Content>
        </ModalWrapper>
      </GreyBackground>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;

/* Styled Components */

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

const ModalWrapper = styled.div`
  width: 70%;
  max-width: 700px;
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderPills = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const IdentifierPill = styled.div`
  background-color: #35307e;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
`;

const DeleteButton = styled.div`
  background-color: #e96262;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
  cursor: pointer;
`;

const CloseButton = styled.svg.attrs({
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
})`
  cursor: pointer;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  color: #35307e;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  & * > h3 {
    color: #35307e;
    font-weight: bolder;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LeftSection = styled(Section)`
  width: 60%;
`;
const RightSection = styled(Section)`
  width: 40%;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PriorityPill = styled.div`
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  background-color: ${(props) => {
    if (props.priority === "low") return "#45da5e";
    else if (props.priority === "medium") return "#f8b965";
    else return "#e96262";
  }};
`;

const StatusPill = styled.div`
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  border-style: solid;
  border-width: 1px;
  border-color: #dadada;
  width: fit-content;
  height: fit-content;
  font-size: medium;
  font-weight: 400;
  transition: 0.15s;
`;

const CommentHistory = styled.div`
  width: 100%;
  height: 260px;
  overflow-y: scroll;
  scroll-snap-type: y;
  display: flex;
  flex-direction: column;
`;

// No comments yet, show a message
const NoCommentText = styled.div`
  color: #9593c4;
  font-size: large;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ForeignComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;
  gap: 10px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

const OwnComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: right;
  gap: 10px;
  margin-bottom: 12px;
  margin-right: 12px;
  box-sizing: border-box;
`;

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
`;

const ForeignUserName = styled.div`
  text-align: left;
  width: 100%;
  height: fit-content;
  color: #35307e;
  font-weight: bold;
`;

const ForeignCommentBubble = styled.div`
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #d3d3d3;
  box-sizing: border-box;
  padding: 10px;
  width: 57%;
  height: fit-content;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ChatTimeStamp = styled.div`
  font-size: 0.6rem;
  color: grey;
`;
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
`;
