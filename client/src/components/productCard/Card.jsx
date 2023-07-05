import React, { useState } from 'react'
import "./card.css"
import { FaStar, FaRegStar } from 'react-icons/fa';
const Card = ({category,name,price,rating,description,yearlySale,yearlySold,supply}) => {
    const[showMore,setShowMore] = useState(false)
    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<FaStar key={i} color='var(--var3)' />);
          } else {
            stars.push(<FaRegStar key={i}  />);
          }
        }
        return stars;
      };
  return (
    <div className='card'>
            <div className='product-info'>
                    <p>{category}</p>
                    <h3>{name}</h3>
                    <p>{price}$</p>
            </div>
            <div className='rating'>
                <div className='stars'>{renderRating()}</div>
                <h4>{description}</h4>
            </div>
            <button className='show-more' onClick={()=>setShowMore(!showMore)}>Show More</button>
            {showMore &&
             <div className='product-stats'>
                         <p>Supply: {supply}</p>
                         <p>Yearly Sales: {yearlySale}</p>
                         <p>Yearly Sold: {yearlySold}</p>
            </div>}
    </div>
  )
}

export default Card