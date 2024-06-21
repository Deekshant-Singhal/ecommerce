import React, { useEffect, useState } from 'react';
import Item from '../../Item/Item';

export const Popular = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4040/popularinwomen');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div 
      className="popular mt-80 flex-col items-center w-full ml-0 py-16 px-4 md:px-8 lg:px-12 2xl:h-lvh 2xl:w-5/6 mb-10"
      style={{ 
        background: 'linear-gradient(135deg, #ffffff, #e0d3f5, #805ad5)',
        color: '#333', 
      }}
    >
      <div className="texts w-60 mx-auto mb-20 md:w-full">
        <p className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Popular in Women</p>
        <hr className='h-2 md:h-3 lg:h-4 bg-green-600 rounded-lg md:w-80 mx-auto my-4' />
      </div>
      
      <div className="itemss items-center grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:h-3/5">
        {data.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
