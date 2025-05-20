import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function MixDeash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const localRef = parseInt(sessionStorage.getItem('QuantidadeReferencia'));
  const ptnColeta = parseInt(sessionStorage.getItem('QuantidadePontoColeta'));
  const amostra = parseInt(sessionStorage.getItem('QuantidadeAmostra'));
  const detalhes = parseInt(sessionStorage.getItem('QuantidadeDetalhes'));
  const animais = parseInt(sessionStorage.getItem('QuantidadeAnimais'));

  const backgroundColors = [
    "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",  
          "rgb(201, 203, 207)",

  ];

  useEffect(() => {
    const maxValue = Math.max(localRef, ptnColeta, amostra, detalhes);
    const yAxisMax =Math.ceil(maxValue + (maxValue * 0.4)); // Aumenta o máximo em 20%

    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Dados do monitoramento',
            data: [localRef, ptnColeta, amostra, detalhes],
            backgroundColor: backgroundColors,
            order: 2
          }],
          labels: ['Locais de Referencia', 'Pontos de Coleta', 'Amostras', 'Detalhes de amostra']
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: yAxisMax
            }
          }
        }
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default MixDeash;
