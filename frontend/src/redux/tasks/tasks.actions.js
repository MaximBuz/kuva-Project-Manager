import tasksTypes from "./tasks.types";
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
} from "firebase/firestore";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

const getTasks = (tasks) => ({
  type: tasksTypes.GET_TASKS,
  payload: tasks,
});

const addTask = () => ({
  type: tasksTypes.ADD_TASK,
});

const updateTask = () => ({
  type: tasksTypes.UPDATE_TASK,
});

const deleteTask = () => ({
  type: tasksTypes.DELETE_TASK,
});

const getTaskComments = (taskComments) => ({
  type: tasksTypes.GET_COMMENTS,
  payload: taskComments,
});

const addTaskComment = () => ({
  type: tasksTypes.COMMENT_TASK,
});

const editTaskField = () => ({
  type: tasksTypes.EDIT_TASK_FIELD,
});

const archiveTask = () => ({
  type: tasksTypes.ARCHIVE_TASK,
});

const unArchiveTask = () => ({
  type: tasksTypes.ARCHIVE_TASK,
});

const getArchivedTasks = (tasks) => ({
  type: tasksTypes.GET_ARCHIVED_TASKS,
  payload: tasks,
});

export const cleanUpTasks = () => ({
  type: tasksTypes.CLEAN_UP_TASKS,
});

// Befüllt den Payload des action-creators mit tasks ausm Firestore
export const getTasksInitiate = (projectId) => {
  return function (dispatch) {
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId),
      where("archived", "==", false)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getTasks(tasks));
      unsubscribe();
    });
  };
};

export const addTaskInitiate = (task) => {
  return async function (dispatch) {
    // First get the author of the task
    // (from project collection, because role is necessary)
    const projectRef = doc(db, "projects", task.projectId);
    const projectSnap = await getDoc(projectRef);
    const authorId = projectSnap.data().userId;
    const author = projectSnap
      .data()
      .collaborators.filter((collaborator) => collaborator.id === authorId)[0];

    // Now get the users that were assigned to this task
    // this has to be changed later to have multiple assigned users
    // for now, only one user can be assigned
    const assignedTo = projectSnap
      .data()
      .collaborators.filter(
        (collaborator) => collaborator.id === task.taskAssignedTo
      );

    await addDoc(collection(db, "tasks"), {
      archived: false,
      identifier: task.identifier,
      projectId: task.projectId,
      author: {
        displayName: author.displayName || "No Author",
        email: author.email || "No Email",
        jobTitle: author.jobTitle || "No Job Title",
        photoUrl: author.photoUrl || null,
        projectRole: author.projectRole,
        id: author.id,
      },
      userId: task.userId,
      taskAssignedToIds: [task.taskAssignedTo],
      taskAssignedToUsers: [...assignedTo],
      taskTitle: task.taskTitle,
      timeStamp: Timestamp.now(),
      taskSummary: task.taskSummary,
      taskDescription: task.taskDescription,
      taskPriority: task.taskPriority,
      status: task.status,
      column: "backlog-column",
    });
    await dispatch(addTask());
    toast.success("Successfully added new task to backlog", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getTasksInitiate(task.projectId));
  };
};

export const updateTaskInitiate = (task) => {
  return async function (dispatch) {
    const referenceTask = doc(db, "tasks", task.id);
    console.log({
      status: task.status,
      column: task.column,
    });
    await updateDoc(referenceTask, {
      status: task.status,
      column: task.column,
    });
    dispatch(updateTask());
  };
};

export const deleteTaskInitiate = (taskId, projectId) => {
  return async function (dispatch) {
    await deleteDoc(doc(db, "tasks", taskId));
    await dispatch(deleteTask());
    toast.info("Successfully deleted task", {position: "bottom-right"});

    // updating state with updated projects
    await dispatch(getTasksInitiate(projectId));
  };
};

export const getTaskCommentsInitiate = (taskId) => {
  return async (dispatch) => {
    const q = query(
      collection(db, "taskComments"),
      where("taskId", "==", taskId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const taskComments = [];
      querySnapshot.forEach((doc) => {
        taskComments.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getTaskComments(taskComments));
    });
  };
};

export const addTaskCommentInitiate = (taskId, user, comment) => {
  return async (dispatch) => {
    await addDoc(collection(db, "taskComments"), {
      taskId: taskId,
      user: {
        id: user.id,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        email: user.email,
        jobTitle: user.jobTitle,
      },
      comment: comment,
      timeStamp: Timestamp.now(),
    });
    dispatch(addTaskComment());
  };
};

export const editTaskFieldInitiate = (taskId, taskField, updatedValue) => {
  return async function (dispatch) {
    // find the task in firestore
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);
    const updatedObject = {};
    updatedObject[taskField] = updatedValue;

    await updateDoc(taskRef, updatedObject);
    dispatch(editTaskField());
    toast.success("Successfully edited task", {position: "bottom-right"});
  };
};

export const archiveTaskInitiate = (taskId, projectId) => {
  return async function (dispatch) {
    // find the task in firestore
    const taskRef = doc(db, "tasks", taskId);

    await updateDoc(taskRef, {
      archived: true,
    });
    await dispatch(archiveTask());
    toast.info("Successfully archived task", {position: "bottom-right"});
    // updating state with updated projects
    await dispatch(getTasksInitiate(projectId));
  };
};

export const unArchiveTaskInitiate = (taskId, projectId) => {
  return async function (dispatch) {
    // find the task in firestore
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    await updateDoc(taskRef, {
      archived: false,
    });
    await dispatch(unArchiveTask());
    toast.info("Successfully unarchived task", {position: "bottom-right"});
    // updating state with updated projects
    await dispatch(getTasksInitiate(projectId));
  };
};

export const getArchivedTasksInitiate = (projectId) => {
  return function (dispatch) {
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId),
      where("archived", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getArchivedTasks(tasks));
    });
  };
};
