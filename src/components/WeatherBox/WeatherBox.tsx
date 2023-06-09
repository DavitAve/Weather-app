import { FunctionComponent } from "react";
import { toCelsius } from "../../utils/helpers";
import WheatherImg from "../WheatherImg";
import { IWeatherData } from "../../interfaces/main";
import WeatherTable from "./WeatherTable";
import SunRiseSet from "../SunRiseSet";
import Loading from "../UI/Loading";
import moment from "moment-timezone";

interface IWeatherBoxProps {
  loading: boolean;
  weather: IWeatherData | undefined;
  location:
    | {
        timezone?: string;
        timezoneValue?: string;
        country_name?: string;
        city?: string;
      }
    | undefined;
  title?: string;
  className?: string;
}

const WeatherBox: FunctionComponent<IWeatherBoxProps> = ({
  loading,
  weather,
  location,
  title,
  className = "",
}) => {
  const jun = moment(Date.now());

  return (
    <div className={`box ${className}`}>
      <h1 className="text-3xl font-geologica bg-[#7AA874] p-3">
        {!loading ? (
          <>
            <span className="font-light text-white">
              {(title || "Your Location") + ": "}
            </span>
            <span className="text-white">
              {location?.city || ""} {location?.country_name}
            </span>
          </>
        ) : (
          <p className="text-center text-white">Loading</p>
        )}
      </h1>
      <div>
        {!loading ? (
          <div className="p-3">
            <div className="flex justify-between px-4 items-center">
              <h1 className="text-3xl">Current weather</h1>
              <span className="text-xl font-medium">
                {location &&
                  (location.timezone
                    ? jun.tz(location?.timezone || "")?.format("h:mm A")
                    : location.timezoneValue)}
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
                    {weather && toCelsius(weather?.main?.feels_like)}℃
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
                      {weather &&
                        Math.floor(weather?.wind?.deg * 0.017453292519943295)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <WeatherTable weather={weather} />
            <div className="flex justify-center">
              <SunRiseSet
                rise={weather?.sys?.sunrise || 0}
                set={weather?.sys?.sunset || 0}
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

export default WeatherBox;
