import { getAuth } from "firebase/auth";
import { useState } from "react";
import Modal from "../../Modals/NewTaskModal";

import styled from "styled-components";

const TopMenuWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 30px;
    right: 60px;
    top: 12px;
`

const TaskButton = styled.div`
    padding: 10px 15px 10px 15px;
    color:white;
    background-color: #35307E;
    border-radius: 100px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.15);
    }
`

const MenuIcon = styled.svg.attrs({
    width: "24",
    height: "24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
})`
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: 0.3s;

    &:hover {
        transform: scale(1.1);
        path {
            fill: #FF0ABA;
        }
    }

    path {
        fill: #929292;
    }
`

export default function TopMenu(props) {

    const [openModal, setOpenModal] = useState(false);

    return (
        <TopMenuWrapper>
            {props.projectId && (
                <TaskButton onClick={ () => {setOpenModal(!openModal)} }>
                    Add new Task to Backlog
                </TaskButton>
            )}

            <MenuIcon viewBox="0 0 24 24" >
                <path d="M20.61 19.19C21.2367 18.3499 21.6668 17.3799 21.8685 16.3514C22.0702 15.3229 22.0383 14.2623 21.7753 13.2478C21.5123 12.2332 21.0249 11.2907 20.349 10.4897C19.673 9.68877 18.8259 9.0498 17.87 8.61999C17.6618 7.42209 17.1833 6.28741 16.4708 5.30216C15.7584 4.31691 14.8307 3.50702 13.7583 2.93402C12.686 2.36102 11.4971 2.04 10.282 1.99533C9.06701 1.95066 7.85778 2.18354 6.74623 2.67625C5.63468 3.16897 4.65006 3.90857 3.86719 4.83884C3.08431 5.76912 2.52378 6.86561 2.22818 8.04499C1.93259 9.22437 1.9097 10.4556 2.16127 11.6452C2.41283 12.8347 2.93223 13.9513 3.67999 14.91L2.28999 16.29C2.15123 16.4306 2.05724 16.6092 2.01986 16.8032C1.98249 16.9972 2.00341 17.1979 2.07999 17.38C2.15501 17.5626 2.28241 17.7189 2.44613 17.8293C2.60985 17.9396 2.80257 17.999 2.99999 18H8.68999C9.25664 19.1946 10.15 20.2043 11.2667 20.9122C12.3834 21.6201 13.6778 21.9972 15 22H21C21.1974 21.999 21.3901 21.9396 21.5539 21.8293C21.7176 21.7189 21.845 21.5626 21.92 21.38C21.9966 21.1979 22.0175 20.9972 21.9801 20.8032C21.9427 20.6092 21.8487 20.4306 21.71 20.29L20.61 19.19ZM7.99999 15C8.00136 15.3349 8.02811 15.6692 8.07999 16H5.40999L5.75999 15.66C5.85372 15.567 5.92811 15.4564 5.97888 15.3346C6.02965 15.2127 6.05579 15.082 6.05579 14.95C6.05579 14.818 6.02965 14.6873 5.97888 14.5654C5.92811 14.4436 5.85372 14.333 5.75999 14.24C5.19955 13.6857 4.75524 13.0252 4.45304 12.2972C4.15085 11.5692 3.99683 10.7882 3.99999 9.99999C3.99999 8.40869 4.63213 6.88257 5.75735 5.75735C6.88257 4.63213 8.40869 3.99999 9.99999 3.99999C11.2417 3.99253 12.4545 4.37438 13.4679 5.09186C14.4814 5.80934 15.2445 6.82637 15.65 7.99999C15.43 7.99999 15.22 7.99999 15 7.99999C13.1435 7.99999 11.363 8.73749 10.0502 10.0502C8.73749 11.363 7.99999 13.1435 7.99999 15ZM18.54 20L18.59 20.05H15C13.8433 20.0479 12.7232 19.6449 11.8303 18.9096C10.9375 18.1743 10.3272 17.1521 10.1034 16.0173C9.87961 14.8825 10.0562 13.7052 10.6031 12.686C11.1499 11.6668 12.0333 10.8687 13.1025 10.4277C14.1718 9.98669 15.361 9.93005 16.4673 10.2674C17.5737 10.6048 18.5289 11.3153 19.1701 12.2779C19.8114 13.2406 20.0991 14.3957 19.9842 15.5467C19.8693 16.6976 19.3589 17.7731 18.54 18.59C18.3516 18.7746 18.2437 19.0262 18.24 19.29C18.2405 19.4223 18.2673 19.5532 18.3188 19.6751C18.3703 19.7969 18.4455 19.9074 18.54 20Z"/>
            </MenuIcon>


            <MenuIcon viewBox="0 0 24 24" onClick={() => getAuth().signOut()}>
              <path d="M4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H12.59L10.29 15.29C10.1963 15.383 10.1219 15.4936 10.0711 15.6154C10.0203 15.7373 9.9942 15.868 9.9942 16C9.9942 16.132 10.0203 16.2627 10.0711 16.3846C10.1219 16.5064 10.1963 16.617 10.29 16.71C10.383 16.8037 10.4936 16.8781 10.6154 16.9289C10.7373 16.9797 10.868 17.0058 11 17.0058C11.132 17.0058 11.2627 16.9797 11.3846 16.9289C11.5064 16.8781 11.617 16.8037 11.71 16.71L15.71 12.71C15.801 12.6149 15.8724 12.5028 15.92 12.38C16.02 12.1365 16.02 11.8635 15.92 11.62C15.8724 11.4972 15.801 11.3851 15.71 11.29L11.71 7.29C11.6168 7.19676 11.5061 7.1228 11.3842 7.07234C11.2624 7.02188 11.1319 6.99591 11 6.99591C10.8681 6.99591 10.7376 7.02188 10.6158 7.07234C10.4939 7.1228 10.3832 7.19676 10.29 7.29C10.1968 7.38324 10.1228 7.49393 10.0723 7.61575C10.0219 7.73757 9.99591 7.86814 9.99591 8C9.99591 8.13186 10.0219 8.26243 10.0723 8.38425C10.1228 8.50607 10.1968 8.61676 10.29 8.71L12.59 11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12ZM17 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9C5.26522 9 5.51957 8.89464 5.70711 8.70711C5.89464 8.51957 6 8.26522 6 8V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H17C17.2652 4 17.5196 4.10536 17.7071 4.29289C17.8946 4.48043 18 4.73478 18 5V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V16C6 15.7348 5.89464 15.4804 5.70711 15.2929C5.51957 15.1054 5.26522 15 5 15C4.73478 15 4.48043 15.1054 4.29289 15.2929C4.10536 15.4804 4 15.7348 4 16V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V5C20 4.20435 19.6839 3.44129 19.1213 2.87868C18.5587 2.31607 17.7956 2 17 2Z" />
            </MenuIcon> 

            {openModal && <Modal closeModal={setOpenModal} projectId={props.projectId} />}
        </TopMenuWrapper>
    )
}
