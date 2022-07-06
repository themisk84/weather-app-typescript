import { Link } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;
const Heading = styled.h1`
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
  color: #ff751a;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ff751a;
  cursor: pointer;
`;

const ErrorMessage = (): JSX.Element => {
  return (
    <Main>
      <StyledLink to="/">Home</StyledLink>
      <Heading>Sorry! something went wrong...</Heading>
    </Main>
  );
};

export default ErrorMessage;
