import { FC } from "react";
import UserWeather from "../UserWeather";
import CustomWeather from "../CustomWeather";
import { IWeatherData } from "../../interfaces/main";
import useAppQuery from "../../hooks/useAppQuery";
import { ICountryData } from "../../interfaces/country";
import { IWeatherFiveData } from "../../interfaces/weather";

const HomePage: FC = () => {
  const { data: weather, isLoading } = useAppQuery<IWeatherData>("navWeather");
  const { data: country } = useAppQuery<ICountryData>("navCountry");
  const { data: weatherFive, isLoading: loadingF } =
    useAppQuery<IWeatherFiveData>("navWeatherFive");

  return (
    <div className="py-3">
      <div className="container flex flex-col gap-6">
        {weather && (
          <CustomWeather
            weather={weather}
            weatherFive={weatherFive}
            loading={isLoading || loadingF}
            country={country}
          />
        )}
        <UserWeather />
      </div>
    </div>
  );
};

export default HomePage;
