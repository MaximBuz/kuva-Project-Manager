import {
    UilApps,
    UilUser,
    UilDialpad,
    UilUsersAlt,
    UilSchedule,
    UilArchiveAlt
} from '@iconscout/react-unicons'


const projectsIcon = <UilApps/>;
const accountIcon = <UilUser/>;
const tasksIcon = <UilDialpad/>;
const collaboratorsIcon = <UilUsersAlt/>;
const backlogIcon = <UilSchedule/>;
const archiveIcon = <UilArchiveAlt/>

export const projectsOverviewItems = [{
    icon: projectsIcon,
    text: "Projects",
    link: "/",
    active: true
},{
    icon: accountIcon,
    text: "Profile Settings",
    link: "profile",
    active: false
}];

export const profilePageItems = [{
    icon: projectsIcon,
    text: "Projects",
    link: "/",
    active: false
},{
    icon: accountIcon,
    text: "Profile Settings",
    link: "profile",
    active: true
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
    icon: archiveIcon,
    text: "Archive",
    // link wird im MenuItem component erweitet
    link: "archive",
    active: false
},{
    icon: collaboratorsIcon,
    text: "Team",
    // link wird im MenuItem component erweitet
    link: "team",
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
    icon: archiveIcon,
    text: "Archive",
    // link wird im MenuItem component erweitet
    link: "archive",
    active: false
},{
    icon: collaboratorsIcon,
    text: "Team",
    // link wird im MenuItem component erweitet
    link: "team",
    active: false
}];

export const ProjectArchiveItems = [{
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
    link: "backlog",
    active: false
},{
    icon: archiveIcon,
    text: "Archive",
    // link wird im MenuItem component erweitet
    link: "archive",
    active: true
},{
    icon: collaboratorsIcon,
    text: "Team",
    link: "team",
    active: false
}];



export const ProjectTeamItems = [{
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
    link: "backlog",
    active: false
},{
    icon: archiveIcon,
    text: "Archive",
    // link wird im MenuItem component erweitet
    link: "archive",
    active: false
},{
    icon: collaboratorsIcon,
    text: "Team",
    link: "team",
    active: true
}];
