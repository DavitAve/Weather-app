import { FC } from "react";
import UserWeather from "../UserWeather";
import WeatherStatistic from "../WeatherStatistic";

const HomePage: FC = () => {
  return (
    <div className="py-3">
      <div className="container">
        <UserWeather />
        <WeatherStatistic />
      </div>
    </div>
  );
};

export default HomePage;
