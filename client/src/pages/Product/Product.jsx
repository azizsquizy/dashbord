import { fetchProducts } from 'calls';
import Card from 'components/productCard/Card';
import React,{useState,useEffect} from 'react'
import "./Product.css"
const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchProducts();
        setData(fetchedData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className='products-page'>
        <div className='page_title'>
            <h1 style={{textTransform:"uppercase"}}>Products</h1>
            <h3>See All of Your Products</h3>
        </div>
        <div className='products-container'>
        {isLoading && <h3>Loading...</h3>}
            {data && data.length>0 && data.map((element)=>(
                        <Card name={element.productId.name} category={element.productId.category} price={element.productId.price} 
                            supply={element.productId.supply}
                            description={element.productId.description}
                            yearlySale={element.yearlySalesTotal}
                            yearlySold={element.yearlyTotalSoldUnits}
                            rating={element.productId.rating}
                        />
            ))}
        </div>
    </div>
  )
}

export default Product