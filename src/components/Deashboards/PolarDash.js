import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function PolarDash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "polarArea",
        data: data,
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default PolarDash;
