import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

const Donutchart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      theme: {
        mode: "dark",
        palette: "palette2",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      chart: {
        type: "radialBar",
        width: "500px",
        height: "100%",
        background: "transparent",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3,
        },
      },
      series: [44, 55, 67, 83],
      labels: ["Team A", "Team B", "Team C", "Team D"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);

      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return <div id="chart" ref={chartRef} />;
};

export default Donutchart;
