import teamTypes from './team.types';
import {db} from "../../firebase-config";
import { collection, addDoc, Timestamp, query, onSnapshot, where, deleteDoc, doc, updateDoc, getDoc, setDoc, getDocs} from "firebase/firestore"; 
import { store } from "../store";

const getMembers = (teamMembers) => ({
  type: teamTypes.GET_MEMBERS,
  payload: teamMembers,
})

/* const addMember = () => ({
  type: teamTypes.MEMBER
}) */


// Befüllt den Payload des action-creators mit tasks ausm Firestore
export const getMembersInitiate = (projectId) => {
  return async function(dispatch) {
    
    const q = query(collection(db, "teams"), where("projectId", "==", projectId));
    const teamSnap = await getDocs(q);
    const teamMembers = [];
    teamSnap.forEach(doc => {
        teamMembers.push(...doc.data().collaborators)
    })
    console.log(teamMembers)
    dispatch(getMembers(teamMembers));
  }
}

/* export const addTaskInitiate = (task) => {
    return async function(dispatch) {
        const authorRef = doc(db, "users", task.userId);
        const authorSnap = await getDoc(authorRef);
        const author = authorSnap?.data() || null
        await addDoc(collection(db, "tasks"), {
            identifier: task.identifier,
            projectId: task.projectId,
            author: {
                name: author?.displayName || "No Author",
                email: author?.email || "No Email",
                jobTitle: author?.jobTitle || "No Job Title",
                photoUrl: author?.photoUrl || null
            },
            userId: task.userId,
            taskAssignedTo:task.taskAssignedTo,
            taskTitle:task.taskTitle,
            timeStamp:Timestamp.now(),
            taskSummary:task.taskSummary,
            taskDescription:task.taskDescription,
            taskPriority:task.taskPriority,
            status:task.status,
            column: "backlog-column"
        });
        dispatch(addTask());
    }
}

export const deleteTaskInitiate = (taskId) => {
    return async function(dispatch) {
        await deleteDoc(doc(db, "tasks", taskId))
        dispatch(deleteTask());
    }
} */