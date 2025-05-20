import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function Deash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const especieQuantidadeStr = sessionStorage.getItem("QuantidadeEspecies");
  const especieQuantidade = especieQuantidadeStr
    ? JSON.parse(especieQuantidadeStr)
    : [];

  const labels = especieQuantidade.map((item) => item.species);
  const data = especieQuantidade.map((item) => item.media);
  const backgroundColors = [
    "rgba(255, 159, 243)",
    "rgba(254, 202, 87)",
    "rgba(75, 192, 192)",
    "rgba(255, 205, 86)",
    "rgba(54, 162, 235)",
    "rgba(104, 159, 56)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
    "rgba(201, 203, 207)",
    "rgba(233, 30, 99)",
  ];

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: ["Peso médio"],
              data,
              fill: false,
              barPercentage: 0.8,
              barThickness: 6,
              borderWidth: 1,
              barThickness: 25,
              backgroundColor: backgroundColors,
              pointBackgroundColor: "rgb(75, 192, 192)",
              pointBorderColor: "rgb(75, 182, 192)",
              pointRadius: 4,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className={styles.container2}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Deash;
