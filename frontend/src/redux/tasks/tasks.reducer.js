import tasksTypes from './tasks.types';

const INITIAL_STATE = {
    tasks: [],
    task: {}
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
    default:
        return state;
  }
}


export default taskReducer;
