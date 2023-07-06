import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js';

const OverviewChart = ({ view, data }) => {
  const [chartData, setChartData] = useState({});
  const[chartOptions,setChartOption] = useState({})
  ChartJs.register(CategoryScale, LinearScale, PointElement, ArcElement);

 ;

  useEffect(async() => {
    if (data) {
      const formattedData = {
        labels: data && data[0]?.monthlyData.map((element) => element.month),
        datasets: [
          {
            label: view === 'sales' ? 'Total Sales' : 'Total Units',
            data: data[0]?.monthlyData.map((element) => (view === 'sales' ? element.totalSales : element.totalUnits)),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      };

      await setChartData(formattedData);
      if(data)
      { const chartoptions = {
    scales: {
      x: {
        borderColor: 'rgba(255, 99, 132, 1)',
        type: 'category',
        labels: data && data[0]?.monthlyData.map((element) => element.month),
      },
      y: {
        beginAtZero: true,
      },
    },
  }
  setChartOption(chartoptions)
      console.log(chartOptions)
    }}
  }, [data, view]);
 

  

  return (
    <div>
        <p>{data[0].yearlySalesTotal}</p>
        <p>{view}</p>
      { data &&data.length>0&&<Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default OverviewChart;
