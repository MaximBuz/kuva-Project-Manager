import './ProjectsOverview.css';
import ProjectCard from "../ProjectCard/ProjectCard"
import CounterBlob from "../CounterBlob";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Modal from "../NewProjectModal"
import { getProjectsInitiate } from '../../redux/projects/projects.actions';
import moment from 'moment';
import { UilPlusCircle } from '@iconscout/react-unicons';

/* // for counting urgent tasks
import { store } from "../../redux/store";
import {db} from "../../firebase-config";
import { collection, query, where} from "firebase/firestore"; 
 */

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
      <div className="projects-overview">
          <div className="welcome-messages-wrapper">
            <h1 className="greeting">Hello {currentUser && currentUser.displayName.split(" ")[0]}</h1>
            <p className="sub-greeting">An overview over all of your projects. Click on them to view related tasks, or create a new project.</p>
          </div>
          <div className="projects-text-count">
            <h2 className="your-projects-text">your projects</h2>
            {projectCount && <CounterBlob count={projectCount}/>}
          </div>
          <div className="projects-wrapper">
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
            <div className="create-new-project-card" onClick={ () => {setOpenModal(!openModal)} }>
                <UilPlusCircle className="add-icon" size="50" color="#51515170"/>
            </div>
          </div>

          {openModal && <Modal closeModal={setOpenModal} />}

      </div>
    );
  }
  
  export default ProjectsOverview;