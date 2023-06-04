import { FC } from "react";
import useAppQuery from "../../hooks/useAppQuery";
import { IUserInfo } from "../../interfaces/user";
import { IWeatherData } from "../../interfaces/main";
import { useAppMutation } from "../../hooks/useAppMutation";

const HomePage: FC = () => {
  const {} = useAppQuery("https://ipapi.co/json/", "get", {
    onSuccess(data: IUserInfo) {
      mutate({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${
          data.country_name
        }&appid=${import.meta.env.VITE_API_KEY}`,
      });
    },
  });

  const { mutate } = useAppMutation<IWeatherData>(
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=",
    "get"
  );

  return (
    <div className="py-3">
      <div className="container">
        <div className="box ">
          <h1 className="text-3xl font-geologica text-[#2e2e2e]">
            Your Location
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
