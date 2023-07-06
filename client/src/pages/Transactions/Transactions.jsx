import { fetchTransactions } from 'calls';
import React from 'react'
import { useState,useEffect } from 'react';
import ReactTable from 'react-table-v6';

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchTransactions();
        setData(fetchedData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      Header: 'ID',
      accessor: '_id',
      flex:2
      
    },
    {
      Header: 'User ID',
      accessor: 'userId',
      
    },
    {
      Header: 'Cost',
      accessor: 'cost',
      
    },
    {
      Header: '# of Products',
      accessor: 'products.length',
      
    },
    
    
  ];
  return (
    <div className='transactions-page'>
    {data &&  <ReactTable 
  data={data}
  columns={columns}
  loading={loading}
  defaultPageSize={10}
  className="-striped -highlight ReactTable"
/>}
</div>
  )
}

export default Transactions