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
  deleteDoc,
} from "firebase/firestore";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

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

const editMember = () => ({
  type: projectsTypes.EDIT_MEMBER,
});

const editProjectField = () => ({
  type: projectsTypes.EDIT_PROJECT_FIELD,
});

const deleteProject = () => ({
  type: projectsTypes.DELETE_PROJECT,
});

const archiveProject = () => ({
  type: projectsTypes.ARCHIVE_PROJECT,
});

/* 
-------------------------------------
Projects actions 
-------------------------------------
*/

export const getProjectsInitiate = (user) => {
  return async function (dispatch) {
    // get UnArchived Projects and save to store
    const unarchivedQuery = query(
      collection(db, "projects"),
      where("collaboratorIds", "array-contains", user.id)
    );
    onSnapshot(unarchivedQuery, (querySnapshot) => {
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
      archived: false,
      projectKey: project.projectKey,
      userId: project.userId,
      projectTitle: project.projectTitle,
      projectDescription: "Add a project description",
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
    await dispatch(addProject());
    toast.success("Successfully added project", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getProjectsInitiate(user));
  };
};

export const deleteProjectInitiate = (projectId) => {
  return async function (dispatch) {
    // first delete all tasks
    const taskQuery = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );

    onSnapshot(taskQuery, (querySnapshot) => {
      querySnapshot.forEach(async (task) => {
        // delete all taskComments of doc
        const commentQuery = query(
          collection(db, "taskComments"),
          where("taskId", "==", task.id)
        );
        onSnapshot(commentQuery, (commentQuerySnapshot) => {
          commentQuerySnapshot.forEach((comment) => deleteDoc(comment.ref));
        });

        // Finally delete doc
        await deleteDoc(task.ref);
      });
    });

    // then delete project
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
    dispatch(deleteProject());
    toast.info("Successfully deleted project", {position: "bottom-right"});
  };
};

export const archiveProjectInitiate = (projectId) => {
  return async function (dispatch) {
    // find the task in firestore
    const projectRef = doc(db, "projects", projectId);

    await updateDoc(projectRef, {
      archived: true,
    });
    dispatch(archiveProject());
    toast.info("Successfully archived project", {position: "bottom-right"});
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

export const addMembersInitiate = (projectId, members, user) => {
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

    await dispatch(addMembers());
    toast.success("Successfully added team members", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getProjectsInitiate(user));
  };
};

export const editMemberInitiate = (projectId, updatedMembers, user) => {
  return async function (dispatch) {
    // find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    // update the collaborators map field
    await updateDoc(projectRef, {
      collaborators: updatedMembers,
    });
    await dispatch(editMember());
    toast.success("Successfully edited team member", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getProjectsInitiate(user));
  };
};

export const deleteMemberInitiate = (projectId, newMembers, newMemberIds, user) => {
  return async function (dispatch) {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      collaboratorIds: newMemberIds,
      collaborators: newMembers,
    });
    await dispatch(deleteMember());
    toast.info("Successfully deleted team member", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getProjectsInitiate(user));
  };
};

export const editProjectFieldInitiate = (
  projectId,
  projectField,
  updatedValue
) => {
  return async function (dispatch) {
    // find the project in firestore
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    const updatedObject = {};
    updatedObject[projectField] = updatedValue;

    await updateDoc(projectRef, updatedObject);
    dispatch(editProjectField());
    toast.success("Successfully edited project", {position: "bottom-right"});
  };
};
