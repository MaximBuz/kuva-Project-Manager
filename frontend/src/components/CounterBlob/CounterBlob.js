import './CounterBlob.css';

function ProjectCard(props) {

    const count = props.count;
    
    return (
        <div className="counter-blob">
           <p>{count}</p>
        </div>
    );
  }
  
  export default ProjectCard;