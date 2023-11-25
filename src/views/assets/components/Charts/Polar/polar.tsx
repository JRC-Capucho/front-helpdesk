import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

const Polarchart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      theme: {
        mode: "dark",
        palette: "palette2ss",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      chart: {
        type: "polarArea",
        width: "500px",
        height: "100%",
        background: "transparent",
      },
      stroke: {
        colors: ["#fff"],
      },
      series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
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

export default Polarchart;
