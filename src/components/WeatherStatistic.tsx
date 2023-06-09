import { FunctionComponent, useState } from "react";
import useAppQuery from "../hooks/useAppQuery";
import ReactApexChart from "react-apexcharts";
import { IWeatherFiveData } from "../interfaces/weather";
import { toCelsius } from "../utils/helpers";
import moment from "moment";

interface IChart {
  series: ApexAxisChartSeries;
  options: ApexCharts.ApexOptions | undefined;
}

const WeatherStatistic: FunctionComponent = () => {
  const { data } = useAppQuery<IWeatherFiveData>(
    `https://api.openweathermap.org/data/2.5/forecast?q=Yerevan&appid=${
      import.meta.env.VITE_API_KEY
    }`,
    "get"
  );

  const chart: IChart = {
    series: [
      {
        name: "Weather",
        data:
          data?.list.map((item) => toCelsius(item.main.temp)).slice(0, 20) ||
          [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
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
      },
      legend: {
        tooltipHoverFormatter: function (val: any, opts: any) {
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
        categories:
          data?.list
            .map((item) => moment(item.dt_txt).format("LT"))
            .slice(0, 20) || [],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: any) {
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

  console.log(chart.series);

  return (
    <div className="box mt-8 p-4 bg-[#]">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default WeatherStatistic;
