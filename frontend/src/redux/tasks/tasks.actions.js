import tasksTypes from './tasks.types';
import {db} from "../../firebase-config";
import { collection, addDoc, Timestamp, query, onSnapshot, where, deleteDoc, doc, updateDoc} from "firebase/firestore"; 
import { store } from "../store";

const getTasks = (tasks) => ({
  type: tasksTypes.GET_TASKS,
  payload: tasks,
})

const addTask = () => ({
  type: tasksTypes.ADD_TASK
})

const updateTask = () => ({
  type: tasksTypes.UPDATE_TASK
})

const deleteTask = () => ({
  type: tasksTypes.DELETE_TASK
})

// Befüllt den Payload des action-creators mit tasks ausm Firestore
export const getTasksInitiate = (projectId) => {
  return async function(dispatch) {
      const q = query(
          collection(db, "tasks"),
          where("userId", "==", store.getState().user.currentUser.uid),
          where("projectId", "==", projectId)
          );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((doc) => {
              tasks.push({...doc.data(), id: doc.id})
          })
          dispatch(getTasks(tasks));
      })
  }
}

export const addTaskInitiate = (task) => {
    return async function(dispatch) {
        const docRef = await addDoc(collection(db, "tasks"), {
            identifier: task.identifier,
            projectId: task.projectId,
            userId:task.userId,
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

export const updateTaskInitiate = (task) => {
    return async function(dispatch) {
        const referenceTask = doc(db, "tasks", task.id)
        console.log({
            status: task.status,
            column: task.column
        })
        await updateDoc(referenceTask, {
            status: task.status,
            column: task.column
        })
        dispatch(updateTask());
    }
}

export const deleteTaskInitiate = (task) => {
    return async function(dispatch) {
        await deleteDoc(doc(db, "tasks", task.id))
        dispatch(deleteTask());
    }
}