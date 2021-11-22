import teamTypes from './team.types';

const INITIAL_STATE = {
    members: [],
};

const teamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case teamTypes.GET_MEMBERS:
        return {
            ...state,
            members: action.payload
        };
    default:
        return state;
  }
}


export default teamReducer;
