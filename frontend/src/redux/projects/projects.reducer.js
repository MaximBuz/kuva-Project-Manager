import projectsTypes from './projects.types';

const INITIAL_STATE = {
  projects: [],
};

const projectsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case projectsTypes.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case projectsTypes.ADD_PROJECT:
            return {
                ...state
            };
        case projectsTypes.GET_MEMBERS:
            return {
                ...state,
            };
        case projectsTypes.ADD_MEMBERS:
            return {
                ...state,
            };
        case projectsTypes.EDIT_MEMBER:
            return {
                ...state,
            };
        default:
            return state;
  }
};

export default projectsReducer;
