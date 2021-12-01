import projectsTypes from "./projects.types";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  Timestamp,
  query,
  onSnapshot,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { store } from "../store";

const getProjects = (projects) => ({
  type: projectsTypes.GET_PROJECTS,
  payload: projects,
});

const addProject = () => ({
  type: projectsTypes.ADD_PROJECT,
});

const getMembers = (teamMembers) => ({
  type: projectsTypes.GET_MEMBERS,
  payload: teamMembers,
});

const addMembers = () => ({
  type: projectsTypes.ADD_MEMBERS,
});


export const getProjectsInitiate = (user) => {
  return async function (dispatch) {
    const q = query(collection(db, "projects"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getProjects(projects));
    });
  };
};

export const addProjectInitiate = (project, user) => {
  return async function (dispatch) {
    const projectRef = await addDoc(collection(db, "projects"), {
      projectKey: project.projectKey,
      userId: project.userId,
      projectTitle: project.projectTitle,
      timeStamp: Timestamp.now(),
      projectSummary: project.projectSummary,
      collaborators: [
        {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          jobTitle: user.jobTitle,
          photoUrl: user.photoUrl,
        },
      ],
    });
    dispatch(addProject());
  };
};

/* Team Members / Collaborators actions */

export const getMembersInitiate = (projectId) => {
  return async function (dispatch) {
    // Find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    // Load the collaborators in the redux state
    const teamMembers = projectSnap.data().collaborators;
    dispatch(getMembers(teamMembers));
  };
};

export const addMembersInitiate = (projectId, members) => {
  return async function (dispatch) {
    // Find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    // now update "collaborators" in project document
    await updateDoc(projectRef, {
      collaborators: [...projectSnap.data().collaborators, ...members],
    });

    dispatch(addMembers());
  };
};

/* 
export const deleteTaskInitiate = (taskId) => {
    return async function(dispatch) {
        await deleteDoc(doc(db, "tasks", taskId))
        dispatch(deleteTask());
    }
} */
