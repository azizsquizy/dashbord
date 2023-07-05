import React, { useEffect, useState } from 'react';
import { fetchOverAllStats } from 'calls';
import "./Dashboard.css";
import { FaEnvelope } from "react-icons/fa";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement,ArcElement } from "chart.js";
import SalesTable from 'components/stats/stats';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({});
  ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchOverAllStats();
        setData(fetchedData);
        console.log(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formattedData = {
      labels: null,
      datasets: [
        {
          label: 'Total Sales',
          data: data && data[0].monthlyData.map((element) => element.totalSales),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    };

    setChartData(formattedData);
    console.log(formattedData);
  }, [data]);

  const chartOptions = {
    scales: {
      x: {
        borderColor: 'rgba(255, 99, 132, 1)',
        type: 'category',
        labels: data && data[0].monthlyData.map((element) => element.month),
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartData = {
    labels: ["shoes","clothing","accessories","misc"],
    datasets: [
      {
        data: [6515,22803,16288,19545],
        backgroundColor: ['#ffda85', '#665429', '#cca752',"#c08a0a"],
        borderWidth: 1,
      },
    ],
  };
  

  return (
    <div className='dashboard-page'>
      <div className='page-title'>
        <h1>Dashboard</h1>
        <h3>Welcome to Your Dashboard</h3>
      </div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : data ? (
        <div className='overall-stats'>
          <div className='overall-stats-containers'>
            <div className='stats-item'>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FaEnvelope size={30} />
                <h4>Total Customers</h4>
              </div>
              <h2>{data[0].totalCustomers}</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>+14%</h4>
                <h4>Since Last Month</h4>
              </div>
            </div>

            <div className='stats-item'>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FaEnvelope size={30} />
                <h4>Sales today</h4>
              </div>
              <h2>{data[0].dailyData[0].totalSales}</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>+14%</h4>
                <h4>Since Last Month</h4>
              </div>
            </div>

            <div className='stats-item'>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FaEnvelope size={30} />
                <h4>Monthly Sales</h4>
              </div>
              <h2>{data[0].monthlyData[0].totalSales}</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>+14%</h4>
                <h4>Since Last Month</h4>
              </div>
            </div>

            <div className='stats-item'>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FaEnvelope size={30} />
                <h4>Yearly Sales</h4>
              </div>
              <h2>{data[0].yearlySalesTotal}</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>+14%</h4>
                <h4>Since Last Month</h4>
              </div>
            </div>
          </div>

          <div className='chart'>
            <Line data={chartData} options={chartOptions} />
         
          </div>

          
        </div>
      ) : null}
      <div className='users'>
        <div className='user-sales'>
          <SalesTable />
        </div>
        <div className='sales-chart'>
          <h2>Sales By Category</h2>
            <Pie data={pieChartData} />
            <div className='keys'>
  {pieChartData && pieChartData.labels && pieChartData.labels.length > 0 && (
    <div className='item-chart'>
      {pieChartData.labels.map((element, index) => (
        <div  key={index}>
          <p>{element}</p>
          <div style={{ padding: '20px', backgroundColor: pieChartData.datasets[0].backgroundColor[index] }} className='color1' />
        </div>
      ))}
    </div>
  )}
</div>
            </div>
      </div>
    </div>
  );
};

export default Dashboard;
