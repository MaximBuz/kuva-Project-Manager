import { Draggable } from "react-beautiful-dnd";
import { UilDraggabledots } from '@iconscout/react-unicons'

import styled from "styled-components";

const Card = styled.div`
    background-color: white;
    border-radius: 25px;
    border-style: solid;
    border-color: rgb(221, 221, 221);
    border-width: thin;
    width: 235px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    padding: 20px;
    gap: 15px;
    cursor: pointer;
    margin-bottom: 10px;
`

const TopRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`

const IdentifierPill = styled.div`
    background-color: #35307E;
    color: white;
    border-radius: 6px;
    padding: 5px 10px 5px 10px;
    margin: 0px;
    width:fit-content;
    height: fit-content;
    font-size: small;
    font-weight: 400;    
`

const PriorityPill = styled.div`
    color: white;
    border-radius: 6px;
    padding: 5px 10px 5px 10px;
    margin: 0px;
    width:fit-content;
    height: fit-content;
    font-size: small;
    font-weight: 400;
    background-color: ${props => {
        if (props.priority === "low") return "#45da5e"
        else if (props.priority === "medium") return "#f8b965"
        else return "#e96262";
    }}
`

const DragHandle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition: 0.5s;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;   

    p {
        font-size: 14px;
    }
`

const TitleRow = styled.div`
    display: flex;
    flex-direction: column;
    gap:5px;

    h2 {
        font-size: 20px;
        font-weight: 500;
        color: #35307E;
    }
`

function TaskCard(props) {

    const index = props.index;
    const identifier = props.identifier;
    const id = props.id;
    const title = props.title;
    const summary = props.summary;
    const priority = props.priority;
 
    return (
        <div onClick={props.onClick}>
            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <Card
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <TopRow>
                            <IdentifierPill>
                                <p>{identifier}</p>
                            </IdentifierPill>
                            <PriorityPill priority={priority}>
                                <p>{priority}</p>
                            </PriorityPill>
                            <DragHandle {...provided.dragHandleProps}>
                                <UilDraggabledots color="#dddddd"/>
                            </DragHandle>
                        </TopRow>

                        <Content>
                            <TitleRow>
                                <h2>{title}</h2>
                            </TitleRow>
                            <p>{summary}</p>
                        </Content>
                    </Card>
                )}
            </Draggable>
            
        </div>
    )
}

export default TaskCard;
