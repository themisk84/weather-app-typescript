import { useState, useEffect } from "react";
import styled from "styled-components";
import { TimeSeries, Parameters } from "../models/Models";

import { getWeatherCondition, getWind } from "../utils/functions";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const ForecastDayContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
`;

const ElementSpan = styled.span`
  margin-right: 5px;
`;

const IconSpan = styled(ElementSpan)`
  font-size: 25px;
  padding-top: 7px;
`;

const Bookmarked = (): JSX.Element => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "") || {};
  const [bookmark, setBookmark] = useState(bookmarks);

  useEffect((): void => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("bookmark");
      if (storage) {
        setBookmark(JSON.parse(storage));
      }
    }
  }, []);

  return (
    <OuterContainer>
      {bookmark.map((forecastItem: TimeSeries) => {
        return (
          <ForecastDayContainer key={forecastItem.time}>
            <ElementSpan>
              {new Date(forecastItem.time).toLocaleTimeString("en-gb", {
                hour: "2-digit",
              })}
            </ElementSpan>
            {forecastItem.parameters.map((parameter: Parameters) => {
              if (parameter.name === "t") {
                return (
                  <ElementSpan>
                    {Math.round(parameter.value[0])}&deg;C
                  </ElementSpan>
                );
              } else if (parameter.name === "Wsymb2") {
                return (
                  <IconSpan>{getWeatherCondition(parameter.value[0])}</IconSpan>
                );
              } else if (parameter.name === "wd") {
                return <IconSpan>{getWind(parameter.value[0])}</IconSpan>;
              } else if (parameter.name === "ws") {
                return <ElementSpan>{parameter.value[0]} m/s</ElementSpan>;
              }
            })}
          </ForecastDayContainer>
        );
      })}
    </OuterContainer>
  );
};

export default Bookmarked;
