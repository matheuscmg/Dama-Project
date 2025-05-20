import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function BubleDash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

    const macho = parseInt(sessionStorage.getItem('QuantidadeMacho'));
    const femea = parseInt(sessionStorage.getItem('QuantidadeFemea'));

  const data = {
    labels: [
      'Macho',
      'Fêmea',   
    ],
    datasets: [{
      label: 'Quantidade animais',
      data: [ macho,femea],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
       
      ],
      hoverOffset: 4
    }]
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "doughnut",
        data: data, // Remova as chaves aqui para passar o objeto diretamente
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default BubleDash;
