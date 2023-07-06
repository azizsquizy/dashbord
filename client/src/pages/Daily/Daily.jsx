import React from 'react'
import { useEffect,useState } from 'react';
import DatePicker from "react-datepicker";
import { fetchOverAllStats } from 'calls';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';
import "react-datepicker/dist/react-datepicker.css";
import { Chart, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js/auto';
Chart.register(CategoryScale, LinearScale, PointElement, ArcElement);


const Daily = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date('2021-02-01'));
  const [endDate, setEndDate] = useState(new Date('2021-03-01'));

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

  const filterDailyData = (data) => {
    if (!data || !data.dailyData) return [];
  
    return data[0].dailyData.filter((entry) => {
      const currentDate = moment(entry.date, 'YYYY-MM-DD');
      return currentDate.isBetween(startDate, endDate, 'day', '[]');
    });
  };
  

  const createChartData = (filteredData) => {
    if (!filteredData) return null;

    const dates = filteredData.map((entry) => entry.date);
    const salesData = filteredData.map((entry) => entry.totalSales);
    const unitsData = filteredData.map((entry) => entry.totalUnits);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Sales',
          data: calculateIncrementalValues(salesData),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Units',
          data: calculateIncrementalValues(unitsData),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    };
  };

  const calculateIncrementalValues = (data) => {
    if (!data || data.length === 0) return [];

    const incrementalValues = [data[0]];
    for (let i = 1; i < data.length; i++) {
      incrementalValues.push(data[i] - data[i - 1]);
    }

    return incrementalValues;
  };

  const filteredData = filterDailyData(data);

  return (
    <div className='daily'>
      <div>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div className='chart'>
        {data && (
          <Line data={createChartData(filteredData)} options={{ responsive: true }} />
        )}
      </div>
    </div>
  );
};

export default Daily;