export const fetchOverAllStats = async () => {
    const response = await fetch("http://localhost:3001/sales",{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
    const data = await response.json();
    return data;
  };
  
  export const fetchProducts = async () => {
    const response = await fetch("http://localhost:3001/products",{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
    const data = await response.json();
    return data;
  };
  export const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/users",{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
    const data = await response.json();
    return data;
  };
  export const fetchTransactions = async () => {
    const response = await fetch("http://localhost:3001/transactions",{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
    const data = await response.json();
    return data;
  }
  