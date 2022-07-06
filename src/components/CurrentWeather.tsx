import { useEffect, useContext } from "react";
import styled from "styled-components";
import { WiThermometer, WiStrongWind } from "react-icons/wi";

import { LOCAL_HOST } from "../utils/urls";
import { getWeatherCondition, getWind } from "../utils/functions";

import { Actions, Parameters } from "../models/Models";
import { Context } from "./GlobalStore";

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 150px 20px;
  background-color: white;
  height: 150px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 25%;
  padding: 50px 5px 5px 5px;
  border-right: 1px solid #f2f2f2;
`;

const DateHeader = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const ParameterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 20px;
`;

const ParameterInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WindDirectionHeader = styled.h4`
  font-size: 14px;
  font-weight: 300;
`;

const WeatherCondition = styled(ParameterInnerContainer)`
  font-size: 30px;
`;

const ElementSpan = styled.span`
  margin-top: 12px;
  font-size: 30px;
`;

const CurrentWeather = (): JSX.Element => {
  const [state, dispatch] = useContext(Context);

  useEffect((): void => {
    fetch(LOCAL_HOST)
      .then((res) => res.json())
      .then((data) => {
        const forecastData = data;
        dispatch({ type: Actions.SET_FORECAST, payload: forecastData });
      });
  }, [dispatch]);

  return (
    <DayContainer>
      <DateContainer>
        <DateHeader>Date</DateHeader>
        {new Date(state?.forecast[0]?.time).toLocaleDateString("en-us", {
          month: "short",
          day: "numeric",
        })}
      </DateContainer>
      <ParameterContainer>
        {state?.forecast[0]?.parameters.map((parameter: Parameters) => {
          if (parameter.name === "t") {
            return (
              <ParameterInnerContainer>
                <WiThermometer />
                <div>{Math.round(parameter.value[0])}&deg;C</div>
              </ParameterInnerContainer>
            );
          } else if (parameter.name === "Wsymb2") {
            return (
              <WeatherCondition>
                {getWeatherCondition(parameter.value[0])}
              </WeatherCondition>
            );
          } else if (parameter.name === "wd") {
            return (
              <ParameterInnerContainer>
                <WindDirectionHeader>Wind Direction:</WindDirectionHeader>
                <ElementSpan>{getWind(parameter.value[0])}</ElementSpan>
              </ParameterInnerContainer>
            );
          } else if (parameter.name === "ws") {
            return (
              <ParameterInnerContainer>
                <WiStrongWind size={24} />
                <div>{parameter.value[0]} m/s</div>
              </ParameterInnerContainer>
            );
          }
        })}
      </ParameterContainer>
    </DayContainer>
  );
};

export default CurrentWeather;
