import { Actions, ForecastAction, Forecast } from "../models/Models";

const Reducer = (state: Forecast, action: ForecastAction) => {
  const { type } = action;
  switch (type) {
    case Actions.SET_FORECAST:
      return {
        ...state,
        forecast: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
