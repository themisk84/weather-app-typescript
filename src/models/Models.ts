export interface Parameters {
  name: string;
  unit: string;
  value: number[];
}

export interface Forecast {
  forecast: TimeSeries[];
}
export interface TimeSeries {
  time: string;
  parameters: Parameters[];
}

export enum Actions {
  SET_FORECAST = "SET_FORECAST",
}

export interface ForecastAction {
  type: Actions;
  payload: TimeSeries[];
}
