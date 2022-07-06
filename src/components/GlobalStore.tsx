import { createContext, useReducer } from "react";
import { ReactNode, ReactElement } from "react";
import Reducer from "./Reducer";
import { Forecast } from "../models/Models";

const initialState: Forecast = { forecast: [] };

const GlobalStore = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext<Forecast>(initialState);
export default GlobalStore;
