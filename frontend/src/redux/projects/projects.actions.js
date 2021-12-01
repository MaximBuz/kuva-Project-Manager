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

const deleteMember = () => ({
  type: projectsTypes.DELETE_MEMBER,
});

/* 
-------------------------------------
Projects actions 
-------------------------------------
*/

export const getProjectsInitiate = (user) => {
  return async function (dispatch) {
    const q = query(
      collection(db, "projects"),
      where("collaboratorIds", "array-contains", user.id)
    );
    onSnapshot(q, (querySnapshot) => {
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
    await addDoc(collection(db, "projects"), {
      projectKey: project.projectKey,
      userId: project.userId,
      projectTitle: project.projectTitle,
      timeStamp: Timestamp.now(),
      projectSummary: project.projectSummary,
      collaboratorIds: [user.id],
      collaborators: [
        {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          jobTitle: user.jobTitle,
          photoUrl: user.photoUrl,
          projectRole: "Project Owner",
        },
      ],
    });
    dispatch(addProject());
  };
};

/* 
-------------------------------------
Team Members / Collaborators actions 
-------------------------------------
*/

export const getMembersInitiate = (projectId) => {
  return async function (dispatch) {
    // Find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    dispatch(getMembers());
  };
};

export const addMembersInitiate = (projectId, members) => {
  return async function (dispatch) {
    // Find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    // get all member ids
    const memberIds = members.map((member) => member.id);

    // now update "collaborators" in project document
    await updateDoc(projectRef, {
      collaboratorIds: [...projectSnap.data().collaboratorIds, ...memberIds],
      collaborators: [...projectSnap.data().collaborators, ...members],
    });

    dispatch(addMembers());
  };
};

export const deleteMemberInitiate = (projectId, newMembers, newMemberIds) => {
  return async function (dispatch) {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      collaboratorIds: newMemberIds,
      collaborators: newMembers
    });
    dispatch(deleteMember());
  };
};
