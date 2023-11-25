import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

const Barchart: React.FC = () => {
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
        type: "bar",
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
      series: [
        {
          name: "sales",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
      },
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

export default Barchart;
