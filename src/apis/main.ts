import axios from "axios";
import { IWeatherData } from "../interfaces/main";
import { IUserInfo } from "../interfaces/user";

export const getUserInfo = async (): Promise<IUserInfo> => {
  const res = await axios.get("https://ipapi.co/json/");
  console.log(res.data);

  return res.data;
};

export const getCountry = async (country: string) => {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.data;
};

export const getWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.data;
};

export const getDefaultWeather = async (): Promise<{
  weather: IWeatherData;
  user: IUserInfo;
}> => {
  const user = await getUserInfo();
  const country = await getCountry(user.country_name);
  const weather = await getWeather(country[3].lat, country[3].lon);

  return { weather, user };
};
