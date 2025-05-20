import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import styles from "./Deashboards.module.css";

function BarDeash() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const backgroundColors = [
    'rgba(255, 159, 243)',
    'rgba(254, 202, 87)', 
    'rgba(75, 192, 192)', 
    'rgba(255, 205, 86)', 
    'rgba(54, 162, 235)', 
    'rgba(104, 159, 56)', 
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',  
    'rgba(201, 203, 207)', 
    'rgba(233, 30, 99)',   
  ];

  useEffect(() => {
    const especieQuantidadeStr = sessionStorage.getItem('QuantidadeEspecies');
    const especieQuantidade = especieQuantidadeStr ? JSON.parse(especieQuantidadeStr) : [];

    // Se não houver dados, não continuar.
    if (!especieQuantidade.length) {
      console.log('Nenhuma espécie encontrada.');
      return;
    }

    const limitedEspecies = especieQuantidade.slice(0, 10);

    
    // Mapear para criar os arrays de labels e data
    const labels = limitedEspecies.map(item => item.species);
    const data = limitedEspecies.map(item => item.quantidade);
    

    // Encontrar o valor máximo para o eixo Y
    const yAxisMax = Math.ceil(Math.max(...data) * 1.2); // Aumenta o máximo em 20%

    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Quantidade por espécie",
            data,
            fill: false,
            barPercentage: 0.5,
            barThickness: 6,
            borderWidth: 1,
            barThickness: 25,
            backgroundColor: backgroundColors,
            pointBackgroundColor: "rgb(75, 192, 192)",
            pointBorderColor: "rgb(75, 182, 192)",
            pointRadius: 4,
            tension: 0.1,
          }],
        },
        options: {
          scales: {
            x: {
              barPercentage: 1,
              categoryPercentage: 1 
            },
            y: {
              beginAtZero: true,
              max: yAxisMax
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

export default BarDeash;
