import { FunctionComponent, useCallback } from "react";
import { useAppMutation } from "../hooks/useAppMutation";
import { IUserInfo } from "../interfaces/user";
import { IWeatherData } from "../interfaces/main";
import { toCelsius } from "../utils/helpers";
import WheatherImg from "./WheatherImg";
import useAppQuery from "../hooks/useAppQuery";
import Loading from "./UI/Loading";
import SunRiseSet from "./SunRiseSet";
import moment from "moment-timezone";
import WeatherTable from "./WeatherBox/WeatherTable";

const UserWeather: FunctionComponent = () => {
  const jun = moment(Date.now());
  const { isLoading: userLoading, data: user } = useAppQuery(
    "https://ipapi.co/json/",
    "get",
    {
      onSuccess(data: IUserInfo) {
        getWeather({
          url: `https://api.openweathermap.org/data/2.5/weather?q=${
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
    "https://api.openweathermap.org/data/2.5/weather?q=city&appid=",
    "get"
  );

  const loading = useCallback(() => {
    return !(userLoading || weatherLoading);
  }, [userLoading, weatherLoading]);

  return (
    <div className="box">
      <h1 className="text-3xl font-geologica bg-[#7AA874] p-3">
        {loading() ? (
          <>
            <span className="font-light text-white">Your Location: </span>
            <span className="text-white">
              {user?.city} {user?.country_name}
            </span>
          </>
        ) : (
          "Loading..."
        )}
      </h1>
      <div>
        {loading() ? (
          <div className="p-3">
            <div className="flex justify-between px-4 items-center">
              <h1 className="text-3xl">Current weather</h1>
              <span className="text-xl font-medium">
                {user && jun.tz(user?.timezone).format("h:mm A")}
              </span>
            </div>
            <div className="flex justify-between md:flex-row flex-col">
              <div className="flex items-start gap-3 px-4 pt-6">
                <WheatherImg img={weather?.weather[0]?.main || ""} />
                <div className="flex flex-col text-[#2e2e2e]">
                  <h3 className="text-5xl">
                    {toCelsius(weather?.main?.temp || 0)}℃
                  </h3>
                  <h3 className="text-xl">{weather?.weather[0]?.main}</h3>
                </div>
              </div>
              <div className="flex flex-col pr-4 pt-3">
                <div className="text-xl p-3 gradient rounded-xl">
                  <span className="text-white">Feels like: </span>
                  <span className="font-semibold text-white">
                    {toCelsius(weather?.main?.feels_like)}℃
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl">Wind</span>
                  <div className="flex">
                    <span className="text-sm text-medium mt-[2px] flex items-center mr-1">
                      <span className="font-semibold mr-[2px]">Speed: </span>
                      {weather?.wind?.speed}m/s
                    </span>
                    <span className="text-sm text-medium flex items-center">
                      <span className="font-semibold mr-[2px]">Deg: </span>
                      {Math.floor(weather?.wind?.deg * 0.017453292519943295)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <WeatherTable weather={weather} />
            <div className="flex justify-center">
              <SunRiseSet
                rise={weather?.sys?.sunrise}
                set={weather?.sys?.sunset}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWeather;
