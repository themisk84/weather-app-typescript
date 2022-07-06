import { BrowserRouter, Routes, Route } from "react-router-dom";

import CurrentWeather from "./components/CurrentWeather";
import ErrorMessage from "./components/ErrorMessage";
import GlobalStore from "./components/GlobalStore";
import NavBar from "./components/Navbar";
import WeatherForecast from "./components/WeatherForecast";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <GlobalStore>
        <NavBar />
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/weekly" element={<WeatherForecast />} />
          <Route path="/weekly" element={<ErrorMessage />} />
        </Routes>
      </GlobalStore>
      <WeatherForecast />;
    </BrowserRouter>
  );
};

export default App;
