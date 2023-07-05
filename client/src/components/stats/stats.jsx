import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import "./stats.css"
const SalesTable = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users'); // Replace with your API endpoint to fetch sales data
      setSalesData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalCost = (affiliateSales) => {
    if (!affiliateSales || affiliateSales.length === 0) {
      return 0;
    }

    return affiliateSales.reduce(
      (sum, affiliateSale) => sum + parseFloat(affiliateSale.cost),
      0
    );
  };

  const columns = [
    {
      Header: 'ID',
      accessor: '_id',
      style:{width:"30%"}
    },
    {
      Header: 'Sale User ID',
      accessor: 'userId._id',
      style: {  overflowWrap: 'break-word' },
    },
    {
      Header: 'Created At',
      accessor: 'userId.createdAt',
    },
    {
      Header: 'Number of Products',
      accessor: 'userId.transactions.length',
      Cell: ({ value }) => <span>{value}</span>,
    },
    {
      Header: 'Cost',
      accessor: 'affiliateSales',
      Cell: ({ original }) => {
        const totalCost = getTotalCost(original.affiliateSales);
        return <span>{totalCost.toFixed(2)}</span>;
      },
    },
  ];

  return (
    <div className='stats_table'>
      <ReactTable
        data={salesData}
        columns={columns}
        loading={loading}
        defaultPageSize={10}
        className="-striped -highlight ReactTable"
      />
      
    </div>
  );
};

export default SalesTable;
