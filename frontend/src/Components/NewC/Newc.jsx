import React, { useEffect, useState } from 'react'
import Item from '../../Item/Item';


const Newc = () => {
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4040/newcollection/');
  
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await res.json();
        setData(result); 
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [])

  return (
    <div 
      className="popular flex-col items-center w-full ml-auto mt-80 py-16 px-4 md:px-8 lg:px-12 2xl:h-lvh 2xl:w-5/6"
      style={{ 
        background: 'linear-gradient(135deg, #fcd7d7, #f9afaf, #f47d7d)',
        color: '#333',
      }}
    >
      <div className="texts w-60 mx-auto mb-20 md:w-full">
        <p className='text-2xl md:text-3xl lg:text-4xl font-semibold'>New Collections</p>
        <hr className='h-2 md:h-3 lg:h-4 bg-green-600 rounded-lg md:w-80 mx-auto my-4' />
      </div>
      
      <div className="itemss items-center grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:h-3/5">
        {data.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
}


export default Newc;