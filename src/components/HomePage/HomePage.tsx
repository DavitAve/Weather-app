import { FC } from "react";
import useAppQuery from "../../hooks/useAppQuery";
import { IUserInfo } from "../../interfaces/user";
import { IWeatherData } from "../../interfaces/main";
import { useAppMutation } from "../../hooks/useAppMutation";
import Loading from "../UI/Loading";
import { ILocation } from "../../interfaces/country";
import { toCelsius } from "../../utils/helpers";
import WheatherImg from "../WheatherImg";
import { IWeatherImg, weatherImgs } from "../../utils/constants";

const HomePage: FC = () => {
  const { isLoading: userLoading, data: user } = useAppQuery(
    "https://ipapi.co/json/",
    "get",
    {
      onSuccess(data: IUserInfo) {
        getCountry({
          url: `http://api.openweathermap.org/geo/1.0/direct?q=${
            data.country_name
          }&limit=5&appid=${import.meta.env.VITE_API_KEY}`,
        });
      },
    }
  );
  const {
    mutate,
    data: weather,
    isLoading: weatherLoading,
  } = useAppMutation<IWeatherData>(
    "https://api.openweathermap.org/data/2.5/weather?q=&appid=",
    "get"
  );
  const { mutate: getCountry, isLoading: countryLoading } = useAppMutation<
    ILocation[]
  >(
    "http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid",
    "get",
    {
      onSuccess(data) {
        mutate({
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${
            data[0].lat
          }&lon=${data[0].lon}&appid=${import.meta.env.VITE_API_KEY}`,
        });
      },
    }
  );

  const loading = () => {
    return !(userLoading || weatherLoading || countryLoading);
  };

  return (
    <div className="py-3">
      <div className="container">
        <div className="box">
          <h1 className="text-3xl font-geologica text-[#fff] bg-[#7AA874] p-3">
            {loading() ? `Your Location ${user?.country_name}` : "Loading..."}
          </h1>
          <div>
            {loading() ? (
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <WheatherImg
                    img={
                      weatherImgs[
                        weather?.weather[0]?.main?.toLowerCase() as keyof IWeatherImg
                      ]
                    }
                  />
                  <div className="flex flex-col font-semibold text-[#2e2e2e]">
                    <h3 className="text-3xl">{weather?.weather[0]?.main}</h3>
                    <h3 className="text-xl">
                      {toCelsius(weather?.main?.temp || 0)}℃
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
