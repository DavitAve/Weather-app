import { FunctionComponent } from "react";
import ReactApexChart from "react-apexcharts";
import { IWeatherFiveData } from "../interfaces/weather";
import { toCelsius } from "../utils/helpers";
import moment from "moment";
import Loading from "./UI/Loading";

interface IChart {
  series: ApexAxisChartSeries;
  options: ApexCharts.ApexOptions | undefined;
}

interface IWeatherStatProps {
  weather: IWeatherFiveData;
  loading: boolean;
}

const WeatherStatistic: FunctionComponent<IWeatherStatProps> = ({
  weather,
  loading,
}) => {
  const chart: IChart = {
    series: [
      {
        name: "Weather",
        data:
          weather?.list.map((item) => ({
            x: moment(item.dt_txt).valueOf(),
            y: toCelsius(item.main.temp),
          })) || [],
      },
    ],
    options: {
      chart: {
        height: 350,
        offsetY: 10,
        type: "line",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          offsetY: 5,
          autoSelected: "zoom",
        },
      },
      colors: ["#7AA874"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "5 day weather forecast",
        align: "left",
        offsetY: -8,
        style: {
          fontSize: "18px",
          fontWeight: "semibold",
          fontFamily: "Geologica",
          color: "#fff",
        },
      },
      legend: {
        tooltipHoverFormatter: function (val: string, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 5,
        hover: {
          sizeOffset: 2,
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: string) {
                return val + "(℃)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#d3d3d3",
      },
    },
  };

  return (
    <div className="box mt-8  bg-[#] relative">
      <div className="h-12 w-full bg-[#7AA874] absolute">
        {loading && (
          <h1 className="text-center text-3xl text-white mt-1">Loading</h1>
        )}
      </div>
      <div className="px-4 py-2">
        {loading ? (
          <div className="pt-14 pb-5 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="line"
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherStatistic;
