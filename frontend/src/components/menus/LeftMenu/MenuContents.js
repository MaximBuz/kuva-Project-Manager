import {
    UilApps,
    UilUser,
    UilDialpad,
    UilUsersAlt,
    UilSchedule
} from '@iconscout/react-unicons'


const projectsIcon = <UilApps/>;
const accountIcon = <UilUser/>;
const tasksIcon = <UilDialpad/>;
const collaboratorsIcon = <UilUsersAlt/>;
const backlogIcon = <UilSchedule/>;

export const projectsOverviewItems = [{
    icon: projectsIcon,
    text: "Projects",
    link: "/",
    active: true
},{
    icon: accountIcon,
    text: "Account Settings",
    link: "account",
    active: false
}];


export const ProjectTaskOverviewItems = [{
    icon: projectsIcon,
    text: "Projects",
    link: "/",
    active: false
},{
    icon: tasksIcon,
    text: "Tasks",
    // link wird im MenuItem component erweitet
    link: "/project/{CHANGETHIS}/",
    active: true
},{
    icon: backlogIcon,
    text: "Backlog",
    // link wird im MenuItem component erweitet
    link: "backlog",
    active: false
},{
    icon: collaboratorsIcon,
    text: "Team",
    // link wird im MenuItem component erweitet
    link: "collaborators",
    active: false
}];


export const ProjectBacklogItems = [{
    icon: projectsIcon,
    text: "Projects",
    link: "/",
    active: false
},{
    icon: tasksIcon,
    text: "Tasks",
    // link wird im MenuItem component erweitet
    link: "/project/{CHANGETHIS}/",
    active: false
},{
    icon: backlogIcon,
    text: "Backlog",
    // link wird im MenuItem component erweitet
    link: "backlog",
    active: true
},{
    icon: collaboratorsIcon,
    text: "Team",
    // link wird im MenuItem component erweitet
    link: "collaborators",
    active: false
}];
