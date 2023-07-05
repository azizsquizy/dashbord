import { fetchUsers } from 'calls';
import React,{useState,useEffect} from 'react'
import ReactTable from 'react-table-v6';
import "./Customers.css"
import 'react-table-v6/react-table.css';
const Custmoers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchUsers();
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
      
    },
    {
      Header: 'Name',
      accessor: 'name',
      
    },
    {
      Header: 'Email',
      accessor: 'email',
      
    },
    {
      Header: 'City',
      accessor: 'city',
      
    },
    {
      Header: 'State',
      accessor: 'state',
      
    },
    {
      Header: 'Occupation',
      accessor: 'occupation',
      
    },
    
  ];
  return (
    <div className='customers-page'>
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

export default Custmoers