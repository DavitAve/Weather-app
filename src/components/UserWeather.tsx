import { FunctionComponent, useCallback } from "react";
import { useAppMutation } from "../hooks/useAppMutation";
import { IUserInfo } from "../interfaces/user";
import { IWeatherData } from "../interfaces/main";
import { IWeatherFiveData } from "../interfaces/weather";
import useAppQuery from "../hooks/useAppQuery";
import WeatherBox from "./WeatherBox/WeatherBox";
import WeatherStatistic from "./WeatherStatistic";

const UserWeather: FunctionComponent = () => {
  const { isLoading: userLoading, data: user } = useAppQuery<IUserInfo>(
    "userInfo",
    "https://ipapi.co/json/",
    "get",
    {
      onSuccess(data: IUserInfo) {
        getWeather({
          url: `https://api.openweathermap.org/data/2.5/weather?q=${
            data.city
          }&appid=${import.meta.env.VITE_API_KEY}`,
        });
        getWeatherFive({
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${
            data.city
          }&appid=${import.meta.env.VITE_API_KEY}`,
        });
      },
    }
  );

  const {
    mutate: getWeather,
    data: weather,
    isLoading: weatherLoading,
  } = useAppMutation<IWeatherData>(
    "userWeather",
    "https://api.openweathermap.org/data/2.5/weather?q=city&appid=",
    "get"
  );

  const {
    mutate: getWeatherFive,
    data: weatherFive,
    isLoading: weatherFiveLoading,
  } = useAppMutation<IWeatherFiveData>(
    "userWeatherFive",
    "https://api.openweathermap.org/data/2.5/weather?q=city&appid=",
    "get"
  );

  const loading = useCallback(() => {
    return userLoading || weatherLoading || weatherFiveLoading;
  }, [userLoading, weatherLoading, weatherFiveLoading]);

  return (
    <>
      <WeatherBox weather={weather} location={user} loading={loading()} />
      <WeatherStatistic weather={weatherFive} loading={loading()} />
    </>
  );
};

export default UserWeather;
