import { FunctionComponent } from "react";
import moment from "moment";
import { IWeatherData } from "../interfaces/main";
import WeatherBox from "./WeatherBox/WeatherBox";
import { ICountryData } from "../interfaces/country";
import { IWeatherFiveData } from "../interfaces/weather";
import WeatherStatistic from "./WeatherStatistic";

interface ICustomWProps {
  weather: IWeatherData;
  weatherFive?: IWeatherFiveData | undefined;
  country: ICountryData | undefined;
  loading: boolean;
}

function convertTimezoneFormat(timezone: string) {
  const offset = moment().utcOffset(timezone);
  const formattedDate = offset.format("hh:mm A");

  return formattedDate;
}

const CustomWeather: FunctionComponent<ICustomWProps> = ({
  weather,
  weatherFive,
  country,
  loading,
}) => {
  return (
    <>
      <WeatherBox
        title="Location"
        className="mb-6"
        weather={weather}
        location={{
          country_name: weather.name,
          timezoneValue: convertTimezoneFormat(country?.timezones[0] || ""),
        }}
        loading={loading}
      />
      <WeatherStatistic weather={weatherFive} loading={loading} />
    </>
  );
};

export default CustomWeather;
