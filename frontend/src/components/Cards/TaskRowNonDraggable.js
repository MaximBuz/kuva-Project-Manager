import React from "react";

import styled from "styled-components";

function TaskRow(props) {
  const index = props.index;
  const identifier = props.identifier;
  const id = props.id;
  const title = props.title;
  const priority = props.priority;

  return (
    <Row onClick={props.onClick}>
      <IdentifierPill>
        <p>{identifier}</p>
      </IdentifierPill>
      <PriorityPill priority={priority}>
        <p>{priority}</p>
      </PriorityPill>
      <Title>{title}</Title>
      <svg
        width="11"
        height="19"
        viewBox="0 0 11 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L9.5 9.5L1 18" className="arrow-path" stroke="black" />
      </svg>
    </Row>
  );
}

export default TaskRow;

/* Styled Components */

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;

  background-color: white;
  border-radius: 10px;
  border-style: solid;
  border-color: rgb(221, 221, 221);
  border-width: thin;
  display: flex;
  padding: 10px;
  gap: 10px;
  transition: 0.5s;
  cursor: pointer;
  line-height: normal;
  margin-bottom: 10px;

  svg {
    margin-left: auto;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.15);
  }
`;

const PriorityPill = styled.div`
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  min-width: 55px;
  text-align: center;
  text-transform: uppercase;
  height: fit-content;
  font-size: small;
  font-weight: 400;
  background-color: ${(props) => {
    if (props.priority === "low") return "#45da5e";
    else if (props.priority === "medium") return "#f8b965";
    else return "#e96262";
  }};
`;

const IdentifierPill = styled.div`
  background-color: #35307e;
  color: white;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  min-width: 55px;
  text-align: center;
  text-transform: uppercase;
  height: fit-content;
  font-size: small;
  font-weight: 400;
  transition: 0.15s;
`;
const Title = styled.h2`
  width: 360px;
  white-space: nowrap;
  overflow-x: hidden !important;
  text-overflow: ellipsis;
`;
const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
