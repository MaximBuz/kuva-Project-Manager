// Components
import UserAvatar from "../components/Misc/UserAvatar";

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
import { useState } from "react";

// Firebase tools
import { db } from "../firebase-config";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  // Get currently logged in user
  const { currentUser } = useSelector((state) => state.user);

  // Handle Modals state
  const [isTitleModalVisible, setIsTitleModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isBirthdayModalVisible, setIsBirthdayModalVisible] = useState(false);
  const [isAnniversaryModalVisible, setIsAnniversaryModalVisible] =
    useState(false);

  // Handle Input Changes
  const [inputs, setInputs] = useState({});
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setInputs({ [name]: value });
  };

  // Handle Submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.id);
    await updateDoc(userRef, inputs);
    setInputs({});
    window.location.reload(true);
  };

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
            <Item onClick={() => setIsTitleModalVisible(true)}>
              <UilBag size={25} color="#515151" />
              Title: {currentUser.jobTitle || "Add a title"}
              <UilPen className="edit-pen" />
            </Item>
            <Item onClick={() => setIsEmailModalVisible(true)}>
              <UilEnvelopeAlt size={25} color="#515151" />
              Email: {currentUser.email || "Add an email"}
              <UilPen className="edit-pen" />
            </Item>
            <Item onClick={() => setIsPhoneModalVisible(true)}>
              <UilPhone size={25} color="#515151" />
              Phone: {currentUser.phone || "Add a phone number"}
              <UilPen className="edit-pen" />
            </Item>
            <Item onClick={() => setIsLocationModalVisible(true)}>
              <UilMapMarker size={25} color="#515151" />
              Location: {currentUser.location || "Add a location"}
              <UilPen className="edit-pen" />
            </Item>
            <Item onClick={() => setIsBirthdayModalVisible(true)}>
              <UilGift size={25} color="#515151" />
              Birthday: {currentUser.birthday || "Add a birthday"}
              <UilPen className="edit-pen" />
            </Item>
            <Item onClick={() => setIsAnniversaryModalVisible(true)}>
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

        {/* Handle Title Editing */}

        {isTitleModalVisible && (
          <GreyBackground onClick={() => setIsTitleModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change Your Title</Title>
                <CloseButton
                  onClick={() => setIsTitleModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="text"
                    name="jobTitle"
                    onChange={handleInputChange}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}

        {/* Handle Email Editing */}

        {isEmailModalVisible && (
          <GreyBackground onClick={() => setIsEmailModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change your Email Address</Title>
                <CloseButton
                  onClick={() => setIsEmailModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    onInvalid={(e) => {
                      e.target.setCustomValidity(
                        "Please enter a valid email address"
                      );
                    }}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}

        {/* Handle Phone Editing */}

        {isPhoneModalVisible && (
          <GreyBackground onClick={() => setIsPhoneModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change your Phone Number</Title>
                <CloseButton
                  onClick={() => setIsPhoneModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleInputChange}
                    pattern="^[0-9-+\s()]*$"
                    onInvalid={(e) => {
                      e.target.setCustomValidity(
                        "Please enter a valid phone number"
                      );
                    }}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}

        {/* Handle Location Editing */}

        {isLocationModalVisible && (
          <GreyBackground onClick={() => setIsLocationModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change your Location</Title>
                <CloseButton
                  onClick={() => setIsLocationModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="text"
                    name="location"
                    onChange={handleInputChange}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}

        {/* Handle Birthday Editing */}

        {isBirthdayModalVisible && (
          <GreyBackground onClick={() => setIsBirthdayModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change your Birthday</Title>
                <CloseButton
                  onClick={() => setIsBirthdayModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="date"
                    name="birthday"
                    onChange={handleInputChange}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}

        {/* Handle Anniversary Editing */}

        {isAnniversaryModalVisible && (
          <GreyBackground onClick={() => setIsAnniversaryModalVisible(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Header>
                <Title>Change your Work Anniversary</Title>
                <CloseButton
                  onClick={() => setIsAnniversaryModalVisible(false)}
                  viewBox="0 0 17 19"
                >
                  <path d="M1 1L16 18M16 1L1 18" stroke="black" />
                </CloseButton>
              </Header>
              <Form onSubmit={handleSubmit}>
                <Section>
                  <input
                    type="date"
                    name="workAnniversary"
                    onChange={handleInputChange}
                    required
                  ></input>
                </Section>
                <button type="submit" value="Submit">
                  Submit
                </button>
              </Form>
            </ModalWrapper>
          </GreyBackground>
        )}
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

/* Here lets create the modals */

const GreyBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
`;

const ModalWrapper = styled.div`
  width: 35%;
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 100000;
  border-radius: 25px;
  box-shadow: 0px 5px 50px 10px rgba(0, 0, 0, 0.45);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  color: #35307e;
`;

const CloseButton = styled.svg.attrs({
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
})`
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    border-radius: 10px;
    width: fit-content;
    border-style: none;
    padding: 10px 15px 10px 15px;
    font-size: medium;
    color: white;
    background-color: #35307e;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
      transform: scale(1.1);
    }
    &:focus {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
      transform: scale(1.1);
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-weight: bolder;
    margin-left: 10px;
  }

  input {
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    border-style: solid;
    border-color: rgb(221, 221, 221);
    border-width: thin;
    padding: 10px 15px 10px 15px;
    font-size: large;
    color: grey;
    transition: 0.3s;

    &:focus {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
      border-color: #35307e;
    }
  }
`;
