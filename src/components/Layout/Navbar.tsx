import { FC, useCallback, useState } from "react";
import { useAppMutation } from "../../hooks/useAppMutation";
import { debounce } from "../../utils/helpers";
import AutoComplete from "../UI/AutoComplete";
import { ICountryData } from "../../interfaces/country";
import { IWeatherData } from "../../interfaces/main";
import { queryClient } from "../../main";
import { IWeatherFiveData } from "../../interfaces/weather";

const Navbar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [_, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<
    { label: string; value: string; done?: boolean }[]
  >([]);

  const { mutate: getCountry, data: countriesData } = useAppMutation<
    ICountryData[]
  >("nav", "https://restcountries.com/v3.1/name/Ar?fields=name", "get", {
    onSuccess(data) {
      setCountries(
        data.map((item) => ({
          label: item.name.official,
          value: item.name.common,
        }))
      );
    },
    onError() {
      setCountries([
        {
          label: "Nothing was found",
          value: "Nothing was found",
          done: true,
        },
      ]);
    },
  });

  const { mutate: getWeather } = useAppMutation<IWeatherData>(
    "navWeather",
    "https://api.openweathermap.org/data/2.5/weather?q=city&appid=",
    "get",
    {},
    true
  );

  const { mutate: getWeatherFive } = useAppMutation<IWeatherFiveData>(
    "navWeatherFive",
    "https://api.openweathermap.org/data/2.5/forecast?q=",
    "get",
    {},
    true
  );

  const handleSearch = useCallback((v: string) => {
    getCountry({
      url: `https://restcountries.com/v3.1/name/${v}?fields=name,timezones`,
    });
  }, []);

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    handleSearch,
  ]);

  const handleGetCountry = (item: { value: string; label: string }) => {
    queryClient.setQueriesData(
      "navCountry",
      countriesData.find((el) => el.name.common === item.value)
    );

    setSelectedCountry(item.value);
    setSearchQuery(item.label);
    getWeather({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${
        item.value
      }&appid=${import.meta.env.VITE_API_KEY}`,
    });
    getWeatherFive({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${
        item.value
      }&appid=${import.meta.env.VITE_API_KEY}`,
    });
  };

  return (
    <div className="py-3 bg-[#7AA874] mb-3">
      <div className="container">
        <div className="flex items-center gap-1">
          <h1 className="text-white text-xl">Search</h1>
          <AutoComplete
            options={countries}
            value={searchQuery}
            onSearch={(v) => {
              setSearchQuery(v);
              debouncedSearch(v);
            }}
            onChange={handleGetCountry}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
