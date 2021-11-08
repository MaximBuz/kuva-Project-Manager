import './ProjectCard.css';
import { Link } from 'react-router-dom';

function ProjectCard(props) {
    
    const id = props.id;
    const projectKey = props.projectKey;
    const projectTitle = props.projectTitle;
    const timeStamp = props.timeStamp;
    const projectSummary = props.projectSummary;
    // const countUrgent = props.countUrgent;
  
    return (
    
    <Link to={"/project/" + id + "/"}>
        <div className="project-card" id={"project-card-" + parseInt(projectKey)} >
           
           <div className="project-card-top-row">
               <div className="identifier-pill">
                   <p>{projectKey}</p>
               </div>
               <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M1 1L9.5 9.5L1 18" className="arrow-path" stroke="black"/>
               </svg>
           </div>

           <div className="project-card-content">
               <div className="title-row">
                   <h2 className="project-title">{projectTitle}</h2>
                   <p className="project-timestamp">{timeStamp}</p>
               </div>
               <p className="project-summary">{projectSummary}</p>
           </div>
        {/* <div className="count-urgent-pill">
            <p className="count-urgent-content"> {countUrgent.toString()} URGENT</p>
        </div> */}
        </div>
    </Link>
    );
  }
  
  export default ProjectCard;