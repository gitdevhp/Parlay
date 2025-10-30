import React, { useEffect, forwardRef } from 'react';
import Chart from 'chart.js/auto';

const TrendChart = forwardRef(({ games, player }, ref) => {
  useEffect(() => {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;

    if (ref.current) {
      ref.current.destroy();
    }

    const labels = games.map(game => game.gameDate);
    const hitValues = games.map(game => game.result === 'Hit' ? game.actualValue : null);
    const missValues = games.map(game => game.result === 'Miss' ? game.actualValue : null);
    const propLines = games.map(() => player?.propLine || 25);

    ref.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Hit Props',
            data: hitValues,
            backgroundColor: 'rgba(40, 167, 69, 0.7)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'Missed Props',
            data: missValues,
            backgroundColor: 'rgba(220, 53, 69, 0.7)',
            borderColor: 'rgba(220, 53, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'Prop Line',
            data: propLines,
            type: 'line',
            fill: false,
            borderColor: 'rgba(226, 30, 37, 1)',
            borderWidth: 2,
            pointRadius: 0,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#adb5bd'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#adb5bd'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [games, player, ref]);

  return <canvas id="trendChart"></canvas>;
});

export default TrendChart;