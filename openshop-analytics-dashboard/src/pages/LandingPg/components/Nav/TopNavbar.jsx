import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import LogoIcon from "../../../../assets/logo.png";
import GovtIcon from "../../../../assets/govt.png";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const loginHandler = () => {
    navigate("/home", { state: { tabIndex: 0 } });
  };

  const signupHandler = () => {
    navigate("/home", { state: { tabIndex: 1 } });
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <img
              src={GovtIcon}
              width="80"
              height="10"
              alt=""
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={LogoIcon} alt="" width="80" height="10" />
          </Link>
          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="home"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="features"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Features
              </Link>
            </li>
            {/* <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="eligibility"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Eligibility Criteria
              </Link>
            </li> */}
            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="about"
                spy={true}
                smooth={true}
                offset={-80}
              >
                About
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Contact
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Button onClick={loginHandler} style={{ marginRight: "15px" }}>
                Log in
              </Button>
            </li>
            <li className="semiBold font15 pointer">
              <GetStartedButton onClick={signupHandler}>
                Get Started
              </GetStartedButton>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  display: flex;
  align-items: center;
  @media (max-width: 760px) {
    display: none;
  }
`;
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  &:hover {
    background-color: #f3f3f3;
    color: #6f42c1;
  }
`;

const GetStartedButton = styled(Button)`
  background-color: #6f42c1;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
  &:hover {
    background-color: #fff;
    color: #6f42c1;
    border: 2px solid #6f42c1;
  }
`;

// Add keyframes for the pulse effect
const keyframes = styled.div`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;