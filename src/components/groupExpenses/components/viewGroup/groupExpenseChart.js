import { Box, Typography, useTheme } from "@material-ui/core";
import React, { useContext } from "react";
import ApexCharts from "../../../globalComponents/charts";
import { InlineStylecDiv } from "components/globalComponents/InlineStyledCommonComponents";
import AppContextBase from "Base/appContext";
import { MONTHS_ENUM } from "global/constants";

const GroupExpenseChart = ({
  graphData = {},
}) => {
  const theme = useTheme();
  const { 
    userMetaData, 
    userUtils 
  } = useContext(AppContextBase);
  const xAxisLabels = Object.keys(graphData).map(key => {
    return MONTHS_ENUM[key]?.title || 'Unknown'
  });
  const chartData = Object.values(graphData).map(key => key)

  const lineChartDataTotalSpent = [
    {
      name: "Total Spent",
      data: chartData,
    },
  ];

  const lineChartOptionsTotalSpent = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: [theme.moduleColurs.globalcolor],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
    //   theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: xAxisLabels,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      type: "numeric",
      show: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
  };

  return (
    <>
      <InlineStylecDiv
        color={theme.moduleColurs.globalcolor}
        fontSize="1.2rem"
        fontWeight="700"
        //   lineHeight='100%'
      >
        Monthly Expenses
      </InlineStylecDiv>
      <Box style={{ minHeight:"250px" }} minH="400px" minW="75%" mt="auto">
        <ApexCharts.LineChart
          chartData={lineChartDataTotalSpent}
          chartOptions={lineChartOptionsTotalSpent}
        />
      </Box>
    </>
  );
};

export default GroupExpenseChart;
