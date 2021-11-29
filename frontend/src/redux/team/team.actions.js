import teamTypes from "./team.types";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";

const getMembers = (teamMembers) => ({
  type: teamTypes.GET_MEMBERS,
  payload: teamMembers,
});

const addMembers = () => ({
  type: teamTypes.ADD_MEMBERS,
});

// Befüllt den Payload des action-creators mit tasks ausm Firestore
export const getMembersInitiate = (projectId) => {
  return async function (dispatch) {
    const q = query(
      collection(db, "teams"),
      where("projectId", "==", projectId)
    );
    const teamSnap = await getDocs(q);
    const teamMembers = [];
    teamSnap.forEach((doc) => {
      teamMembers.push(...doc.data().collaborators);
    });
    console.log(teamMembers);
    dispatch(getMembers(teamMembers));
  };
};

export const addMembersInitiate = (projectId, members) => {
  return async function (dispatch) {
    let team;

    const q = query(
      collection(db, "teams"),
      where("projectId", "==", projectId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        team = { ...doc.data(), id: doc.id };
      });
    }

    const teamsRef = doc(db, "teams", team.id);
    await updateDoc(teamsRef, {
      collaborators: [...team.collaborators, ...members],
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
