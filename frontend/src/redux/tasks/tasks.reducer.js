import tasksTypes from './tasks.types';

const INITIAL_STATE = {
    tasks: [],
    taskComments: [],
    archivedTasks: []
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case tasksTypes.GET_TASKS:
        return {
            ...state,
            tasks: action.payload
        };
    case tasksTypes.ADD_TASK:
        return {
            ...state
        };
    case tasksTypes.UPDATE_TASK:
        return {
            ...state
        };
    case tasksTypes.DELETE_TASK:
        return {
            ...state
        };
    case tasksTypes.GET_COMMENTS:
        return {
            ...state,
            taskComments: action.payload
        };
    case tasksTypes.COMMENT_TASK:
        return {
            ...state
        };
    case tasksTypes.ARCHIVE_TASK:
        return {
            ...state
        };
    case tasksTypes.UNARCHIVE_TASK:
        return {
            ...state
        };
    case tasksTypes.GET_ARCHIVED_TASKS:
        return {
            ...state,
            archivedTasks: action.payload
        };
    case tasksTypes.CLEAN_UP_TASKS:
        return INITIAL_STATE;
    default:
        return state;
  }
}


export default taskReducer;
