import { Box, Typography, useTheme } from "@material-ui/core";
import React, { useContext } from "react";
import ApexCharts from "../../../globalComponents/charts";
import { InlineStylecDiv } from "components/globalComponents/InlineStyledCommonComponents";
import AppContextBase from "Base/appContext";

const CategoryDonutChart = ({
  graphData= {},
}) => {
  const { 
    userMetaData, 
    userUtils 
  } = useContext(AppContextBase);
  const theme = useTheme();
  const labels =  Object.keys(graphData || {}).length ? Object.keys(graphData).map(key => {
    return userMetaData.category_choices[key] || 'Unknown'
  }) : Object.values(userMetaData.category_choices);
  const chartData = Object.values(graphData).length ? Object.values(graphData).map(key => key) : [0,0,0,0];

  const donutChartOptions = {
    labels: labels,
    colors: labels,
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ['rgb(255, 69, 96)', 'rgb(0, 216, 182)', 'rgb(0, 143, 251)', 'rgb(254, 176, 25)', '#4CB140', '#5752D1', '#009596']
    },
    tooltip: {
      enabled: true,
      theme: "dark",
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
        Expense by Category
      </InlineStylecDiv>
      <Box
        style={{ height: "250px" }}
        minH="400px"
        minW="75%"
        mt="auto"
      >
        <ApexCharts.DonutChart
          height="100%"
          width="100%"
          chartData={chartData}
          chartOptions={donutChartOptions}
        />
      </Box>
    </>
  );
};

export default CategoryDonutChart;
