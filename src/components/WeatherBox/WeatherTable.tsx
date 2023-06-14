import { FunctionComponent, useMemo } from "react";
import { IWeatherData } from "../../interfaces/main";
import { toCelsius } from "../../utils/helpers";

interface IHeaders {
  [key: string]: {
    name: string;
    symbol: string;
    temp?: boolean;
  };
}

interface IItem {
  value: number;
  key: string;
  symbol: string;
  temp: boolean;
}

const headers: IHeaders = {
  humidity: {
    name: "Humidity",
    symbol: "%",
  },
  pressure: {
    name: "Pressure",
    symbol: "hPa",
  },
  temp_max: {
    name: "Temp max",
    symbol: "℃",
    temp: true,
  },
  temp_min: {
    name: "Temp min",
    symbol: "℃",
    temp: true,
  },
};

const WeatherTable: FunctionComponent<{
  weather: IWeatherData | undefined;
}> = ({ weather }) => {
  const tableData = useMemo(() => {
    if (weather) {
      return Object.entries(weather?.main)
        .map(([key, item]) => {
          if (key !== "temp" && key !== "feels_like")
            return {
              value: item,
              key: headers[key]?.name,
              symbol: headers[key]?.symbol,
              temp: headers[key]?.temp || false,
            };
        })
        .slice(2, 6);
    } else {
      return [];
    }
  }, [weather]);

  return (
    <div className="flex flex-col mt-7 mb-4 border-[1px] border-[#7e7e7e] mx-4">
      <>
        {tableData.map((item: IItem | undefined, index: number) => (
          <div
            className={`flex border-b-[#7e7e7e] font-medium ${
              index + 1 < tableData.length ? "border-[1px]" : ""
            }`}
            key={index}
          >
            <div className="w-[50%] text-center border-r-[1px] border-[#7e7e7e] py-[2px] font-medium">
              {item?.key}
            </div>
            <div className="w-[50%] text-center py-[2px]">
              {item?.temp ? toCelsius(item?.value) : item?.value}
              {item?.symbol}
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default WeatherTable;
