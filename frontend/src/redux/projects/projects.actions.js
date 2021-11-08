import projectsTypes from './projects.types';
import {db} from "../../firebase-config";
import { collection, addDoc, Timestamp, query, onSnapshot, where} from "firebase/firestore"; 
import { store } from "../store";

const getProjects = (projects) => ({
  type: projectsTypes.GET_PROJECTS,
  payload: projects,
})

const addProject = () => ({
  type: projectsTypes.ADD_PROJECT
})


// Befüllt den Payload des action-creators mit Projekten ausm Firestore
export const getProjectsInitiate = ( user ) => {
  return async function(dispatch) {
      const q = query(collection(db, "projects"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const projects = [];
          querySnapshot.forEach((doc) => {
              projects.push({...doc.data(), id: doc.id})
          })
          dispatch(getProjects(projects));
      })
      
  }
}

export const addProjectInitiate = (project) => {
  return async function(dispatch) {
      const docRef = await addDoc(collection(db, "projects"), {
          projectKey: project.projectKey,
          userId: project.userId,
          collaboratorIds: [],
          projectTitle: project.projectTitle,
          timeStamp: Timestamp.now(),
          projectSummary: project.projectSummary,
      });
      dispatch(addProject());
  }
}