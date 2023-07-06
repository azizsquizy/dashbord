import { fetchOverAllStats } from 'calls';
import React, { useState, useEffect } from 'react';
import './Overview.css'
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js/auto';
Chart.register(CategoryScale, LinearScale, PointElement, ArcElement);

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [view, setView] = useState("sales");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchOverAllStats();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = {
        labels: data[0]?.monthlyData.map((element) => element.month),
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

      console.log('Formatted Data:', formattedData);

      setChartData(formattedData);
    }
  }, [data, view]);

  useEffect(() => {
    const chartOptions = {
      scales: {
        x: {
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'category',
          labels: data && data.length > 0 ? data[0]?.monthlyData.map((element) => element.month) : [],
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    console.log('Chart Options:', chartOptions);

    setChartOptions(chartOptions);
  }, [data]);

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  return (
    <div className='overview'>
        <h2>Welcome to Overview Dashboard</h2>
      <div className='chart'>
        <div className='form-control'>
          <h3>Choose the View</h3>
          <select value={view} onChange={handleViewChange}>
            <option value="sales">Sales</option>
            <option value="units">Units</option>
          </select>
        </div>
        {data && data.length > 0 && chartData && Object.keys(chartData).length > 0 && (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default Overview;
