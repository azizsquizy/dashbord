import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { fetchOverAllStats } from 'calls';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';

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

  const filterDailyData = (dailyData) => {
    if (!dailyData) return [];

    return dailyData.filter((entry) => {
      const currentDate = new Date(entry.date); // Convert date string to Date object
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  const createChartData = (filteredData) => {
    if (!filteredData) return null;

    const dates = filteredData.map((entry) => new Date(entry.date)); // Convert date strings to Date objects
    const salesData = filteredData.map((entry) => entry.totalSales);
    const unitsData = filteredData.map((entry) => entry.totalUnits);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Total Sales',
          data: salesData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Total Units',
          data: unitsData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    };
  };

  const filteredData = filterDailyData(data?.[0]?.dailyData);
  const chartData = createChartData(filteredData);

  return (
    <div className='daily'>
      <div className='date-picker'>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className='chart'>
        {chartData && <Line data={chartData} options={{ responsive: true }} />}
      </div>
    </div>
  );
};

export default Daily;
