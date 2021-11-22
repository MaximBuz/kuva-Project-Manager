import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import projectsReducer from "./projects/projects.reducer";
import taskReducer from "./tasks/tasks.reducer"
import teamReducer from "./team/team.reducer"


const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    tasks: taskReducer,
    team: teamReducer
});

export default rootReducer;