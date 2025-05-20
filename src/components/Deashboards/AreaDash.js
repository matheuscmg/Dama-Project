import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function AreaDash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const especieQuantidadeStr = sessionStorage.getItem("QuantidadeEspecies");
    const especieQuantidade = especieQuantidadeStr ? JSON.parse(especieQuantidadeStr) : [];
    const animais = JSON.parse(sessionStorage.getItem("QuantidadeAnimais"));
    const limitedEspecies = especieQuantidade.slice(0, 10);

    const maxEspecie = limitedEspecies.map(() => animais); // Supondo que 191 é o total de espécies
    const labels = limitedEspecies.map((item) => item.species);
    const data = limitedEspecies.map((item) => item.quantidade);

    const yAxis1Max = Math.ceil(Math.max(...data) * 1.7);

    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Animais por espécie",
              data: data,
              yAxisID: 'yAxis1',
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192)",
              pointRadius: 4,
              tension: 0.1,
            },
            {
              label: "Total de animais",
              data: maxEspecie,
              yAxisID: 'yAxis2',
              fill: false,
              borderColor: "rgb(192, 75, 75)",
              backgroundColor: "rgb(192, 75, 75)",
              pointBackgroundColor: "rgb(192, 75, 75)",
              pointBorderColor: "rgb(192, 65, 75)",
              pointRadius: 4,
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            yAxis1: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true,
              max: yAxis1Max, 
            },
            yAxis2: {
              type: 'linear',
              display: true,
              position: 'right',
              beginAtZero: true,
              // this will adjust the stepSize as needed to ensure the data fits well
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default AreaDash;
