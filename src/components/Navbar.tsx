import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  background-color: black;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

const HamburgerDiv = styled.div`
  width: 30px;
  height: 4px;
  background-color: #ff751a;
  border-radius: 5px;
`;

const StyledHamburger = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1em;
  @media (min-width: 768px) {
    display: none;
  }
`;

const H1 = styled.h1`
  color: white;
  text-align: center;
`;

const MobileNavMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b3b3b3;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  height: 20vh;
`;

const StyledOption = styled.p`
  align-self: flex-end;
  color: #ff751a;
  margin: 10px 20px;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 200px;
    font-size: 18px;
    padding-right: 40px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ff751a;
  cursor: pointer;
`;

const NavBar = (): JSX.Element => {
  const [visible, setVisible] = useState<Boolean>(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showMenu = (): void => {
    setVisible(!visible);
  };

  const clickToWeekly = (): void => {
    navigate("/weekly");
    setVisible(false);
  };

  const clickToHome = (): void => {
    navigate("/");
    setVisible(false);
  };

  const OutsideOfMenu = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  OutsideOfMenu(wrapperRef);

  return (
    <Div>
      <H1>The Royal Palace</H1>
      <StyledHamburger onClick={showMenu}>
        <HamburgerDiv></HamburgerDiv>
        <HamburgerDiv></HamburgerDiv>
        <HamburgerDiv></HamburgerDiv>
      </StyledHamburger>

      {visible && (
        <MobileNavMenu ref={wrapperRef}>
          <StyledOption onClick={clickToHome}>Home</StyledOption>
          <StyledOption onClick={clickToWeekly}>Weekly Forecast</StyledOption>
        </MobileNavMenu>
      )}

      <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/weekly">Weekly Forecast</StyledLink>
      </StyledNav>
    </Div>
  );
};

export default NavBar;
