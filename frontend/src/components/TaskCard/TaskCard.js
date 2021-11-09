import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";
import { UilDraggabledots } from '@iconscout/react-unicons'

function TaskCard(props) {

    const index = props.index;
    // const taskKey = props.key;
    const identifier = props.identifier;
    const id = props.id;
    // const author = props.author;
    // const assigned = props.assigned;
    const title = props.title;
    // const timestamp = props.timestamp;
    const summary = props.summary;
    // const description = props.description;
    const priority = props.priority;
    // const status = props.status;
    let priorityColor;

    if (priority === "low") {priorityColor = "green";}
    else if (priority === "medium") {priorityColor = "yellow";}
    else {priorityColor = "red";}


    return (
        <div onClick={props.onClick}>
            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <div 
                        className="task-card"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div className="task-card-top-row">
                            <div className="task-identifier-pill">
                                <p>{identifier}</p>
                            </div>
                            <div className={"task-priority-pill " + priorityColor}>
                                <p>{priority}</p>
                            </div>
                            <div  className="drag-handle" {...provided.dragHandleProps}>
                                <UilDraggabledots color="#dddddd"/>
                            </div>
                        </div>

                        <div className="task-card-content">
                            <div className="task-title-row">
                                <h2 className="task-title">{title}</h2>
                            </div>
                            <p className="task-summary">{summary}</p>
                        </div>
                    </div>
                )}
            </Draggable>
            
        </div>
    )
}

export default TaskCard
