import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

const TimelineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        theme: {
          mode: "dark",
          palette: "palette2",
          String: "dark",
          monochrome: {
            enabled: false,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
        series: [
          {
            name: "Website Blog",
            type: "column",
            data: [567, 22, 111, 445, 227, 413, 7, 352, 896, 320, 675, 160],
          },
          {
            name: "Social Media",
            type: "line",
            data: [23, 11, 22, 27, 43, 22, 17, 11, 22, 1, 12, 16],
          },
        ],
        chart: {
          width: "500px",
          height: "100%",
          type: "line",
          background: "transparent",
        },
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Traffic Sources",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: [
          "01 Jun 2005",
          "02 Jun 2005",
          "03 Jun 2005",
          "04 Jun 2005",
          "05 Jun 2005",
          "06 Jun 2005",
          "07 Jun 2005",
          "08 Jun 2005",
          "09 Jun 2005",
          "10 Jun 2005",
          "11 Jun 2005",
          "12 Jun 2005",
        ],
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          {
            title: {
              text: "Website Blog",
            },
          },
          {
            opposite: true,
            title: {
              text: "Social Media",
            },
          },
        ],
      };
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy(); // Destruir o gráfico ao desmontar o componente
      };
    }
  }, []);

  return <div id="chart" ref={chartRef} />;
};

export default TimelineChart;
