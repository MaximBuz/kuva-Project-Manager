import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import projectsReducer from "./projects/projects.reducer";
import taskReducer from "./tasks/tasks.reducer"


const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    tasks: taskReducer
});

export default rootReducer;