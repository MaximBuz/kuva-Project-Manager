import ProjectCard from "./ProjectCard"
import CounterBlob from "./CounterBlob";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Modal from "./NewProjectModal"
import { getProjectsInitiate } from '../redux/projects/projects.actions';
import moment from 'moment';
import { UilPlusCircle } from '@iconscout/react-unicons';

/* // for counting urgent tasks
import { store } from "../../redux/store";
import {db} from "../../firebase-config";
import { collection, query, where} from "firebase/firestore"; 
 */

import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    gap: 40px;
`

const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    h1 {
      font-size: xx-large;
      font-weight: bolder;
      color: #35307E;
    }
`

const ProjectCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    h2 {
      text-transform: uppercase;
      color: #35307E;
      font-size: larger;
      font-weight: 500;
    }
`

const ProjectsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`

const CreateNewCard = styled.div`
    background-color: rgba(255, 255, 255, 0);
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.15); 
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.15);
    width: 350px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 15px;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      background-color: #35307E;
      transform: scale(1.05);
      > * {
        fill: white;
      }
    }
`


function ProjectsOverview() {

    /* Öffnen und schließen vom Portal-Modal zum neue Projekte hinzufügen:
       ------------------------------------------------
       - setOpenModal wird als prop zum Modal selbst runtergeschickt
       - hier keine Nutzung vom Redux Store, sondern basic React state
       ------------------------------------------------ */
    const [openModal, setOpenModal] = useState(false);


    /* Redux-Store Abonnieren:
       ------------------------------------------------
       - useSelector gibt den Redux-Store zurück, welcher das rootReducer Objekt beinhaltet
       - Dieser beinhaltet die verschiedenen Reducer als key-value pairs
       - Man destructured nur den Inhalt aus dem Store, der hier benötigt wird
       - Immer wenn eine action ausgelöst wird / der Store aktualisiert wird,
         läuft useSelector nochmal und aktualisiert das Component
       ------------------------------------------------ */
    const {projects} = useSelector(state => state.projects)
    

    const {currentUser} = useSelector(state => state.user)

    

    /* Beim laden die Projekte aus der Datenbank ziehen:
       ------------------------------------------------
       - Dispatched getProjects action-creator, dessen Payload davor durch
         getProjectsInitiate mit Projekten aus der Datenbank befüllt wird
       - Action-type: GET_PROJECTS
       - Action-Payload: Projekte aus dem Firestore
       ------------------------------------------------ */
    const dispatch = useDispatch();
    useEffect(() => {
      if(currentUser) return dispatch(getProjectsInitiate(currentUser));
    }, [currentUser])



    // den pinken Blob mit Anzahl aktualisieren
    // Immer wenn sich die anzahl der Projekte ändert
    let projectCount = projects.length;
    useEffect(() => {
      projectCount = projects.length;
    }, [projects])

  
    return (
      <Wrapper>
          <WelcomeWrapper>
            <h1 className="greeting">Hello {currentUser && currentUser.displayName.split(" ")[0]}</h1>
            <p className="sub-greeting">An overview over all of your projects. Click on them to view related tasks, or create a new project.</p>
          </WelcomeWrapper>
          <ProjectCounter>
            <h2 className="your-projects-text">your projects</h2>
            {projectCount && <CounterBlob count={projectCount}/>}
          </ProjectCounter>
          <ProjectsWrapper>
            {projects && projects.map((item, index) => {
              return (
                <ProjectCard
                  index = {index}
                  id = {item.id}
                  projectKey = {item.projectKey}
                  projectTitle = {item.projectTitle}
                  timeStamp = {moment(new Date(item.timeStamp.seconds*1000)).fromNow().toString()}
                  projectSummary = {item.projectSummary}
                /> )
            })}
            <CreateNewCard onClick={ () => {setOpenModal(!openModal)} }>
                <UilPlusCircle className="add-icon" size="50" color="#51515170"/>
            </CreateNewCard>
          </ProjectsWrapper>

          {openModal && <Modal closeModal={setOpenModal} />}

      </Wrapper>
    );
  }
  
  export default ProjectsOverview;