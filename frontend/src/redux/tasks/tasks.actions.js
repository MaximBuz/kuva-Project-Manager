import tasksTypes from './tasks.types';
import {db} from "../../firebase-config";
import { collection, addDoc, Timestamp, query, onSnapshot, where, deleteDoc, doc, updateDoc, getDoc, setDoc} from "firebase/firestore"; 
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

const getTaskComments = (taskComments) => ({
    type: tasksTypes.GET_COMMENTS,
    payload: taskComments
})

const addTaskComment = () => ({
    type: tasksTypes.COMMENT_TASK
})

// Befüllt den Payload des action-creators mit tasks ausm Firestore
export const getTasksInitiate = (projectId) => {
  return async function(dispatch) {
      const q = query(
          collection(db, "tasks"),
          where("userId", "==", store.getState().user.currentUser.id),
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
        const authorRef = doc(db, "users", task.userId);
        const authorSnap = await getDoc(authorRef);
        const author = authorSnap?.data() || null
        await addDoc(collection(db, "tasks"), {
            identifier: task.identifier,
            projectId: task.projectId,
            author: {
                displayName: author?.displayName || "No Author",
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

export const deleteTaskInitiate = (taskId) => {
    return async function(dispatch) {
        await deleteDoc(doc(db, "tasks", taskId))
        dispatch(deleteTask());
    }
}

export const getTaskCommentsInitiate = (taskId) => {
    return async (dispatch) => {
        const q = query(
            collection(db, "taskComments"),
            where("taskId", "==", taskId)
            );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const taskComments = [];
            querySnapshot.forEach((doc) => {
                taskComments.push({...doc.data(), id: doc.id})
            })
            dispatch(getTaskComments(taskComments));
        })
    }
} 

export const addTaskCommentInitiate = (taskId, user, comment) => {
    return async (dispatch) => {
        await addDoc(collection(db, "taskComments"), {
            taskId: taskId,
            user: {
                id: user.id,
                displayName: user.displayName,
                photoUrl: user.photoURL
            },
            comment: comment,
            timeStamp:Timestamp.now()
        });
        dispatch(addTaskComment());
    }
}