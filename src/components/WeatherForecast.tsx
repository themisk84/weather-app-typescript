import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";

import { TimeSeries } from "../models/Models";

import { Context } from "./GlobalStore";

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

const StyledStar = styled(AiOutlineStar)`
  font-size: 20px;
  position: absolute;
  right: 20px;
`;

const WeatherForecast = (): JSX.Element => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const [state] = useContext(Context);
  const [bookmark, setBookmark] = useState<TimeSeries[]>(bookmarks);

  useEffect((): void => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("bookmark");
      if (storage) {
        setBookmark(JSON.parse(storage));
      }
    }
  }, []);

  const changeBookmark = (item: TimeSeries) => {
    if (!item) return;
    if (bookmark.some((forecast) => forecast.time === item.time)) {
      localStorage.removeItem("bookmarks");
      const updated = bookmark.filter((element) => element.time !== item.time);
      setBookmark(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    } else {
      const newBookmarks = [...bookmark, item];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setBookmark(newBookmarks);
    }
  };

  const groupDates = state?.forecast.reduce((groups, day) => {
    const date = day?.time.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(day);
    return groups;
  }, {});

  const groupArrays = Object.keys(groupDates).map((date) => {
    return {
      date,
      days: groupDates[date],
    };
  });

  return (
    <OuterContainer>
      {groupArrays.map((item) => {
        return (
          <>
            <ForecastDayContainer>
              {new Date(item.date).toDateString("en-us", {
                month: "short",
                day: "numeric",
              })}
            </ForecastDayContainer>
            {item.days.map((day) => {
              return (
                <ForecastDayContainer>
                  <ElementSpan>
                    {new Date(day.time).toLocaleTimeString("en-gb", {
                      hour: "2-digit",
                    })}
                  </ElementSpan>
                  {day.parameters.map((parameter: Parameters) => {
                    if (parameter.name === "t") {
                      return (
                        <ElementSpan>
                          {Math.round(parameter.value[0])}&deg;C
                        </ElementSpan>
                      );
                    } else if (parameter.name === "Wsymb2") {
                      return (
                        <IconSpan>
                          {getWeatherCondition(parameter.value[0])}
                        </IconSpan>
                      );
                    } else if (parameter.name === "wd") {
                      return <IconSpan>{getWind(parameter.value[0])}</IconSpan>;
                    } else if (parameter.name === "ws") {
                      return (
                        <ElementSpan>{parameter.value[0]} m/s</ElementSpan>
                      );
                    }
                  })}
                  <StyledStar
                    onClick={() => changeBookmark(day)}
                    style={{
                      color: bookmark.some((item) => item.time === day.time)
                        ? "#ff751a"
                        : "black",
                    }}
                  />
                </ForecastDayContainer>
              );
            })}
          </>
        );
      })}
    </OuterContainer>
  );
};

export default WeatherForecast;
