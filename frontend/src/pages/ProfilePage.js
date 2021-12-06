// React
import React from "react";

// Components
import UserAvatar from "../components/Misc/UserAvatar";
import { DatePicker, Space } from "antd";

// Styling
import styled from "styled-components";
import { UilBag } from "@iconscout/react-unicons";
import { UilEnvelopeAlt } from "@iconscout/react-unicons";
import { UilPhone } from "@iconscout/react-unicons";
import { UilMapMarker } from "@iconscout/react-unicons";
import { UilGift } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";

// State Management
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <>
      <Wrapper>
        <WelcomeWrapper>
          <UserAvatar
            name={currentUser.name}
            url={currentUser?.photoUrl || null}
            size={150}
          />
          <WelcomeMessage>
            <h1>Welcome,</h1>
            <h2>{currentUser.displayName}</h2>
          </WelcomeMessage>
        </WelcomeWrapper>

        <PersonalInfoSection>
          <h3>Personal Information</h3>
          <PersonalItems>
            <Item>
              <UilBag size={25} color="#515151" />
              Title: {currentUser.jobTitle || "Add a title"}
              <UilPen className="edit-pen" />
            </Item>
            <Item>
              <UilEnvelopeAlt size={25} color="#515151" />
              Email: {currentUser.email || "Add an email"}
              <UilPen className="edit-pen" />
            </Item>
            <Item>
              <UilPhone size={25} color="#515151" />
              Phone: {currentUser.phone || "Add a phone number"}
              <UilPen className="edit-pen" />
            </Item>
            <Item>
              <UilMapMarker size={25} color="#515151" />
              Location: {currentUser.location || "Add a location"}
              <UilPen className="edit-pen" />
            </Item>
            <Item>
              <UilGift size={25} color="#515151" />
              Birthday: {currentUser.birthDay || "Add a birthday"}
              <UilPen className="edit-pen" />
            </Item>
            <Item>
              <UilSchedule size={25} color="#515151" />
              Work Anniversaty:{" "}
              {currentUser.workAnniversary || "Add a work anniversary"}
              <UilPen className="edit-pen" />
            </Item>
          </PersonalItems>
        </PersonalInfoSection>
        <PreferencesSection>
          <h3>Edit Preferences</h3>
        </PreferencesSection>
      </Wrapper>
    </>
  );
}

/* Styled Components */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  h1,
  h2  {
    font-size: xx-large;
    font-weight: bolder;
    color: #35307e;
  }

  h2 {
    font-weight: normal;
    color: #515151;
  }
`;

const PersonalInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    color: #35307e;
    font-size: larger;
    font-weight: 500;
  }
`;

const PersonalItems = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 200px;
  max-width: fit-content;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  width: 350px;
  padding: 10px;
  cursor: pointer;
  outline: dotted;
  outline-width: 0px;
  border-radius: 0px;
  outline-color: white;
  transition: 0.3s;
  transform: scale(1);

  .edit-pen {
    margin-left: auto;
    transition: 0.3s;
    transform: scale(0);
  }

  :hover {
    outline: solid;
    border-radius: 25px;
    outline-width: 1.5px;
    color: #35307e;
    box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    svg {
      fill: #35307e;
    }
    .edit-pen {
      transform: scale(1);
    }
  }
`;

const PreferencesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    color: #35307e;
    font-size: larger;
    font-weight: 500;
  }
`;
