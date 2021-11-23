import projectsTypes from './projects.types';

const INITIAL_STATE = {
  projects: [],
  project: ""
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
        default:
            return state;
  }
};

export default projectsReducer;
