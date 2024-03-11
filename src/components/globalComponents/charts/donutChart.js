import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({
  width = "100%",
  height = "100%",
  chartData,
  chartOptions,
}) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="donut"
      width={width || "100%"}
      height={height || "100%"}
    />
  );
};

export default DonutChart;
