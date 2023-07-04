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
  